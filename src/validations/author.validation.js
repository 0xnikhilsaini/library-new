const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createAuthor = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string().required().custom(password),
    lastName: Joi.string().required(),
  }),
};

const getAuthors = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAuthor = {
  params: Joi.object().keys({
    AuthorId: Joi.string().custom(objectId),
  }),
};

const updateAuthor = {
  params: Joi.object().keys({
    AuthorId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteAuthor = {
  params: Joi.object().keys({
    AuthorId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
};
