import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Method to send email
  async sendAlertEmail(to: string, chain: string, price: number) {
    const mailOptions = {
      from: '"Blockchain Tracker" <noreply@tracker.com>',
      to: to,
      subject: `Price Alert: ${chain} has increased more than 3%`,
      text: `The price of ${chain} has increased by more than 3%. The current price is $${price}.`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to} for ${chain} price alert.`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
