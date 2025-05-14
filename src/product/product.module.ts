import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { UserModule } from 'src/user/user.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports:[TypeOrmModule.forFeature([Product]),UserModule,OrderModule],
  exports:[TypeOrmModule]
})
export class ProductModule {}
