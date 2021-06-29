import { getCustomRepository } from "typeorm"
import AppError from "../errors/AppError";
import ComplimentsRepositories from "../repositories/ComplimentsRepositories"
import UsersRepositories from "../repositories/UsersRepositories";

interface IComplimentRequst{
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentsService {

  async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequst) {

    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    const usersRepository = getCustomRepository(UsersRepositories);

    if(user_sender === user_receiver) {
      throw new AppError("Incorrect User Receiver", 400)
    }

    // assim ja procura o id por default
    const userReceiverExists = await usersRepository.findOne(user_receiver);

    if(!userReceiverExists) {
      throw new AppError("usuário nao existe!", 400);
    }

    const compliment = complimentsRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await complimentsRepository.save(compliment);

    return compliment;

  }  

}

export default CreateComplimentsService