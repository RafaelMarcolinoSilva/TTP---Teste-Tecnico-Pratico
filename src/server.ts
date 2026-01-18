import dotenv from "dotenv";
import app from  "./app";

dotenv.config();

const PORT :number = parseInt(`${process.env.PORT}`);



app.listen(PORT, ()=> console.log(`Server is running at ${PORT}!`));