import nodemailer from "nodemailer";

class Email {
  private email: string;
  private transporter: nodemailer.Transporter | null = null;

  constructor(email: string) {
    this.email = email;
  }

  async init() {
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  async sendEmail() {
    if (!this.transporter) {
      throw new Error("Transporter not initialized. Call init() first.");
    }

    const info = await this.transporter.sendMail({
      from: '"Test 👻" <test@example.com>',
      to: this.email,
      subject: "Welcome to Dew task manager",
      text: "You are welcome to dew task manager, you can manage your task with precision and never missed an important task.",
    });

    console.log("Message sent:", info.messageId);
    console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
  }
}

export default Email;
