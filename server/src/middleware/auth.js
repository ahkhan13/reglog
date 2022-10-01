import Jwt from "jsonwebtoken";
import UserModel from "../modals/userSchema.js";
const SECRET_KEY = "sachinaryasachinarya";
export const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.AuthName;
    const verify = Jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findOne({ _id: verify._id });
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({status : 401, message : "UnauthorisedUser"});
  }
};

export const generateToken = (data) => {
  return Jwt.sign({ _id: data._id }, SECRET_KEY, { expiresIn: "2h" });
};