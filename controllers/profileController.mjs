import { query } from "../config/db.mjs";

export const getProfile = async (req, res, next) => {
  try {
    const user = await query(
      "SELECT id, username, email, created_at FROM users WHERE id = $1",
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).render("error", { message: "User not found" });
    }

    res.render("profile", { user: user.rows[0] });
  } catch (error) {
    next(error);
  }
};
