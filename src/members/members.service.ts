import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { findIndex } from 'rxjs';
import { Members } from './members.model';

@Injectable()
export class MembersService {
    private members : Members[]= [];

    constructor(
        @InjectModel('members') private readonly membersModel : Model<Members> , 
    ){}

    async getAllMembers():Promise<Members[]>{
        const members = await this.membersModel.find().exec();
        return members as Members[];
    }

    async getMember(code:string):Promise<Members>{
        const member = await this.membersModel.findOne({code});
        return member as Members;        
    }

    async createMembers(code : string,name : string){
        const newmember = new this.membersModel({code,name});
        return await newmember.save();
        
    }

    async updateMembers(code : string,name : string){
        return await this.membersModel.findOneAndUpdate({code},{code})
    }

    async deleteMember(code:string):Promise<Members>{
        const member = await this.membersModel.findOneAndDelete({code}).exec();
        return member;        
    }
}
