import Motorista from "../models/motorista";

const motoristas : Motorista[] = [];
const motorista = new Motorista("Rafael")
motoristas.push(motorista)
console.log(motoristas)

//procura por um motorista pelo seu id
async function getMotorista(id : number) : Promise<Motorista | undefined> {
    return new Promise((resolve, reject) => {
            return resolve(motoristas.find(m => m.id === id));

    })
}

//exibe todos os motoristas que estiverem cadastrados
async function getMotoristas(): Promise<Motorista[]> {
    return new Promise((resolve, reject) => {
        return resolve(motoristas);
        
    })
}

//adiciona um motorista somente quando houver nome
async function addMotorista(motorista:Motorista): Promise<Motorista> {
    return new Promise((resolve, reject) => {
        if (!motorista.nome)
            return reject(new Error (`Invalid motorista.`));

        const newMotorista = new Motorista(motorista.nome);
        motoristas.push(newMotorista);

        return resolve(newMotorista);
    })
}

// atualiza o motorista somente quando o id for passado e validado
async function updateMotorista(id: number, motoristaData: Motorista) : Promise<Motorista | undefined>{
    return new Promise((resolve, reject) => {
       const index = motoristas.findIndex(m => m.id === id);
       if(index === -1)
            return reject(new Error (`Motorista não encontrado.`));

       if(motoristaData.nome && motoristas[index] && motoristas[index].nome !== motoristaData.nome)
            motoristas[index].nome = motoristaData.nome;

       return resolve(motoristas[index]);
    })
}


//deleta o motorista que for encontrado passado o seu id
async function deleteMotorista(id: number) : Promise<boolean>{
     return new Promise((resolve, reject) => {
       const index = motoristas.findIndex(m => m.id === id);
       if(index ===-1)
        return resolve(false);
       
       motoristas.splice(index, 1);

       return resolve(true);
    })
}

export default {
    getMotorista,
    getMotoristas,
    addMotorista,
    updateMotorista,
    deleteMotorista
}