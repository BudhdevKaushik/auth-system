import jwt from "jsonwebtoken";

const isAuthenticated = (req) => {
  const token = req.cookies.token;
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return !!decoded;
  } catch (err) {
    return false;
  }
};

export default isAuthenticated;
