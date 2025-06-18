const { Injectable } = require('@nestjs/common');
const { Logger } = require('@nestjs/common');

class MailService {
  constructor(mailerService) {
    this.logger = new Logger('MailService');
    this.mailerService = mailerService;
  }

  async sendEmail(params) {
    try {
      const recipients = Array.isArray(params.to) ? params.to : [params.to];
      
      if (!recipients.length) {
        throw new Error('No recipients specified');
      }

      const mailOptions = {
        to: recipients.join(','),
        subject: params.subject,
        template: params.template,
        context: params.context,
      };

      await this.mailerService.sendMail(mailOptions);
      this.logger.log(`Email sent successfully to ${recipients.join(',')}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email: ${error.message}`, error.stack);
      return false;
    }
  }
}

MailService.Injectable = Injectable()(MailService);

module.exports = { MailService };