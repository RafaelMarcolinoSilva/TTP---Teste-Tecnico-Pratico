import { Request, Response, NextFunction } from "express";
import Automovel from "../models/automovel";
import automovelRepository from "../repositories/automovelRepository";

//filtra um respectivo automóvel pelo seu id
async function getAutomovel(req: Request, res: Response, next: NextFunction){
    const id = parseInt(String(req.params.id));
    const automovel = await automovelRepository.getAutomovel(id);
    if(automovel)
       return res.json(automovel);
    else
        return res.sendStatus(404);
}

//retorna uma lista de automóveis se não informado nada na pesquisa,
//caso contrário é possível fazer uma busca pela cor, ou pela marca
async function getAutomoveis(req: Request, res: Response, next: NextFunction){
    const palavra = req.query.search;
    const automoveis = await  automovelRepository.getAutomoveis();
    console.log(palavra)
    if(typeof palavra === "string"){
        
        const automovelCor = automoveis.filter(a => (a.cor.toLowerCase().includes(palavra.toLowerCase())));
        const automovelMarca = automoveis.filter(a => (a.marca.toLowerCase().includes(palavra.toLowerCase())));
        console.log(automovelCor);
        console.log(automovelMarca);

        if(automovelCor.length > 0)
           return res.json(automovelCor);
            
        if(automovelMarca.length > 0)
           return res.json(automovelMarca);
        else
            return res.status(404).json({error: "Não existe automóvel cadastrado com essa cor ou com essa marca", palavra})
        
    }
    
    return res.json(automoveis);
    
}

//adiciona um automóvel depois de validar se já existe um automóvel com a respectiva placa
async function postAutomovel(req: Request, res: Response, next: NextFunction){
    const {
        marca,
        cor,
        placa
    } = req.body
    console.log(placa)
    const autoPlaca = await automovelRepository.getAutomoveis();
    const placA = autoPlaca.find(l => l.placa === placa)
    console.log(autoPlaca)
    if (placA){
        return res.status(500).json({error: "Automóvel já cadastrado", placa})
    }
    
    const automovel = new Automovel(
        placa,
        cor,
        marca
    )

    const result = await automovelRepository.addAutomovel(automovel)
    return res.status(201).json(result); 
    
}

//modifica um  automóvel, desde que se passe um id
async function patchAutomovel(req: Request, res: Response, next: NextFunction){
    const id = parseInt(String(req.params.id));
    const automovelData = req.body as Automovel;
    const result = await automovelRepository.updateAutomovel(id, automovelData)
    return res.json(result);
}

//pesquisa um id e se encontrado, é realizada uma exclusão
async function deleteAutomovel(req: Request, res: Response, next: NextFunction){
    const id = parseInt(String(req.params.id));
    const result = await automovelRepository.deleteAutomovel(id);
    if(result)
        return res.sendStatus(204);

    else
        return res.sendStatus(404);
}

export default{
  getAutomovel,
  getAutomoveis,
  postAutomovel,
  patchAutomovel,
  deleteAutomovel
}