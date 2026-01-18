import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import motoristaRouter from "./routers/motoristaRouter";
import automovelRouter from "./routers/automovelRouter";
import utilizacaoRouter from "./routers/utilizacaoRouter";
 

const app = express();

app.use(morgan("tiny"));

app.use(helmet());

app.use(express.json());

app.use("/api", motoristaRouter);

app.use("/api", automovelRouter);

app.use("/api", utilizacaoRouter);

app.use((req: Request, res: Response, next: NextFunction)=> {
    res.send("Hello World, Rafael");
});

app.use((error: Error, req: Request, res: Response, next: NextFunction)=> {
    res.status(500).send(error.message);
});

export default app;