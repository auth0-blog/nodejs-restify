'use strict';

const config = require('../configs/configs');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

const birthdatesSchema = new mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  }
});

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    birthdate: {
      type: Date,
      required: true
    },
    birthdates: [birthdatesSchema]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Users', userSchema);
