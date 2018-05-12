'use strict';

const serviceLocator = require('../lib/service_locator');

class BirthdateController {
  constructor(log, birthdateService, httpSatus) {
    this.log = log;
    this.birthdateService = birthdateService;
    this.httpSatus = httpSatus;
  }

  async create(req, res) {
    try {
      const {body} = req;
      const {username} = req.params;
      const result = await this.birthdateService.createBirthdate(
        username,
        body
      );
      if (result instanceof Error)
        res.send(result);
      else res.send(`${body.fullname}'s birthdate saved successfully!`)
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async listAll(req, res) {
    try {
      const {username} = req.params;
      const result = await this.birthdateService.getBirthdates(username);
      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }
}

module.exports = BirthdateController;
