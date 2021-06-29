import { getCustomRepository } from "typeorm"
import ComplimentsRepositories from "../repositories/ComplimentsRepositories";


class ListUserReceiveComplimentsService {

  async execute(user_id: string){

    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const compliments = await complimentsRepositories.find({ 
      where: { 
        user_receiver: user_id
      },
      relations: [ // retorna o objeto que são passados junto as entidades relacionadas.
        "userSender", "userReceiver", "tag"
      ]
    });

    return compliments;
  }
}

export default ListUserReceiveComplimentsService