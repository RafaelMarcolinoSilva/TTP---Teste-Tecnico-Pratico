import Utilizacao from "../models/utilizacao";

const utilizacoes : Utilizacao[] = [];

//procura por utilizaçõe com o id passado
async function getUtilizacao(id : number) : Promise<Utilizacao | undefined> {
    return new Promise((resolve, reject) => {
            return resolve(utilizacoes.find(u => u.id === id));

    })
}

//retorna todos os registros de utilização
async function getUtilizacoes(): Promise<Utilizacao[]> {
    return new Promise((resolve, reject) => {
        return resolve(utilizacoes);
        
    })
}

//cria um objeto utilização somente quando os campos estiverem preenchidos
async function addUtilizacao(utilizacao:Utilizacao): Promise<Utilizacao> {
    return new Promise((resolve, reject) => {
        if (!utilizacao.motoristaId || !utilizacao.automovelId || !utilizacao.dataInicio || !utilizacao.motivo)//deixar a datafim fora deste if
            return reject(new Error (`Invalid Utilization.`));

        const newUtilizacao = new Utilizacao(utilizacao.dataInicio, utilizacao.dataFim,utilizacao.motoristaId, utilizacao.automovelId, utilizacao.motivo);
        utilizacoes.push(newUtilizacao);

        return resolve(newUtilizacao);
    })
}

//procura por utilizações pelo seu id, somente permite atualizar quando id encontrado
async function updateUtilizacao(id: number, utilizacaoData: Utilizacao) : Promise<Utilizacao | undefined>{
    return new Promise((resolve, reject) => {
       const index = utilizacoes.findIndex(u => u.id === id);
       console.log(index)
       if(index === -1)
            return reject(new Error (`Utilization not found.`));

       if(utilizacaoData.dataFim && utilizacoes[index] && utilizacoes[index].dataFim !== utilizacaoData.dataFim)
            utilizacoes[index].dataFim = utilizacaoData.dataFim;

       return resolve(utilizacoes[index]);
    })
}


export default {
    getUtilizacao,
    getUtilizacoes,
    addUtilizacao,
    updateUtilizacao,
    utilizacoes
}