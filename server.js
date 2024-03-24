require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const { Webhook } = require("svix");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const User = require("./models/user.model");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const incomeRoutes = require("./routes/income.routes");
const expenseRoutes = require("./routes/expense.routes");
const transferRoutes = require("./routes/transfer.routes");
const debtRoutes = require("./routes/debt.routes");
const { middleware } = require("./middleware/authMiddleware");
const { updateUser, deleteUser } = require("./controllers/user.controller");

const app = express();

app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json", limit: "50mb" }),
  async function (req, res) {
    try {
      const payload = req.body;
      const headers = req.headers;

      const svix_id = headers["svix-id"];
      const svix_timestamp = headers["svix-timestamp"];
      const svix_signature = headers["svix-signature"];

      if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
          status: 400,
        });
      }

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

      let evt;

      try {
        evt = wh.verify(payload, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        });
      } catch (error) {
        console.log("🚀 ~ EVT error:", error);
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      console.log("🚀 ~ evt:", evt);

      const { id, email_addresses, ...attributes } = evt?.data;
      console.log("🚀 ~ id:", id);

      console.log("🚀 ~ evt.type:", evt?.type);
      const emailAddress = email_addresses[0]?.email_address;
      switch (evt?.type) {
        case "user.created": {
          const user = new User({
            id: id,
            emailAddress: emailAddress,
            firstName: attributes?.first_name,
            lastName: attributes?.last_name,
          });

          await user.save();
          break;
        }
        case "user.updated": {
          await User.findOneAndUpdate({ id: id }, { ...req.body });
          break;
        }
        case "user.deleted": {
          await User.findOneAndDelete({ id: id });
          break;
        }
      }
      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      // Console log and return error
      console.log("USER>DELUPCRE Error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
);

app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/auth", authRoutes);
app.use("/api/users", middleware, userRoutes);
app.use("/api/incomes", middleware, incomeRoutes);
app.use("/api/expenses", middleware, expenseRoutes);
app.use("/api/transfers", middleware, transferRoutes);
app.use("/api/debts", middleware, debtRoutes);

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(process.env.API_URI, () => {
      console.log("listening on", process.env.API_URI);
    });
  })
  .catch((err) => {
    console.log("🚀 ~ err:", err);
  });
