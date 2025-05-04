import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entity/ratings.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';

@Injectable()
export class RatingsService {
    constructor(@InjectRepository(Rating) private ratingRepo:Repository<Rating>,@InjectRepository(User) private userRepo:Repository<User>,@InjectRepository(Product) private productRepo:Repository<Product>){}

    
}
