import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entity/ratings.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { RatingDto } from './dto/rating.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RatingsService {
    constructor(@InjectRepository(Rating) private ratingRepo:Repository<Rating>,@InjectRepository(User) private userRepo:Repository<User>,@InjectRepository(Product) private productRepo:Repository<Product>){}

    async createRating(rating:RatingDto){
       try{
        
        const [user,product]=await Promise.all([
            this.userRepo.findBy({id:rating.user}),
            this.productRepo.findBy({id:rating.product})
        ]);
        if(!user) throw new BadRequestException('User not found');
        if(!product) throw new BadRequestException('Product not found');
        if(!user[0].isActive) throw new BadRequestException('User is not active');
        if(!product[0].isActive) throw new BadRequestException('Product is not active');

        const newRate=plainToInstance(Rating,rating);
        return await this.ratingRepo.save(newRate);
       }catch(err){
           console.log(err);
           throw err;
       }
       
    }
}
