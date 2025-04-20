import { Request, Response } from "express";
import * as messageService from "../services/message.service";

export const sendMessage = async (req: Request, res: Response) => {
  const { content, senderId, projectId } = req.body;
  try {
    const message = await messageService.sendMessage(
      content,
      senderId,
      projectId,
    );
    res.status(201).json(message);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMessages = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  try {
    const messages = await messageService.getMessagesByProject(projectId);
    res.json(messages);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
