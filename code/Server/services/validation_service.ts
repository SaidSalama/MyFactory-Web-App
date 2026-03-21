import { z } from 'zod';

class ValidationService {
  validate<T>(schema: z.Schema<T>, data: unknown) {
    try {
      return {
        success: true,
        data: schema.parse(data) as T,
        errors: null
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          data: null,
          errors: error.issues.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        };
      }
      throw error;
    }
  }
}

export default new ValidationService();