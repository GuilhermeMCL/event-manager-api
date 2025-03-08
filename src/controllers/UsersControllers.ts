import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { prisma } from "../utils/prisma";
import { getHashes } from "crypto";
import { comparePassword, hashPassword } from "../utils/hash";
import { realpath } from "fs";
import { generateToken } from "../services/jwtService";



export class UserControllers {

    // controler para criar um novo usuário
    async registerUser(request: FastifyRequest, reply: FastifyReply) {

        // verificação do corpo com zod
        const bodySchema = z.object({
            name: z.string(),
            email: z.string().email(),
            password: z.string().min(6)
        })

        //Destruturando o corpo da requisição  da varialvel bodySchema
        const { name, email, password } = bodySchema.parse(request.body)

        //verificação simples se tem usuario ja existente com o mesmo email
        const userAlreadyExists = await prisma.user.findUnique({
            where: {
                email
            }

        })

        //caso nao tenha retorna um erro de 409 conflict 
        if (!userAlreadyExists) {
            return reply.status(409).send({ message: 'User already exists.' })
        }

        const hashpassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashpassword
            }
        })
        return reply.status(200).send({
            id: user.id,
            name: user.email,
            email: user.email
        })




    }

    async loginUser(request: FastifyRequest, reply: FastifyReply) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })


        const { email, password } = bodySchema.parse(request.body)
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user || !(await comparePassword(password, user.password))) {
            return reply.status(401).send({ message: 'Invalid credentials | credenciais invalidas.' })
        }

        const token = generateToken(user.id)

        return reply.status(200).send({ token })




    }
}