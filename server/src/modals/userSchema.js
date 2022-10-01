import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required:true,
    }, 
    email : {
        type : String,
        required:true,
        trim: true,
        lowercase: true,
    }, 
    password : {
        type : String,
        required:true,
    },
    token : {
         type:String,
    }

});
const UserModel = new mongoose.model("User", userSchema);
export default UserModel;