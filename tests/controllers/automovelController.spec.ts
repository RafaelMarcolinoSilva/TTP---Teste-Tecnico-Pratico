import request from "supertest";
import app from "../../src/app";
import automoveis from "../../src/repositories/automovelRepository"
import { describe, expect, test, jest, beforeEach, afterEach, beforeAll, afterAll } from '@jest/globals';

describe("Get/ automoveis", () => {
    beforeEach(() =>{
        automoveis.automoveis.splice(0);
        automoveis.addAutomovel({ id: 1, marca: "Fiat", cor: "Azul", placa: "ABC-1234" })
        automoveis.addAutomovel({id: 2, marca: "Ford", cor: "Preto", placa: "DEF-5678" })
    });

    test("Deve retornar Todos os automóveis quando não passado nenhum parâmetro", async () => {
    const response = await request(app).get("/api/automoveis");

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(2);
    });

    test("Deve filtrar automóveis pela COR", async () => {
    const response = await request(app).get("/api/automoveis").query({ search: "azul" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].cor).toBe("Azul");
  });

  test("deve filtrar automóveis pela MARCA", async () => {
    const response = await request(app).get("/api/automoveis").query({ search: "fiat" });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].marca).toBe("Fiat");
  });

   test("deve retornar 404 quando não encontrar automóvel por cor ou marca", async () => {
    const response = await request(app).get("/api/automoveis").query({ search: "verde" });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Não existe automóvel cadastrado com essa cor ou com essa marca");
  });

})

