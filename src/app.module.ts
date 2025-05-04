import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [UserModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'1234',
      database:'cryptic_emporium',
      entities:[__dirname+'/**/*.entity{.ts,.js}'],
      synchronize:true,
    }),
    ProductModule,
    RatingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
