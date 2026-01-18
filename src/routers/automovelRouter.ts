import express from "express";
import automovelController from "../controllers/automovelController";


//responsável por endereçar as requisições para os seus respectivos destinos
const router = express.Router();

router.get("/automoveis/:id", automovelController.getAutomovel);

router.get("/automoveis", automovelController.getAutomoveis);

router.post("/automoveis", automovelController.postAutomovel);

router.patch("/automoveis/:id", automovelController.patchAutomovel);

router.delete("/automoveis/:id", automovelController.deleteAutomovel);



export default router;