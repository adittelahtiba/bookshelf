import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { MembersModule } from './members/members.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [BooksModule,MembersModule,MongooseModule.forRoot('mongodb://localhost:27017/bookshelf')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
