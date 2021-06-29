import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface IRequest {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  
  // receber o token.
  const authToken = request.headers.authorization

  // validar se token está preenchido.
  if(!authToken) {
    return response.status(401).end()
  }
  
  const [, token] = authToken.split(' ')

  try { 
    // validar se token é válido.
    // constante decode recebe os dados decodificados que são passados pelo token.
    const { sub } = verify(token, 'uahsdqkwuehapp54846q5w48s') as IRequest
    request.user_id = sub

    return next(); // segue o fluxo pq o user está autenticado.
  } catch(err) {
    return response.status(401).end();
  }
  

  // Recuperar informações do usuário.


}