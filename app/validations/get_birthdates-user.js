'use strict';

const joi = require('joi');

module.exports = {
  username: joi.string().alphanum().min(4).max(30).required()
};
