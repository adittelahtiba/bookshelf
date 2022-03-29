import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { findIndex } from 'rxjs';
import { Borrows } from './borrows.model';
import { Penalti } from './penalti.model';
import { BooksService } from 'src/books/books.service';
import { MembersService } from 'src/members/members.service';

@Injectable()
export class BorrowsService {
    private borrows : Borrows[]= [];
    private penalti : Penalti[]= [];

    constructor(
        @InjectModel('Borrows') private readonly borrowsModel : Model<Borrows>, 
        @InjectModel('Penalti') private readonly penaltiModel : Model<Penalti>,
        private booksService: BooksService,
        private membersService: MembersService,
    ){}

    async getAllBorrows(){
        const books = await this.booksService.getAllBooks();
        
        return books;
    }

    async getBorrowed(member_code:string):Promise<Borrows[]>{
        const borrow = await this.borrowsModel.find({member_code});
        return borrow as Borrows[];        
    }

    async createBorrows(member_code : string,book_code : string,qty:number){ 
        //count borrowed by this member           
        const borrowed = this.getBorrowed(member_code);
        let jPinjam=0;
        for (var val of await borrowed) {
            jPinjam+=val.qty;
            if (jPinjam >= 2) {
                throw new HttpException(`This member has borrowed ${jPinjam} books`, 400);
            }
        }

        //find stock book
        const books= await this.booksService.getBookWhere({
            code:book_code,
            stock:{ $gte: qty}
        });          
        
        if(!books){
            throw new HttpException(`Insufficient stock of books`, 400);
        }

        //cek penaltiez
        let a = new Date(Date.now()).getTime();
        let b = a;

        const penalti = await this.penaltiModel.find({member_code})
        penalti.forEach((data,i)=>{
            b = new Date(data.date).getTime()
            if ((a-b)<25920000) {
                throw new HttpException(`You are still penalized`, 400);
            }
        })
        
        //update stock
        const updateBook = this.booksService.updateBook(book_code,{
            stock : books.stock-qty
        });

        const newBorrow = new this.borrowsModel({
            member_code,
            book_code,
            qty,
            status:'Pinjam',
            borrow_date: Date.now()
        });
        return await newBorrow.save();
    }

    async returnBorrows(member_code : string,book_code : string,qty:number){
        const borrow = await this.borrowsModel.findOneAndUpdate({member_code,book_code,status:"Pinjam",qty},{
            status : "Dikembalikan",date_return:Date.now()
        });

        if(!borrow){
            throw new HttpException(`Not found borrowed data`, 400);
        }

        let a = new Date(borrow.borrow_date).getTime();
        let b = new Date(Date.now()).getTime();        

        //count date return for penaltiez
        if ((b-a)>=60480000) {
            // 60480000 = 7 days millisecond
            const newPenalti = new this.penaltiModel({
                member_code,
                date:Date.now()
            });
            await newPenalti.save()
        }

        //update book stock
        const books= await this.booksService.getBookWhere({
            code:book_code,
        }); 

        const updateBook = this.booksService.updateBook(book_code,{
            stock : books.stock+qty
        });

        return borrow;
    }

    async updateBorrows(code : string,title : string,author : string, stock:number){
        return await this.borrowsModel.findOneAndUpdate({code},{code,title,author,stock})
    }

    async deleteBorrow(code:string):Promise<Borrows>{
        const borrow = await this.borrowsModel.findOneAndDelete({code}).exec();
        return borrow;        
    }
}
