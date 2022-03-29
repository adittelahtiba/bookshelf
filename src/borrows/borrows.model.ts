import * as mongoose from 'mongoose';

export const BorrowsSchema = new mongoose.Schema({
    book_code: {type:String, required:true},
    member_code: {type:String, required:true},
    qty: {type:Number, required:true},
    borrow_date:{type:Date},
    return_date:{type:Date},
    status:{type:String, required:true}
});


export interface Borrows extends mongoose.Document{
    book_code: string;
    member_code: string;
    qty: number;
    borrow_date:Date;
    return_date:Date;
    status:string;
}