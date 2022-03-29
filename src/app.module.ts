import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BorrowsModule } from './borrows/borrows.module';

@Module({
  imports: [BooksModule,MembersModule,BorrowsModule,MongooseModule.forRoot('mongodb+srv://adityapangestu:adityapangestu@cluster0.1juvq.mongodb.net/bookshelf?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
