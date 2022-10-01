import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './app.js';
import MongoConnection from './db/conn.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(routes);

app.use((req, res, next) => {
    return res.status(404).send({Message : "Page Not Found"});
});

app.listen(3001, async ()=>{
    await MongoConnection();
    console.log("Server is running successfully");
})