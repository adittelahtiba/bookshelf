import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MembersSchema } from './members.model';


@Module({
  imports:[MongooseModule.forFeature([{name:'members',schema:MembersSchema}])],
  controllers: [MembersController],
  providers: [MembersService],
  exports:[MembersService]
})
export class MembersModule {}
