import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const register = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await userService.registerUser(
      username,
      email,
      password,
      role,
    );
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await userService.loginUser(email, password);
    res.json({ token, user });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
