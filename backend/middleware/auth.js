import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decode.id;
    next();
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authMiddleware;
