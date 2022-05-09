import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapters";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d5ad0d39ac0136",
    pass: "6c0c3424ddc014",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Jeferson Pereira <jefersonpmatos@outlook.com>",
      subject,
      html: body,
    });
  }
}
