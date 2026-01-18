import utilizacoes from "../../src/repositories/utilizacaoRepository";
import Utilizacao from "../../src/models/utilizacao.js";
import { describe, expect, test, jest, beforeEach, afterEach, beforeAll, afterAll } from '@jest/globals';

describe("Repository utilização - addUtilizacao",() =>{
    beforeEach(() =>{
        utilizacoes.utilizacoes.length = 0;
    });

    test(" Deve realizar uma adição válida", async () => {
        const utilizacao = new Utilizacao(
                    "15-12-11",
                    "",
                    1,
                    1,
                    "Viagem a trabalho"
        );
        
        const result = await utilizacoes.addUtilizacao(utilizacao)

        expect(result).toBeDefined();
        expect(result).toEqual({"id":1, "dataInicio":"15-12-11", "dataFim": "", "motoristaId": 1, "automovelId": 1, "motivo":"Viagem a trabalho"});
        expect(utilizacoes.utilizacoes.length).toBe(1)
        expect(utilizacoes.utilizacoes[0]?.motoristaId).toBe(1)

    });

    test(" deve rejeitar quando dados obrigatórios não forem informados", async () => {
        const utilizacao = new Utilizacao(
                    "",
                    "",
                    3,
                    5,
                    ""
        );

        await expect(utilizacoes.addUtilizacao(utilizacao)).rejects.toThrow("Invalid Utilization")


    })
})