const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    isbn: {
      type: String,
    },
    authors: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON);
bookSchema.plugin(paginate);

/**
 * @typedef Book
 */
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
