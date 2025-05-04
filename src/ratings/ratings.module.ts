import { Module } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entity/ratings.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [RatingsService],
  controllers: [RatingsController],
  imports:[TypeOrmModule.forFeature([Rating]),UserModule,ProductModule]
})
export class RatingsModule {}
