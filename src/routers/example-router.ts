import { Router } from 'express';
import { methodNotAllowedMiddleware } from '../middlewares/method-not-allowed.js';
import { validateId } from '../middlewares/validate-id.js';
import { validator } from '../middlewares/validator.js';
import { Schema } from '../models/request-schemas.js';
import { ExampleService } from '../services/example-service.js';

const router = Router();

router.get('/', validator(Schema.listExamples), ExampleService.listExamples);
router.post('/', validator(Schema.upsertExample), ExampleService.createExample);
router.all('/', methodNotAllowedMiddleware);

router.patch(
  '/:id',
  validateId('id'),
  validator(Schema.upsertExample),
  ExampleService.updateExample
);
router.delete('/:id', validateId('id'), ExampleService.deleteExample);
router.all('/:id', methodNotAllowedMiddleware);

export { router as exampleRouter };
