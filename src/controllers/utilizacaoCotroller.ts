import { Request, Response, NextFunction } from "express";
import Utilizacao from "../models/utilizacao";
import utilizacaoRepository from "../repositories/utilizacaoRepository";
import automovelRepository from "../repositories/automovelRepository";
import motoristaRepository from "../repositories/motoristaRepository";


//Esse trecho capta o request, valida se existe uma utilização com o id informado
//e retorna a respectiva utilização mostrando qual o altomóvel utilizado ou não encontrado
async function getUtilizacao(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(String(req.params.id));
    const utilizacao = await utilizacaoRepository.getUtilizacao(id);

    const {
            motoristaId,
            automovelId,
            dataInicio,
            dataFim,
            motivo
        } = req.body;

        const mId = Number(motoristaId);
        const aId = Number(automovelId);

       
        const motorista = await motoristaRepository.getMotorista(mId);
        const automovel = await automovelRepository.getAutomovel(aId);

        

    if (utilizacao)
        return res.status(200).json({
            id:utilizacao.id,
            dataInicio: utilizacao.dataInicio,
            datafim: utilizacao.dataFim,
            motorista: {id: motorista?.id,
                nome: motorista?.nome,
            },
            automovel:{
                id: automovel?.id,
                placa: automovel?.placa,
                cor: automovel?.cor,
                marca: automovel?.marca
            }
    });
    else
        return res.sendStatus(404);
}

//Essa função pesquisa se existe utilização salva, e existindo, passa todas as informações correspondentes
async function getUtilizacoes(req: Request, res: Response, next: NextFunction) {
    const utilizacoes = await utilizacaoRepository.getUtilizacoes();

    const {
            motoristaId,
            automovelId,
            dataInicio,
            dataFim,
            motivo
        } = req.body;

        const mId = Number(motoristaId);
        const aId = Number(automovelId);

       
        const motorista = await motoristaRepository.getMotorista(mId);
        const automovel = await automovelRepository.getAutomovel(aId);

        

    if (utilizacoes.length > 0) {
        return res.status(200).json(utilizacoes.map(utilizacao => ({
            id: utilizacao.id,
            dataInicio: utilizacao.dataInicio,
            dataFim: utilizacao.dataFim,
            motorista: {
                id: motorista?.id,
                nome: motorista?.nome
            },
            automovel: {
                id: automovel?.id,
                placa: automovel?.placa,
                cor: automovel?.cor,
                marca: automovel?.marca
            }       
      }))
   );
}


    return res.json(utilizacoes);
}

//permite uma criação de utilização somente quando valida os dados informados, e se existe o 
//respectivo motorista e respectivo automóvel e também valida se o motorista ainda está
//com a utilização em uso ou se o automóvel está com a utilização em uso
async function postUtilizacao(req: Request, res: Response, next: NextFunction) {
    try {
        const {
            motoristaId,
            automovelId,
            dataInicio,
            dataFim,
            motivo
        } = req.body;

        const mId = Number(motoristaId);
        const aId = Number(automovelId);

        if (Number.isNaN(mId) || Number.isNaN(aId)) {
            return res.status(400).json({ error: "motoristaId e automovelId inválidos" });
        }

        const motorista = await motoristaRepository.getMotorista(mId);
        const automovel = await automovelRepository.getAutomovel(aId);

        if (!motorista || !automovel) {
            return res.status(404).json({ error: "Motorista ou automóvel não encontrado" });
        }

        const utilizacoes =  await utilizacaoRepository.getUtilizacoes()
        
        console.log(utilizacoes)

        const utilizacaoAtiva = utilizacoes.find(u => (u.dataFim == null || (u.motoristaId === mId || u.automovelId === aId)));

        console.log(utilizacaoAtiva)
        if (utilizacaoAtiva)
            return res.status(409).json({error: "Automóvel em utilização ou Motorista com automóvel"});

        const utilizacao = new Utilizacao(
            dataInicio,
            '',
            mId,
            aId,
            motivo
        );    
       
        
        const result = await utilizacaoRepository.addUtilizacao(utilizacao);
              
        return res.status(201).json({
            id: result.id,
            dataInicio: result.dataInicio,
            dataFim: result.dataFim, 
            motivo: result.motivo,
            motorista: {
                id: motorista.id,
                nome: motorista.nome
            },
            automovel: {
                id: automovel.id,
                placa: automovel.placa
            }
        });
           
     }catch (err) {
            next(err);
    }
 }

//código responsável por atualizar a utilização somente para finalizar a utilização (adição da data fim)
async function patchUtilizacao(req: Request, res: Response, next: NextFunction) {
        const id = parseInt(String(req.params.id));
        try {
            const {
                motoristaId,
                automovelId,
                dataInicio,
                dataFim,
                motivo
            } = req.body;

            const mId = Number(motoristaId);
            const aId = Number(automovelId);


            const motorista = await motoristaRepository.getMotorista(mId);
            const automovel = await automovelRepository.getAutomovel(aId);

        
            const utilizacao = new Utilizacao(
                dataInicio,
                dataFim,
                motoristaId,
                automovelId,
                motivo
            );
            console.log(utilizacao)
            const result = await utilizacaoRepository.updateUtilizacao(id, utilizacao);
            console.log(result)
            return res.status(201).json({
                id: utilizacao.id,
                dataInicio: utilizacao.dataInicio,
                dataFim: utilizacao.dataFim,
                motivo: utilizacao.motivo,
                motorista: {
                    id: motorista?.id,
                    nome: motorista?.nome
                },
                automovel: {
                    id: automovel?.id,
                    placa: automovel?.placa
                }
            });
        } catch (err) {
            next(err);
        }


    }

    export default {
        getUtilizacao,
        getUtilizacoes,
        postUtilizacao,
        patchUtilizacao
    }