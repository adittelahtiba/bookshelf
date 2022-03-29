import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { BorrowsService } from './borrows.service';

@Controller('borrows')
export class BorrowsController {
    private borrowsService:BorrowsService

    constructor(borrowsService:BorrowsService){
        this.borrowsService = borrowsService;
    }

    @Get()
    async getAllBorrows(){
        return await this.borrowsService.getAllBorrows();
    }

    @Get('/:code')
    async getBorrow(@Param('code') member_code : string){
        return await this.borrowsService.getBorrowed(member_code);
    }

    @Post()
    async createBorrows(@Body('member_code') member_code : string,@Body('book_code') book_code : string,@Body('qty') qty : number){
        return await this.borrowsService.createBorrows(member_code,book_code,qty);
    }

    @Post('return')
    async returnBorrows(@Body('member_code') member_code : string,@Body('book_code') book_code : string,@Body('qty') qty : number){
        return await this.borrowsService.returnBorrows(member_code,book_code,qty);
    }

    @Put()
    async updateBorrow(@Body('code') code : string,@Body('title') title : string,@Body('author') author : string, @Body('stock') stock : number){
        return await this.borrowsService.updateBorrows(code,title,author,stock);
    }

    @Delete('/:code')
    async deleteBorrow(@Param('code') code : string){
        return await this.borrowsService.deleteBorrow(code);
    }
}
