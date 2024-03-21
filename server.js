require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Webhook = require("svix");
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

app.use(express.json());
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

app.post(
  "/api/webhooks",
  bodyParser.raw({ type: "application/json" }),
  async function (req, res) {
    try {
      const payloadString = req.body.toString();
      const svixHeaders = req.headers;

      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
      const evt = wh.verify(payloadString, svixHeaders);

      const { id, ...attributes } = evt.data;

      switch (evt.type) {
        case "user.created": {
          const user = new User({
            clerkUserId: id,
            firstName: attributes.first_name,
            lastName: attributes.last_name,
          });

          await user.save();
        }
        case "user.updated": {
          await updateUser(req, res);
        }
        case "user.deleted": {
          await deleteUser(req, res);
        }
      }
      res.status(200).json({
        success: true,
        message: "Webhook received",
      });
    } catch (err) {
      // Console log and return error
      console.log("Webhook failed to verify. Error:", err.message);
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    // Grab the ID and TYPE of the Webhook
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
    // Console log the full payload to view
    console.log("Webhook body:", evt.data);

    return res.status(200).json({
      success: true,
      message: "Webhook received",
    });
  }
);

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
