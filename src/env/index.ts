import z from "zod";
import 'dotenv/config'



const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string(),
    STRIPE_API_KEY: z.string(),
})


const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format())

    throw new Error('Invalid environment variables.')

}
export const env = _env.data