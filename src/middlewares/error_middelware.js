export default function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode =
    res.statusCode !== 200 ? res.statusCode : err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Something went wrong",
  });
}
