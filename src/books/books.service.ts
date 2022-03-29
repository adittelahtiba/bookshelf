import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { findIndex } from 'rxjs';
import { Books } from './books.model';

@Injectable()
export class BooksService {
    private books : Books[]= [];

    constructor(
        @InjectModel('Books') private readonly booksModel : Model<Books> , 
    ){}

    async getAllBooks():Promise<Books[]>{
        const books = await this.booksModel.find({stock:{ $gte: 1}}).exec();
        return books as Books[];
    }

    async getBook(code:string):Promise<Books>{
        const book = await this.booksModel.findOne({code});
        return book as Books;        
    }

    getBookWhere(condition){
        const book=this.booksModel.findOne(condition); 
        return book;
    }

    async createBooks(code : string,title : string,author : string, stock:number){
        try {
            const newBook = new this.booksModel({code,title,author, stock});
            return await newBook.save();          
        } catch (error) {
            if (error) {
                throw new HttpException(error.message,400);
                
            }
        }
              
        
    }

    async updateBooks(code : string,title : string,author : string, stock:number){
        return await this.booksModel.findOneAndUpdate({code},{code,title,author,stock})
    }

    async updateBook(code : string,data : object){
        return await this.booksModel.findOneAndUpdate({code},data)
    }

    async deleteBook(code:string):Promise<Books>{
        const book = await this.booksModel.findOneAndDelete({code}).exec();
        return book;        
    }
}
