import { Request, Response } from "express";
import * as commentService from "../services/comment.service";

export const addComment = async (req: Request, res: Response) => {
  const { content, ticketId, authorId } = req.body;
  try {
    const comment = await commentService.addComment(
      content,
      ticketId,
      authorId,
    );
    res.status(201).json(comment);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getComments = async (req: Request, res: Response) => {
  const { ticketId } = req.params;
  try {
    const comments = await commentService.getCommentsByTicket(ticketId);
    res.json(comments);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
