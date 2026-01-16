import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offers } from './entity/offers.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  providers: [OffersService],
  controllers: [OffersController],
  imports: [TypeOrmModule.forFeature([Offers]), ProductModule],
})
export class OffersModule {}
