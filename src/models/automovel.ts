export default class Automovel {
    id: number;
    placa: string;
    cor: string;
    marca: string;

    private static nextId = 0;

    constructor(placa: string, cor: string, marca: string){
        this.id = Automovel.nextId++;
        this.placa = placa;
        this.cor = cor;
        this.marca = marca
    }
}