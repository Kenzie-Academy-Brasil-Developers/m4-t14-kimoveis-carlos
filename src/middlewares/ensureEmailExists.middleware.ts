import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const ensureEmailExistsMiddleware = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({
        email: request.body.email
    })

    if (findUser) {
        throw new AppError("Email already exists.", 409)
    }

    return next()
}