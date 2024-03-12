require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const incomeRoutes = require("./routes/income.routes");
const expenseRoutes = require("./routes/expense.routes");
const transferRoutes = require("./routes/transfer.routes");
const debtRoutes = require("./routes/debt.routes");
const { jwtMiddleware } = require("./middleware/authMiddleware");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/api/auth", authRoutes);
app.use("/api/users", jwtMiddleware, userRoutes);
app.use("/api/incomes", jwtMiddleware, incomeRoutes);
app.use("/api/expenses", jwtMiddleware, expenseRoutes);
app.use("/api/transfers", jwtMiddleware, transferRoutes);
app.use("/api/debts", jwtMiddleware, debtRoutes);

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
