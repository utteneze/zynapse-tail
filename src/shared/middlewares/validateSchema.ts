import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

interface Schema {
    bodySchema?: z.ZodObject<any, any>;
    paramsSchema?: z.ZodObject<any, any>;
    querySchema?: z.ZodObject<any, any>;
}

function validateSchema(schema: Schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log(req.params);
        try {
            if (schema.bodySchema) {
                req.body = await schema.bodySchema.parseAsync(req.body);
            }
            if (schema.querySchema) {
                req.query = await schema.querySchema.parseAsync(req.query);
            }
            if (schema.paramsSchema) {
                req.params = await schema.paramsSchema.parseAsync(req.params);
            }
            next();
        } catch (error) {
            console.error(error);
            if (error instanceof z.ZodError) {
                const firstErrorMessage = error.errors[0].message;
                return res.status(400).send({ error: firstErrorMessage });
            }
            next(error);
        }
    };
}

export default validateSchema;
