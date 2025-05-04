import { Body, Controller, Post } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';

@Controller('rating')
export class RatingsController {
    constructor(private ratingService:RatingsService){}

    @Post()
    async createRating(@Body() rating:RatingDto):Promise<any>{
      const rate=await this.ratingService.createRating(rating);
      return {message:'Rating created successfully',rate};
    }

}
