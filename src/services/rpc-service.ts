import { Request, Response } from 'express';

export const RpcService = {
  example: async (req: Request, res: Response) => {
    res.status(204).send();
  }
};
