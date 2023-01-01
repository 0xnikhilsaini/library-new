const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const magzineSchema = mongoose.Schema(
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
    publishedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
magzineSchema.plugin(toJSON);
magzineSchema.plugin(paginate);

/**
 * @typedef Magzine
 */
const Magzine = mongoose.model('Magzine', magzineSchema);

module.exports = Magzine;
