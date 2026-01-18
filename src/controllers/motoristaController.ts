import { Request, Response, NextFunction } from "express";
import Motorista from "../models/motorista";
import motoristaRepository from "../repositories/motoristaRepository";

//verifica se existe um motorista cadastrado com o id passado
async function getMotorista(req: Request, res: Response, next: NextFunction){
    const id = parseInt(String(req.params.id));
    const motorista = await motoristaRepository.getMotorista(id);
    if(motorista)
       return res.json(motorista);
    else
       return res.sendStatus(404);
}

//verifica se existe uma lista de motoristas, mas quando passado o parâmetro de 
//primeiro nome por exemplo, retorna todas as ocorrências
async function getMotoristas(req: Request, res: Response, next: NextFunction){
    const nome = req.query.search;
    const motoristas = await  motoristaRepository.getMotoristas();

    if(typeof nome === "string"){
        const nomeMotorista = motoristas.filter(n => n.nome.toLowerCase().includes(nome.toLowerCase()));

        if(nomeMotorista)
            return res.json(nomeMotorista);

        else
            return res.status(404).json({error: "Não existe este motorista cadastrado", nome})

    }

    return res.json(motoristas);
}

//cria um motorista somente depois de validado todas as suas informações
async function postMotorista(req: Request, res: Response, next: NextFunction){
    const {
        nome
    } = req.body;

    const motoristas = await (motoristaRepository.getMotoristas());
    const motorista = motoristas.find(m => m.nome.toLowerCase() === nome.toLowerCase());
    if(motorista){
        return res.status(500).json({error: "Motorista já cadastrado", motorista})
    };

    const novoMotorista = new Motorista(
        nome
    );

    const result = await motoristaRepository.addMotorista(novoMotorista)
    return res.status(201).json(result); 
    
}

//permite atualizações somente depois de consultar o seu id
async function patchMotorista(req: Request, res: Response, next: NextFunction){
    const id = parseInt(String(req.params.id));
    const motoristaData = req.body as Motorista;
    const result = await motoristaRepository.updateMotorista(id, motoristaData)
    return res.json(result);
}

//deleta o motorista pelo id, se encontrado
async function deleteMotorista(req: Request, res: Response, next: NextFunction){
    const id = parseInt(String(req.params.id));
    const result = await motoristaRepository.deleteMotorista(id);
    if(result)
        return res.sendStatus(204);

    else
        return res.sendStatus(404);
}

export default{
    getMotorista,
    getMotoristas,
    postMotorista,
    patchMotorista,
    deleteMotorista
}