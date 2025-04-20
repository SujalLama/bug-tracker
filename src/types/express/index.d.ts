// src/types/express/index.d.ts

import { Role } from "@prisma/client";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: Role;
    }

    export interface Request {
      user?: User;
    }
  }
}
