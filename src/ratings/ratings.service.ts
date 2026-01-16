import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rating } from './entity/ratings.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { RatingDto } from './dto/rating.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RatingsService {
  private readonly logger = new Logger(RatingsService.name);

  constructor(
    @InjectRepository(Rating) private ratingRepo: Repository<Rating>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) { }

  async createRating(rating: RatingDto) {
    try {
      const [user, product] = await Promise.all([
        this.userRepo.findBy({ id: rating.user }),
        this.productRepo.findBy({ id: rating.product }),
      ]);
      if (!user.length) throw new BadRequestException('User not found');
      if (!product.length) throw new BadRequestException('Product not found');
      if (!user[0].isActive)
        throw new BadRequestException('User is not active');
      if (!product[0].isActive)
        throw new BadRequestException('Product is not active');

      const newRate = plainToInstance(Rating, rating);
      return await this.ratingRepo.save(newRate);
    } catch (err) {
      this.logger.error('Error creating rating', err);
      throw err;
    }
  }

  async getAllRatings(): Promise<Rating[]> {
    try {
      const ratings = await this.ratingRepo.find({
        where: { isActive: true },
        relations: { user: true, product: true },
      });
      return plainToInstance(Rating, ratings);
    } catch (error) {
      this.logger.error('Error getting all ratings', error);
      throw error;
    }
  }

  async getRatingById(id: string): Promise<Rating> {
    try {
      if (!id) throw new BadRequestException('Rating id is required');
      const rating = await this.ratingRepo.findOne({
        where: { id },
        relations: { user: true, product: true },
      });
      if (!rating) throw new BadRequestException('Rating not found');
      return plainToInstance(Rating, rating);
    } catch (error) {
      this.logger.error('Error getting rating by id', error);
      throw error;
    }
  }

  async updateRating(rating: RatingDto): Promise<Rating> {
    try {
      if (!rating.id) throw new BadRequestException('Rating id is required');
      if (!(await this.ratingRepo.findOne({ where: { id: rating.id } })))
        throw new BadRequestException('Rating not found');
      return this.ratingRepo.save(plainToInstance(Rating, rating));
    } catch (error) {
      this.logger.error('Error updating rating', error);
      throw error;
    }
  }

  async deleteRating(id: string): Promise<Rating> {
    try {
      if (!id) throw new BadRequestException('Rating id is required');
      const ratingToDelete = await this.ratingRepo.findOne({ where: { id } });
      if (!ratingToDelete) throw new BadRequestException('Rating not found');
      ratingToDelete.isActive = false;
      return await this.ratingRepo.save(ratingToDelete);
    } catch (error) {
      this.logger.error('Error deleting rating', error);
      throw error;
    }
  }

  async getRatingsByProductId(id: string): Promise<Rating[]> {
    try {
      if (!id) throw new BadRequestException('Product id is required');
      const ratings = await this.ratingRepo.find({
        where: { product: { id }, isActive: true },
        relations: { user: true, product: true },
      });
      if (!ratings.length) throw new BadRequestException('Ratings not found');
      return plainToInstance(Rating, ratings);
    } catch (error) {
      this.logger.error('Error getting ratings by product id', error);
      throw error;
    }
  }

  async getRatingsByUserId(id: string): Promise<Rating[]> {
    try {
      if (!id) throw new BadRequestException('User id is required');
      const ratings = await this.ratingRepo.find({
        where: { user: { id }, isActive: true },
        relations: { user: true, product: true },
      });
      if (!ratings.length) throw new BadRequestException('Ratings not found');
      return plainToInstance(Rating, ratings);
    } catch (error) {
      this.logger.error('Error getting ratings by user id', error);
      throw error;
    }
  }

  async getRatingsByUserIdAndProductId(
    userId: string,
    productId: string,
  ): Promise<Rating[]> {
    try {
      if (!userId || !productId)
        throw new BadRequestException('User id and product id are required');
      const ratings = await this.ratingRepo.find({
        where: {
          user: { id: userId },
          product: { id: productId },
          isActive: true,
        },
        relations: { user: true, product: true },
      });
      if (!ratings.length) throw new BadRequestException('Ratings not found');
      return plainToInstance(Rating, ratings);
    } catch (error) {
      this.logger.error(
        'Error getting ratings by user id and product id',
        error,
      );
      throw error;
    }
  }

  async getAverageRatingByProductId(id: string): Promise<number> {
    try {
      if (!id) throw new BadRequestException('Product id is required');
      const ratings = await this.ratingRepo.find({
        where: { product: { id }, isActive: true },
        relations: { user: true, product: true },
      });
      if (!ratings.length) throw new BadRequestException('Ratings not found');
      const sum = ratings.reduce((acc, rating) => acc + rating.rate, 0);
      const average = sum / ratings.length;
      return average;
    } catch (error) {
      this.logger.error('Error getting average rating by product id', error);
      throw error;
    }
  }
}
