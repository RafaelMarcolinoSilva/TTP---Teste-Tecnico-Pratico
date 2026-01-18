import Utilizacao from "../../src/models/utilizacao";
import { describe, expect, test }from '@jest/globals';


describe("Model Utilizacao",() =>{
    test(" Deve criar uma utilização de um automóvel por um motorista com os dados corretos", () => {
        const utilizacao = new Utilizacao(
            "15-12-11",
            "",
            1,
            1,
            "Viagem a trabalho"
        );

        expect(utilizacao.id).toBeDefined();
        expect(utilizacao.dataInicio).toBe("15-12-11")
        expect(utilizacao.dataFim).toBe("");
        expect(utilizacao.motoristaId).toBe(1);
        expect(utilizacao.automovelId).toBe(1);
        expect(utilizacao.motivo).toBe("Viagem a trabalho");

    });
});