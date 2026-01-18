import express from "express";
import utilizacaoController from "../controllers/utilizacaoCotroller";


//responsável por endereçar as requisições para os seus respectivos destinos
const router = express.Router();

router.get("/utilizacoes/:id", utilizacaoController.getUtilizacao);

router.get("/utilizacoes", utilizacaoController.getUtilizacoes);

router.post("/utilizacoes", utilizacaoController.postUtilizacao);

router.patch("/utilizacoes/:id", utilizacaoController.patchUtilizacao);


export default router;