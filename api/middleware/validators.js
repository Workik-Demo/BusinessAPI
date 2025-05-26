const Joi = require('joi');

// Validation schema for books
const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().integer().min(0),
  inStock: Joi.boolean().default(true)
});

// Middleware for validating book data
function validateBook(req, res, next) {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = {
  validateBook
};