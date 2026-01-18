export default class Motorista {
    id: number;
    nome: string;

    private static nextId = 0;

    constructor(nome: string){
        this.id = Motorista.nextId++;
        this.nome = nome;
    }
}