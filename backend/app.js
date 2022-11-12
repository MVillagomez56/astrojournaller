import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import router from './routes/userRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();
app.use(cors({origin: true}));
app.use(express.json());


app.use("/api/user",router)
app.use("/api/blog",blogRouter)


// Connect to MongoDB
mongoose.connect("mongodb+srv://admin:LGRjO30UrKEpVGxA@cluster0.vri5pkz.mongodb.net/Blog?retryWrites=true&w=majority")



const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Server started at port "+port);
});

