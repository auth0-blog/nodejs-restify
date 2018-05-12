'use strict';

class BirthdateService {
  constructor(log, mongoose, httpStatus, errs) {
    this.log = log;
    this.mongoose = mongoose;
    this.httpStatus = httpStatus;
    this.errs = errs;
  }

  async createBirthdate(username, body) {
    const Users = this.mongoose.model('Users');
    const user = await Users.findOne({username});
    const {birthdate, fullname} = body;

    if (!user) {
      const err = new this.errs.NotFoundError(
        `User with username - ${username} does not exists`
      );
      return err;
    }

    user.birthdates.push({
      birthdate: this.formatBirthdate(birthdate),
      fullname
    });

    return user.save();
  }

  formatBirthdate(date) {
    return new Date(date);
  }

  async getBirthdates(username) {
    const Users = this.mongoose.model('Users');
    const user = await Users.findOne({username});

    if (!user) {
      const err = new this.errs.NotFoundError(
        `User with username - ${username} does not exists`
      );
      return err;
    }

    return user.birthdates;
  }
}

module.exports = BirthdateService;
