import Automovel from "../models/automovel";

const automoveis : Automovel[] = [];

//função que recebe id como parâmetro e procura o id correspondente
async function getAutomovel(id : number) : Promise<Automovel | undefined> {
    return new Promise((resolve, reject) => {
            return resolve(automoveis.find(a => a.id === id));

    })
}

async function getAutomoveis(): Promise<Automovel[]> {
    return new Promise((resolve, reject) => {
        return resolve(automoveis);
        
    })
}

//criação de uma instância do tipo automóvel e a adiciona na lista de automóveis
async function addAutomovel(automovel:Automovel): Promise<Automovel> {
    return new Promise((resolve, reject) => {
        if (!automovel.placa || !automovel.cor || !automovel.marca)
            return reject(new Error (`Invalid Vehicle.`));

        const newAutomovel = new Automovel(automovel.placa, automovel.cor, automovel.marca);
        automoveis.push(newAutomovel);

        return resolve(newAutomovel);
    })
}

//atualiza um funcionário
async function updateAutomovel(id: number, automovelData: Automovel) : Promise<Automovel | undefined>{
    return new Promise((resolve, reject) => {
       const index = automoveis.findIndex(a => a.id === id);
       if(index === -1)
            return reject(new Error (`Motorista não encontrado.`));

       //verifica se houve alterações no campo placa, e somente permite alterações quando ela existir
       //os outros if fazem o mesmo com seus respectivos campos
       if(automovelData.placa && automoveis[index] && automoveis[index].placa !== automovelData.placa)
            automoveis[index].placa = automovelData.placa;

        if(automovelData.cor && automoveis[index] && automoveis[index].cor !== automovelData.cor)
            automoveis[index].cor = automovelData.cor;

         if(automovelData.marca && automoveis[index] && automoveis[index].marca !== automovelData.marca)
            automoveis[index].marca = automovelData.marca;

       return resolve(automoveis[index]);
    })
}

//procura e se encontrar, deleta um automóvel
async function deleteAutomovel(id: number) : Promise<boolean>{
     return new Promise((resolve, reject) => {
       const index = automoveis.findIndex(m => m.id === id);
       if(index ===-1)
        return resolve(false);
       
       automoveis.splice(index, 1);

       return resolve(true);
    })
}

export default {
    getAutomovel,
    getAutomoveis,
    addAutomovel,
    updateAutomovel,
    deleteAutomovel, 
    automoveis
}