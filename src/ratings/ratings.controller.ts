import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

    @Get('all')
    async getAllRatings():Promise<any>{
        const rates=await this.ratingService.getAllRatings();
        return {message:'All ratings',rates};
    }
    @Post('get/:id')
    async getRatingById(@Param('id')id:number):Promise<any>{
        const rate=await this.ratingService.getRatingById(id);
        return {message:'Rating fetched successfully',rate};
    }
    @Post('update')
    async updateRating(@Body() rating:RatingDto):Promise<any>{
        const rate=await this.ratingService.updateRating(rating);
        return {message:'Rating updated successfully',rate};
    }

    @Post('delete/:id')
    async deleteRating(@Param('id')id:number):Promise<any>{
        const rate=await this.ratingService.deleteRating(id);
        return {message:'Rating deleted successfully',rate};
    }

}
