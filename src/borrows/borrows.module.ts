import { Module } from '@nestjs/common';
import { BorrowsController } from './borrows.controller';
import { BorrowsService } from './borrows.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowsSchema } from './borrows.model';
import { PenaltiSchema } from './penalti.model';
import { BooksModule } from 'src/books/books.module';
import { MembersModule } from 'src/members/members.module';


@Module({
  imports:[BooksModule,MembersModule,MongooseModule.forFeature([{name:'Borrows',schema:BorrowsSchema},{name:'Penalti',schema:PenaltiSchema}])],
  controllers: [BorrowsController],
  providers: [BorrowsService],
})
export class BorrowsModule {}
