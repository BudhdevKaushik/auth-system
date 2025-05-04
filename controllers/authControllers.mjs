import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/db.mjs";
import { verifyRecaptcha } from "../config/recaptcha.mjs";
import {
  validateRegisterInput,
  validateLoginInput,
} from "../utils/validators.js";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const { valid, errors } = validateRegisterInput(username, email, password);

    if (!valid) {
      return res.status(400).render("auth/register", {
        errors,
        success: null,
        username,
        email,
      });
    }

    const userExists = await query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (userExists.rows.length > 0) {
      errors.general = "Username or email already exists";
      return res.status(400).render("auth/register", {
        errors,
        success: null,
        username,
        email,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );

    res.redirect("/login?success=1");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const {
      usernameOrEmail,
      password,
      "g-recaptcha-response": recaptchaToken,
    } = req.body;

    const { valid, errors } = validateLoginInput(usernameOrEmail, password);

    if (!valid) {
      return res.status(400).render("auth/login", {
        errors,
        success: null,
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        usernameOrEmail,
      });
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isRecaptchaValid) {
      errors.general = "Invalid reCAPTCHA. Please try again.";
      return res.status(400).render("auth/login", {
        errors,
        success: null,
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        usernameOrEmail,
      });
    }

    const user = await query(
      "SELECT * FROM users WHERE username = $1 OR email = $1",
      [usernameOrEmail]
    );

    if (user.rows.length === 0) {
      errors.general = "Invalid credentials";
      return res.status(400).render("auth/login", {
        errors,
        success: null,
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        usernameOrEmail,
      });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!isMatch) {
      errors.general = "Invalid credentials";
      return res.status(400).render("auth/login", {
        errors,
        success: null,
        recaptchaSiteKey: process.env.RECAPTCHA_SITE_KEY,
        usernameOrEmail,
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].id,
        username: user.rows[0].username,
        email: user.rows[0].email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000,
    });

    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
