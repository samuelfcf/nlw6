import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import UsersRepositories from "../repositories/UsersRepositories";

class ListUserService {

  async execute() {

    const usersRepositories = getCustomRepository(UsersRepositories);

    const users = usersRepositories.find();

    return classToPlain(users);
  }
}

export default ListUserService;