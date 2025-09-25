const { Controller } = require('@nestjs/common');
const { Post, Body } = require('@nestjs/common');

class MailController {
  constructor(mailService) {
    this.mailService = mailService;
  }

  async sendEmail(body) {
    const success = await this.mailService.sendEmail(body);
    return { success };
  }
}

MailController.Controller = Controller('mail')(MailController);
MailController.Post = Post('send')(MailController.prototype.sendEmail);
MailController.Body = Body()(MailController.prototype.sendEmail, 0);

module.exports = { MailController };