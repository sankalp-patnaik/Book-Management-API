import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Book } from "../models/book.model.js";

const getBooks=asyncHandler(async(req,res)=>{
    const books=await Book.find();
    if(!books)
    {
        throw new ApiError(400,"There is no books to fetch")
    }
   return res
   .status(200)
   .json(new ApiResponse(200,books,"Books fetched successfully"))
})
const addBook=asyncHandler(async(req,res)=>{
    
    const {title,author,publicationYear}=req.body;
    console.log(title,author,publicationYear)
    if(!title && !author && !publicationYear)
    {
        throw new ApiError(400,"All fields are required for Adding Book");
    }
    const book = await Book.create({
        title,
        author,
        publicationYear
    });
    if(!book)
    {
        throw new ApiError(500,"Something went wrong whil adding books");
    }

    return res
    .status(200)
    .json(new ApiResponse(200,book,"Book added successfully"))

})
const filterBooks=asyncHandler(async(req,res)=>{
    const {author,publicationYear}=req.body;
    let filter={};
    if(!author && !publicationYear)
    {
        throw new ApiError(400,"author & publication year required")
    }
    if(author)
    {
        filter.author=author;
    }
    if(publicationYear)
    {
        filter.publicationYear=publicationYear;
    }
    const books=await Book.find(filter);
    if(!books)
    {
        throw new ApiError(500,"Error filtering books")
    }
    return res.status(200)
    .json(new ApiResponse(200,books,"Books Filtered Successfully"))
})

export {
    addBook,
    filterBooks,
    getBooks
}