import userModel from "../model/user.model.js";
import { sendEmail } from "../services/mail.services.js";
import dotenv from "dotenv"
dotenv.config()
import  jwt from "jsonwebtoken"


export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
      success: false,
      err: "User already exsists",
    });
  }

  const user = await userModel.create({
    username,
    email,
    password,
  });
 
  const token = jwt.sign({email:user.email},process.env.JWT_SECRET)
  
  await sendEmail({
    to: email,
    subject: "Welcome to PerplexCity",
    text: `Hello ${username}, welcome to PerplexCity! We're excited to have you on board.`,
    html: `<h1>Hello ${username},</h1><p>Welcome to <strong>PerplexCity</strong>! We're excited to have you on board.</p>
    please verify your email by clicking the link below:</p>
    <a href="http://localhost:8080/api/auth/verify-email?token=${token}">Verify Email</a>
    <p>Thank you for joining us!</p>
    `,
  });

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};


export const verifyEmailController = async (req,res)=>{
   const {token} = req.query

   try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

   const user =await userModel.findOne({email:decoded.email})

   if(!user){
    return res.status(400).json({
      message:"invalid token",
      success:false,
      err:"User not found"
    })
   }
   

   user.verified = true
   await user.save()

  const htmlContent = `
  <h1>Email Verified Successfully</h1>
  <p>Thank you for verifying your email. You can now log in to your account.</p>
  <a href="http://localhost:8080/login">Login</a>
  `;
  
  res.send(htmlContent)
   }catch(err){
     re.status(400).json({
      message:"Invalid token",
      success:false,
      err:"Token is invalid or expired"
     })
   }

}


export const loginController = async (req,res)=>{
  const {email,password} = req.body

  if(!email || !password){
    return res.status(400).json({
      message:"All fields are required",
      success:false,
      err:"All fields are required"
    })
  }

   const user = await userModel.findOne({email})

   if(!user){
    return res.status(400).json({
      message:"Invalid crentials",
      success:false,
      err:"User not found"
    })  
   }

    const isPasswordMatched = await user.comparePassword(password)

    if(isPasswordMatched){
      return res.status(400).json({
        message:"Invalid crentials",
        success:false,
        err:"Password does not match"
      })
    }

     
    if(!user.verified){
       return res.status(400).json({
        message:"Please verify your email before logging in",
        success:false,
        err:"Email not verified"
      })
    }

    const token = jwt.sign({email:user.email},process.env.JWT_SECRET)

    res.cookie("token",token)


    res.status(200).json({
      message:"User logged in successfully",
      success:true,
      user:{
        id:user._id,
        username:user.username,
        email:user.email
      }
    })

}


export const getMeController = async (req,res)=>{
  const user = req.user

  const userDetails = await userModel.findOne({email:user.email})

  res.status(200).json({
    message:"User details fetched successfully",
    success:true,
    user:{
      id:userDetails._id,
      username:userDetails.username,
      email:userDetails.email,
      verified:userDetails.verified
    }
  })
  
}