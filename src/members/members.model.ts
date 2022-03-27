import * as mongoose from 'mongoose';

export const MembersSchema = new mongoose.Schema({
    code: {type:String, required:true,unique:true},
    name: {type:String, required:true},
});

export interface Members extends mongoose.Document{
    code: string;
    name: string;
}