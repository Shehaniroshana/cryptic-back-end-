import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { RatingsModule } from './ratings/ratings.module';
import { OffersModule } from './offers/offers.module';
import { OrderModule } from './order/order.module';
import configuration from './config/configuration';

@Module({
  imports: [
    // Configuration Module (Environment Variables)
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),

    // Database Module (PostgreSQL with env variables)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production', // Disable in production
        logging: process.env.NODE_ENV === 'development',
      }),
      inject: [ConfigService],
    }),

    UserModule,
    AuthModule,
    ProductModule,
    RatingsModule,
    OffersModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
