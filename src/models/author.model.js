const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const authorSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
authorSchema.plugin(toJSON);
authorSchema.plugin(paginate);

/**
 * @typedef Author
 */
const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
