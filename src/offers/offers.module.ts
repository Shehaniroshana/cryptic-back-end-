import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offers } from './entity/offers.entity';
import { Product } from 'src/product/entity/product.entity';

@Module({
  providers: [OffersService],
  controllers: [OffersController],
  imports:[TypeOrmModule.forFeature([Offers]),Product]
  
})
export class OffersModule {}
