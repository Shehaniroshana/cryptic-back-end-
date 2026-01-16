import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { RatingDto } from './dto/rating.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('rating')
export class RatingsController {
  constructor(private ratingService: RatingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRating(@Body() rating: RatingDto): Promise<any> {
    const rate = await this.ratingService.createRating(rating);
    return { message: 'Rating created successfully', rate };
  }

  @Get('all')
  async getAllRatings(): Promise<any> {
    const rates = await this.ratingService.getAllRatings();
    return { message: 'All ratings', rates };
  }

  @Post('get/:id')
  async getRatingById(@Param('id') id: number): Promise<any> {
    const rate = await this.ratingService.getRatingById(id);
    return { message: 'Rating fetched successfully', rate };
  }

  @Post('update')
  @UseGuards(JwtAuthGuard)
  async updateRating(@Body() rating: RatingDto): Promise<any> {
    const rate = await this.ratingService.updateRating(rating);
    return { message: 'Rating updated successfully', rate };
  }

  @Post('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteRating(@Param('id') id: number): Promise<any> {
    const rate = await this.ratingService.deleteRating(id);
    return { message: 'Rating deleted successfully', rate };
  }

  @Post('product/:id')
  async getRatingsByProductId(@Param('id') id: number): Promise<any> {
    const rates = await this.ratingService.getRatingsByProductId(id);
    return { message: 'Ratings fetched successfully', rates };
  }

  @Post('user/:id')
  async getRatingsByUserId(@Param('id') id: number): Promise<any> {
    const rates = await this.ratingService.getRatingsByUserId(id);
    return { message: 'Ratings fetched successfully', rates };
  }

  @Post('user/:userId/product/:productId')
  async getRatingsByUserIdAndProductId(
    @Param('userId') userId: number,
    @Param('productId') productId: number,
  ): Promise<any> {
    const rates = await this.ratingService.getRatingsByUserIdAndProductId(
      userId,
      productId,
    );
    return { message: 'Ratings fetched successfully', rates };
  }

  @Post('product/:id/average')
  async getAverageRatingByProductId(@Param('id') id: number): Promise<any> {
    const rate = await this.ratingService.getAverageRatingByProductId(id);
    return { message: 'Average rating fetched successfully', rate };
  }
}
