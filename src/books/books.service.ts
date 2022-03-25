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
        const books = await this.booksModel.find().exec();
        return books as Books[];
    }

    async getBook(code:string):Promise<Books>{
        const book = await this.booksModel.findOne({code});
        return book as Books;        
    }

    async createBooks(code : string,title : string,author : string, stock:number){
        const newBook = new this.booksModel({code,title,author, stock});
        return await newBook.save();
        
    }

    async updateBooks(code : string,title : string,author : string, stock:number){
        return await this.booksModel.findOneAndUpdate({code},{code,title,author,stock})
    }
}
