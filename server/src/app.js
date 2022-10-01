import express  from "express";
import UserModel from "./modals/userSchema.js";
import { generateToken } from "./middleware/auth.js";
import { Auth } from "./middleware/auth.js";
const router = express.Router();

router.post('/signup', async (req, res) => {
    try{
    const {fullName, email, password, repeat_password} = req.body;
    if(password===repeat_password){
        const data = await UserModel.findOne({email: email});
        if(data){
            return res.status(200).send({status : 200, message : "Email already exists"});
        }
        const user = new UserModel({
            fullName,
            email,
            password
        });
          const token = generateToken(user);
          user.token = token;
          await user.save();
          return res.status(200).send({status : 200, data : user, message : "User Registered successfully"});
    }

    return res.status(200).send({status : 200, message : "Password not matching"});
    }catch(err){
    return res.status(400).send({status : 400, message : err}); 
    }
})

router.post('/login', async (req, res) => {
    try{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email: email});
    if(user){
       if(password === user.password){
        const token = generateToken(user);
        user.token = token;
        res.cookie('AuthName', token, {
          expires: new Date(Date.now() + 3000000),
          httpOnly: false,
        });
        await user.save();
        return res.status(200).send({data : user, status : 200});
       }else{
        return res.status(400).send({status : 400, message : "Password not matching"});
       }
    }
    return res.status(400).send({status : 400, message : "Email not macthing"});
    }catch(err){
    return res.status(400).send(err);
    }
})

router.put('/update', Auth,  async (req, res) => {
    try{
    const {_id} = req.user;
    const user = await UserModel.findOneAndUpdate({_id : _id}, {$set : req.body});
    if(user){
        return res.status(200).send({status : 200, message: "User updated successfully"}); 
    }
    return res.status(201).send({message: "User not found"}); 
    }catch(err){
    return res.status(401).send({message: "Error"});
    }
})
router.get('/user', Auth,  async (req, res) => {
    try{
    const {_id} = req.user;
    const user = await UserModel.findOne({_id : _id});
    if(user){
        return res.status(200).send({status : 200, data : user}); 
    }
    return res.status(201).send({status : 400 , message: "User not found"}); 
    }catch(err){
    return res.status(401).send({message: "Error"});
    }
})
router.post('/logout', Auth, async (req, res) => {
    req.user.token = '';
    
    res.clearCookie('AuthName');
    res.clearCookie('AuthName', {domain: "localhost", path: '/'});
    await req.user.save();
    return res.status(200).send({status : 200, message : "User logout succesfully"})
})

export default router;