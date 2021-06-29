import {Request, Response, NextFunction} from "express";
import { getCustomRepository } from "typeorm";
import UsersRepositories from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  
  const { user_id } = request;

  const usersRespositories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRespositories.findOne(user_id)
 

  //se for admin, segue o resto do fluxo (entra no controller).
  if(admin) {
    return next();
  }

  return response.status(401).json({
    error: "User não autorizado."
  });
}