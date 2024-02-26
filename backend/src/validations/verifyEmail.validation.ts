import Joi from 'joi';

export const verifyEditPayload = {
  params: Joi.object().keys({
    token: Joi.string().required().min(1)
  })
};