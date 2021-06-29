import { getCustomRepository } from "typeorm"
import AppError from "../errors/AppError";
import TagsRepositories from "../repositories/TagsRepositories"


class CreateTagService {

  async execute(name: string) {

    const tagRepository = getCustomRepository(TagsRepositories);

    // verifica se o nome está preenchido
    if(!name) {
      throw new Error("Incorrect name")
    }

    // SELECT * FROM TAGS WHERE NAME = 'name'
    const tagExists = await tagRepository.findOne({ name: name });

    // se a tag ja existe retornamos um erro pq não podemos ter nomes duplicados.
    if (tagExists) {
      throw new AppError("Tag ja existente", 400);
    } 
    
    const tag = tagRepository.create({
      name 
    });

    tagRepository.save(tag);

    return tag;
  

  }
}

export default CreateTagService