import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    private booksService:BooksService

    constructor(booksService:BooksService){
        this.booksService = booksService;
    }

    @Get()
    async getAllBooks(){
        return await this.booksService.getAllBooks();
    }

    @Get('/:code')
    async getBook(@Param('code') code : string){
        return await this.booksService.getBook(code);
    }

    @Post()
    async createBooks(@Body('code') code : string,@Body('title') title : string,@Body('author') author : string, @Body('stock') stock : number){
        return await this.booksService.createBooks(code,title,author,stock);
    }

    @Put()
    async updateBook(@Body('code') code : string,@Body('title') title : string,@Body('author') author : string, @Body('stock') stock : number){
        return await this.booksService.updateBooks(code,title,author,stock);
    }

    @Delete('/:code')
    async deleteBook(@Param('code') code : string){
        return await this.booksService.deleteBook(code);
    }
}
