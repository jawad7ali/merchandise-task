import Joi from 'joi';

export const editPayload = {
  params: Joi.object().keys({
    token: Joi.string().required().min(1)
  })
};


export const addItemPayload = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1),
    price: Joi.number().required().min(1),
  }),
};

export const updateItemPayload = {
  body: Joi.object().keys({
    name: Joi.string().required().min(1),
    price: Joi.number().required().min(1),
  }),
};
