import * as mongoose from 'mongoose';

export const PenaltiSchema = new mongoose.Schema({
    member_code: {type:String, required:true},
    date: {type:Date, required:true},
});


export interface Penalti extends mongoose.Document{
    book_code: string;
    date: Date;
}