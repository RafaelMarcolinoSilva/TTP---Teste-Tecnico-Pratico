export default class Utilizacao {

    id: number;
    dataInicio: string;
    dataFim: string;
    motoristaId: number;
    automovelId: number;
    motivo: string

    private static nextId = 0;

    constructor(dataInicio: string, dataFim: string, motoristaId: number, automovelId: number, motivo: string){
        this.id = Utilizacao.nextId++;
        this.dataInicio = dataInicio;
        this.motoristaId = motoristaId;
        this.automovelId = automovelId;
        this.motivo = motivo;
        this.dataFim = dataFim;
    }
}