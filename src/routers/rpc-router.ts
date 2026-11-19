import { Router } from 'express';
import { RpcService } from '../services/rpc-service.js';

const router = Router();

router.post('/example', RpcService.example);

export { router as rpcRouter };
