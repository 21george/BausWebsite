const { Module } = require('@nestjs/common');
const { MailerModule } = require('@nestjs-modules/mailer');
const { PugAdapter } = require('@nestjs-modules/mailer/dist/adapters/pug.adapter');
const { join } = require('path');

module.exports = {
  MailModule: class MailModule {
    static forRoot() {
      return {
        module: MailModule,
        imports: [
          MailerModule.forRoot({
            transport: {
              host: process.env.SMTP_HOST,
              port: parseInt(process.env.SMTP_PORT || '587'),
              secure: process.env.SMTP_SECURE === 'true',
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
              },
              tls: {
                rejectUnauthorized: false,
              },
            },
            defaults: {
              from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
            },
            template: {
              dir: join(__dirname, 'templates'),
              adapter: new PugAdapter(),
              options: {
                strict: true,
              },
            },
          }),
        ],
        providers: [require('./mail.service').MailService],
        exports: [require('./mail.service').MailService],
        controllers: [require('./mail.controller').MailController],
      };
    }
  }
};