import { getCustomRepository } from "typeorm";
import { hash } from 'bcryptjs'
import AppError from "../errors/AppError";
import UsersRepositories from "../repositories/UsersRepositories";

interface IUserRequest {
  name: string,
  email: string,
  admin?: boolean
  password: string
}

class CreateUserService {
  
  async execute({name, email, admin = false, password}: IUserRequest) {

    const userRepository = getCustomRepository(UsersRepositories);
    
    if(!email) {
      throw new AppError("Email incorreto", 400);
    }

    const userExists = await userRepository.findOne({
      email
    });

    if(userExists) {
      throw new AppError("User ja existente", 400);
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    });

    userRepository.save(user)

    return user;


  }
}

export default CreateUserService;