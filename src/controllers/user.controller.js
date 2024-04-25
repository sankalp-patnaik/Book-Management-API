import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const generateAccessAndRefreshTokens=async(userId)=>{

    try {
        const user=await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken=refreshToken;
        await user.save({ validateBeforeSave:false });
        return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access tokens")
    }

}
const registerUser=asyncHandler(async(req,res)=>{
    const {username,password} =req.body;
    console.log(username,password)
    if(
        [username,password].some((field)=>field?.trim()==="")
    )
    {
        throw new ApiError(400,"All fields are required!")
    }
    const existedUser=await User.findOne({username});
    if(existedUser)
    {
        throw new ApiError(409,"User with username already registered");
    }
    const user=await User.create({
        username:username.toLowerCase(),
        password
    })
    const createdUser=await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser)
    {
        throw new ApiError(500,"Something went wrong while registering the user");
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
})
const loginUser=asyncHandler(async(req,res)=>{
    const{username,password}=req.body;
    if(!username && !password)
    {
        throw new ApiError(400,"Username & Password are required")
    }

    const user=await User.findOne({username});
    if(!user)
    {
        throw new ApiError(404,"User does not exist");
    }
    const isPasswordValid=await user.isPasswordCorrect(password);

    if(!isPasswordValid)
    {
        throw new ApiError(401,"Invalid user credentials");
    }
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(user._id);
    const loggedInUser=await User.findById(user._id)
    .select("-password -refreshtoken");
    const options={
        // cookies should be modified only by servers not by frontend users
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,accessToken,refreshToken
            },
            "User logged In Successfully"
        )
    )
    
    

})
const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )
    const options={
        // cookies should be modified only by servers not by frontend users
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out"));
})
const refreshAccessToken=asyncHandler(async(req,res)=>{
    const incomingRefreshToken=req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken)
    {
        throw new ApiError(401,"unauthorized request")
    }
    try {
        const decodedToken=jwt.verify(
            incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET
        )
        const user=await User.findById(decodedToken?._id);
        if(!user)
        {
            throw new ApiError(401,"Invalid refresh token")
        }
        if(incomingRefreshToken!==user?.refreshToken){
            throw new ApiError(401,"Refresh Token is expired or used")
        }
        const options={
            httpOnly:true,
            secure:true
        }
        const {accessToken,newRefreshToken}=await generateAccessAndRefreshTokens(user._id);
        return res
        .status(200)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}