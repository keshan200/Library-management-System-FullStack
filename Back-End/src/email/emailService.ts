
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // or use your SMTP service (e.g., SendGrid SMTP)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOverdueNotification = async (
  to: string,
  readerName: string,
  overdueBooks: { title: string; dueDate: string }[]
) => {
  const bookListHtml = overdueBooks
    .map((book) => `<li>${book.title} (Due: ${book.dueDate})</li>`)
    .join("");

  const mailOptions = {
    from: `"Book Club Library" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Overdue Books Reminder - Book Club Library",
    html: `
      <p>Dear ${readerName},</p>
      <p>This is a reminder that the following books are overdue:</p>
      <ul>${bookListHtml}</ul>
      <p>Please return them as soon as possible.</p>
      <p>Thank you,<br/>Book Club Library Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
