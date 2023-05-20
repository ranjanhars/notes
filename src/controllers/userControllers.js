const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const SECRET_KEY = "Harsh"

const signup=async (req,res)=>{

    // existing user
    //hashed password
    //User creation
    //Token Generate

    const {username,email,password} = req.body
    try{
        const existingUser =await userModel.findOne({email:email });
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }
        //hashed password
        const hashedpassword = await bcrypt.hash(password,10);

        //User creation
        const result = await userModel.create({
            email :email,
            password: hashedpassword,
            username:username
        });

        const token = jwt.sign({email :result.email,id:result._id},SECRET_KEY)
        res.status(201).json({user:result,token:token})


    } catch (error){
        console.log(error)
        res.status(500).json({message:"Something Went wrong"});
        
    }

}

const signin= async (req,res)=>{
    const {email,password} = req.body;

    try{
    const existingUser = await userModel.findOne({email :email})
    if(!existingUser){
        return res.status(404).json({message: "User Not found"});
    }

    const matchPassword = await bcrypt.compare(password,existingUser.password);

    if(!matchPassword){
        return res.status(400).json({message :"Invalid Credentials"});
    }

    const token = jwt.sign({email :existingUser.email,id:existingUser._id},SECRET_KEY)
    res.status(201).json({user:existingUser,token:token})

    }catch(error){
        console.log(error)
        res.status(500).json({message:"Something Went wrong"});
    }
}

module.exports = {signup,signin};