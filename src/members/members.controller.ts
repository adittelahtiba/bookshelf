import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
    private membersService:MembersService

    constructor(membersService:MembersService){
        this.membersService = membersService;
    }

    @Get()
    async getAllMembers(){
        return await this.membersService.getAllMembers();
    }

    @Get('/:code')
    async getmember(@Param('code') code : string){
        return await this.membersService.getMember(code);
    }

    @Post()
    async createmembers(@Body('code') code : string,@Body('name') name : string){
        return await this.membersService.createMembers(code,name);
    }

    @Put()
    async updateMember(@Body('code') code : string,@Body('name') name : string){
        return await this.membersService.updateMembers(code,name);
    }

    @Delete('/:code')
    async deleteMember(@Param('code') code : string){
        return await this.membersService.deleteMember(code);
    }
}
