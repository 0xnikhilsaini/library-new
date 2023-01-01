const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createMagzine = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('Magzine', 'admin'),
  }),
};

const getMagzines = {
  query: Joi.object().keys({
    title: Joi.string(),
    isbn: Joi.string(),
    authors: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMagzine = {
  params: Joi.object().keys({
    MagzineId: Joi.string().custom(objectId),
  }),
};

const updateMagzine = {
  params: Joi.object().keys({
    MagzineId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteMagzine = {
  params: Joi.object().keys({
    MagzineId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createMagzine,
  getMagzines,
  getMagzine,
  updateMagzine,
  deleteMagzine,
};
