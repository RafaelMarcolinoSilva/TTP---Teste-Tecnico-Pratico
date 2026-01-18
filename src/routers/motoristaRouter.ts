import express from "express";
import motoristaController from "../controllers/motoristaController";


//responsável por endereçar as requisições para os seus respectivos destinos
const router = express.Router();

router.get("/motoristas/:id", motoristaController.getMotorista);

router.get("/motoristas", motoristaController.getMotoristas);

router.post("/motoristas", motoristaController.postMotorista);

router.patch("/motoristas/:id", motoristaController.patchMotorista);

router.delete("/motoristas/:id", motoristaController.deleteMotorista);



export default router;