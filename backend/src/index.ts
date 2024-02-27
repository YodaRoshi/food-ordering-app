import express,{Request, Response} from "express"; 
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGO_CONNECTION_STRING as string)
    .then(()=> console.log("Connectd to database!"))

// create a new Express server
const app = express();
const port = 3000;
// express.json(): a middleware automatically 
// convert the body of any request to our API server to Json
app.use(express.json())
app.use(cors())


app.get("/", async(req: Request, res: Response)=> {
    res.json({messsage: "Hello!" })
})
app.get("/test", async(req: Request, res: Response)=> {
    console.log("test!")
    res.json({messsage: "Hello!" })
})

app.listen(port, ()=>{
    console.log(`server started on localhost:${port}`)
})
