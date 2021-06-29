import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import AppError from "../errors/AppError";
import UsersRepositories from "../repositories/UsersRepositories"

interface IAuthenticateRequest {
  email: string,
  password: string
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {

    //verficiar se email existe
    const userRepository = getCustomRepository(UsersRepositories);

    const userExists = await userRepository.findOne({email: email});

    if(!userExists) {
      throw new AppError("Email/Senha incorreta", 400);
    }

    //verificar senha correta
    const passwordMatch = await compare(password, userExists.password);

    if(!passwordMatch) {
      throw new AppError("Email/Senha incorreta", 400);
    }

    //gerar token
    const token = sign({
      email: userExists.email
    }, 
    "uahsdqkwuehapp54846q5w48s", 
    {
      subject: userExists.id,
      expiresIn: "1d"
    });

    return token;

  }
}

export default AuthenticateUserService