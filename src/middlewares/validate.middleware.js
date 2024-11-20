export const validateSchema = (schema) => async (req, res, next) => {
  try {
    await schema.parse(req.body);
    next();
  } catch (error) {
    console.log(error.errors);
    return res.status(400).json({
      error: error.issues.map((issue) => ({
        message: issue.message,
        received: issue.received,
        expected: issue.expected,
      })),
    });
  }
};
