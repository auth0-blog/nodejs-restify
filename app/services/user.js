'use strict';

class UserService {
  constructor(log, mongoose, httpStatus, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.errs = errs;
  }

  async createUser(body) {
    const Users = this.mongoose.model('Users');
    const {username} = body;
    const user = await Users.findOne({username});

    if (user) {
      const err = new this.errs.InvalidArgumentError(
        'User with username already exists'
      );
      return err;
    }

    let newUser = new Users(body);
    newUser.birthdate = new Date(body.birthdate);
    newUser = await newUser.save();

    this.log.info('User Created Successfully');
    return newUser;
  }

  async getUser(username) {
    const Users = this.mongoose.model('Users');
    const user = await Users.findOne({username});

    if (!user) {
      const err = new this.errs.NotFoundError(
        `User with username - ${username} does not exists`
      );
      return err;
    }

    this.log.info('User fetched Successfully');
    return user;
  }
}

module.exports = UserService;
