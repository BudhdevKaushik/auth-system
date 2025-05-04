import { Router } from "express";
import isAuthenticated from "../middlewares/checkAuth.mjs";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers.mjs";

const router = Router();

router.get("/register", (req, res) => {
  if (isAuthenticated(req)) return res.redirect("/profile");

  res.render("auth/register", {
    errors: {},
    success: null,
    username: "",
    email: "",
  });
});

router.get("/login", (req, res) => {
  if (isAuthenticated(req)) return res.redirect("/profile");

  const success = req.query.success
    ? "Registration successful. Please log in."
    : null;

  res.render("auth/login", {
    errors: {},
    success,
    recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
    usernameOrEmail: "",
  });
});

router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/register", registerUser);

export default router;
