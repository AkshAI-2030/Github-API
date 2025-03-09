module.exports = (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }
  if (typeof title !== "string" || typeof body !== "string") {
    return res.status(400).json({ error: "Title and body should be string" });
  }
  next(); //passing to next middleware or Handler Here
};
