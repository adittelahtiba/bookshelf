import * as mongoose from 'mongoose';

export const BooksSchema = new mongoose.Schema({
    code: {type:String, required:true,unique:true},
    title: {type:String, required:true},
    author: {type:String, required:true},
    stock: {type:Number, required:true},
});

export interface Books extends mongoose.Document{
    code: string;
    title: string;
    author: string;
    stock: number;
}