import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/authRoutes.mjs";
import profileRouter from "./routes/profileRoutes.mjs";
import isAuthenticated from "./middlewares/checkAuth.mjs";
import { limiter } from "./middlewares/authMiddleware.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(limiter);
app.use("/", authRouter);
app.use("/profile", profileRouter);

app.get("/", (req, res) => {
  if (isAuthenticated(req)) {
    return res.redirect("/profile");
  } else {
    return res.redirect("/login");
  }
});

app.use((req, res, next) => {
  res.status(404).render("404", { message: "Page Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("error", { message: "Something went wrong!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
