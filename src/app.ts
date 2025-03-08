import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { env } from "./env";
import { userRoutes } from "./routes/user-routes";

export const app = fastify();

// registrando os plugins
app.register(fastifyJwt, { secret: env.JWT_SECRET as string });
app.register(fastifyCors);
app.register(fastifySwagger, {
    swagger: {
        info: {
            title: 'Event Manager API',
            description: 'API for Event Manager',
            version: '1.0.0'
        }
    }
});
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

//registrando as rotas
app.register(userRoutes)