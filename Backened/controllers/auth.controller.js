import bcrypt from 'bcryptjs';
import User from '../models/schema.js';
import {errorHandler} from "../utiles/error.js";
import jwt from "jsonwebtoken";



export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required.' });
    }

    // Check if user with the same email already exists
    const isExist = await User.findOne({ email });

    if (isExist) {
      // User with the specified email already exists
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const hashPassword = await bcrypt.hashSync(password, 10);
    const hashedPassword = hashPassword.toString();

    const newUser = new User({ username, email, password: hashedPassword });

    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      return res.status(500).json({ error: 'Error creating user.' });
    }
  } catch (error) {
    console.error('Error in signup:', error);
    next(error);
  }
};



export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_TOKEN);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleLogin= async (req,res,next)=>{
  try {
    const user=await User.findOne({email:req.body.email});
    if(user){
      const {password:pass,...rest}=user._doc;
      const token=jwt.sign({id:user._id},process.env.JWT_TOKEN);
      res.cookie('access_token', token, {secure: true ,httpsOnly: true}).status(200).json(rest);
    }else{
      const gereratedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashPassword=await bcrypt.hashSync(gereratedPassword, 10);
      const newUser=new User({username:req.body.username.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),email:req.body.email,password:hashPassword,profilePhoto:req.body.photo})
      await newUser.save();
    const {password:pass,...rest}=newUser._doc;
    const token=jwt.sign({id:newUser._id},process.env.JWT_TOKEN);
    res.cookie('access_token',token,{ httpsOnly:true}).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }

}
export const signOutUser=async(req,res,next)=>{

  try {
       res.clearCookie('access_token');
       res.status(200).json('User has been Sign out successfully');
      
  } catch (error) {
      next(error);
  }
}