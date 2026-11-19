import { ZodIssue } from 'zod';

export interface ValidationIssue {
  path: (string | number | symbol)[];
  message: string;
}

export const HttpError = {
  invalidRequest: {
    status_code: 400,
    type: 'invalid_request'
  },
  resourceNotFound: {
    status_code: 404,
    type: 'resource_not_found'
  },
  methodNotAllowed: {
    status_code: 405,
    type: 'method_not_allowed'
  },
  validationError: (issues: ZodIssue[]) => {
    const detail: ValidationIssue[] = issues.map((issue) => ({
      path: issue.path,
      message: issue.message
    }));

    return { status_code: 422, type: 'validation_error', detail };
  },
  unknownError: (error: unknown) => {
    return {
      status_code: 500,
      type: 'server_error',
      stack:
        error instanceof Error ? (error.stack ?? error.message) : String(error)
    };
  },
  exampleNotFound: {
    status_code: 404,
    type: 'example_not_found'
  }
};
