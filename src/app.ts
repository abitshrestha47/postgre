import express,{Application,Request,Response,NextFunction} from 'express';
import { authRouter } from './routes/authRoute';
import { categoryRouter } from './routes/categoryRoute';
import { productRouter } from './routes/productRoute';
import { cartRouter } from './routes/cartRoute';
import cors from 'cors';
import 'dotenv/config.js'


const PORT=process.env.PORT;

const app:Application=express();


app.get('/',(req:Request,res:Response,next:NextFunction)=>{
    res.send('Hello');
});

app.use(express.static('public'));
app.use('/images', express.static('public/assets/images'));

app.use(cors());
app.use(express.json());
app.use('/',authRouter);
app.use('/',categoryRouter);
app.use('/',productRouter);
app.use('/',cartRouter);

app.listen(8000,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
