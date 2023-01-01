const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createbook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    isbn : Joi.string().required(),
    authors: Joi.string().required(),
    description:Joi.string().required(),
  }),
};

const getbooks = {
  query: Joi.object().keys({
    title: Joi.string(),
    isbn: Joi.string(),
    authors: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getbook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

const updatebook = {
  params: Joi.object().keys({
    bookId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deletebook = {
  params: Joi.object().keys({
    bookId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createbook,
  getbooks,
  getbook,
  updatebook,
  deletebook,
};
