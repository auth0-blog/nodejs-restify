'use strict';

class UserController {
  constructor(log, userService, httpSatus) {
    this.log = log;
    this.userService = userService;
    this.httpSatus = httpSatus;
  }

  async create(req, res) {
    try {
      const { body } = req;
      const result = await this.userService.createUser(body);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

  async get(req, res) {
    try{
      const { username } = req.params;
      const result = await this.userService.getUser(username);

      res.send(result);
    } catch (err) {
      this.log.error(err.message);
      res.send(err);
    }
  }

}

module.exports = UserController;
