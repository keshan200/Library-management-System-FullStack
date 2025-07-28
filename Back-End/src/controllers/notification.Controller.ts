import { Request, Response } from "express";
import { sendOverdueEmail } from "../utill/emailService";
import { LendingModel } from "../models/lendingModel";


export const sendOverdueNotifications = async (req: Request, res: Response) => {
  try {
    const overdueLendings = await LendingModel.find({ isOverdue: true, isReturned: false }).populate("reader book");

    const notifications = overdueLendings.map(async (lending) => {
      const reader = lending.reader as any;
      const book = lending.book as any;

      const subject = "Overdue Book Notification";
      const text = `Dear ${reader.firstName},

     This is a reminder that the book "${book.name}" is overdue.
      Due Date: ${new Date(lending.dueDate).toLocaleDateString()}

      Please return the book as soon as possible.

       Thank you,
       Book-Club Library`;

      return sendOverdueEmail(reader.email, subject, text);
    });

    await Promise.all(notifications);

    res.status(200).json({ message: "Overdue notifications sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send notifications", error });
  }
};
