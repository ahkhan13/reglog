import mongoose from "mongoose";
const MongoConnection = async () => {
    try{
       await mongoose.connect('mongodb://localhost:27017/users?retryWrites=true&w=majority');
       console.log("DB connected successfully");
    }catch(err){
        console.log("DB connection error", err);
    }
}

export default MongoConnection;