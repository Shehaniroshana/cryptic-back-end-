import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offers } from './entity/offers.entity';
import { Between, Repository } from 'typeorm';
import { offerDto } from './dto/offers.dto';
import { Product } from 'src/product/entity/product.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OffersService {
    constructor(
        @InjectRepository(Offers)
        private offerRepo: Repository<Offers>,
        @InjectRepository(Product)
        private productRepo: Repository<Product>) { }

    async createOffer(offers: offerDto): Promise<Offers> {

        try {

            if (!await this.productRepo.findOneBy({ id: offers.product, isActive: true })) throw new BadRequestException('Product not found');

            if (await this.offerRepo.findOneBy({
                id: offers.id, isActive: true, title: offers.title,
                startDate: offers.startDate, endDate: offers.endDate
            })) throw new BadRequestException('Offer already exists');


            const newOffer = plainToInstance(Offers, offers);
            return await this.offerRepo.save(newOffer);
        } catch (error) {
            Logger.error('Error creating offer', error);
            throw error;
        }

    }

    async getAllOffers(): Promise<offerDto[]> {
        try {
            const offersEntity = await this.offerRepo.find({ where: { isActive: true } })
            const offers = plainToInstance(offerDto, offersEntity);
            return offers;
        } catch (error) {
            Logger.error('Error getting all offers', error);
            throw error;
        }
    }

    async deleteOffer(id: number): Promise<Offers> {
        try {
            if (!id) throw new BadRequestException('Offer id is required');
            const offer = await this.offerRepo.findOneBy({ id });
            if (!offer) throw new BadRequestException('Offer not found');
            offer.isActive = false;
            return await this.offerRepo.save(offer);
        } catch (error) {
            Logger.error('Error deleting offer', error);
            throw error;
        }
    }

    async updateOffer(offer: offerDto): Promise<Offers> {

        try {
            if (!offer.id) throw new BadRequestException('Offer id is required');
            const offerEntity = await this.offerRepo.findOneBy({ id: offer.id });
            if (!offerEntity) throw new BadRequestException('Offer not found');
            if (!await this.productRepo.findOneBy({ id: offer.product, isActive: true })) throw new BadRequestException('Product not found');
            return await this.offerRepo.save(plainToInstance(Offers, offer));
        } catch (error) {
            Logger.error('Error updating offer', error);
            throw error;
        }

    }

    async getOfferById(id: number): Promise<offerDto> {
        try {
            if (!id) throw new BadRequestException('Offer id is required');
            const offer = await this.offerRepo.findOneBy({ id });
            if (!offer) throw new BadRequestException('Offer not found');
            return plainToInstance(offerDto, offer);
        } catch (error) {
            Logger.error('Error getting offer by id', error);
            throw error;
        }
    }

    async getOffersByUserIdAndProductId(userId: number, productId: number): Promise<offerDto[]> {
        try {
            if(!userId) throw new BadRequestException('User id is required');
            if(!productId) throw new BadRequestException('Product id is required');
            const offers = await this.offerRepo.find({ where: {product: { id: productId,seller: {id: userId,  isActive:true}},isActive: true},relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by user id and product id', error);
            throw error;
        }
    }

    async getOffersByProductId(productId: number): Promise<offerDto[]>{
        try {
            if (!productId) throw new BadRequestException('Product id is required');
            const offers = await this.offerRepo.find({ where: { product: { id: productId }, isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by product id', error);
            throw error;
        }
    }

    async getOffersByDiscount(discount: number): Promise<offerDto[]> {
        try {
            if (!discount) throw new BadRequestException('Discount is required');
            const offers = await this.offerRepo.find({ where: { discount, isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by discount', error);
            throw error;
        }
    }

    async getOffersByDiscountBetween(min: number, max: number): Promise<offerDto[]> {
        try {
            if (!min) throw new BadRequestException('Min discount is required');
            if (!max) throw new BadRequestException('Max discount is required');
            const offers = await this.offerRepo.find({ where: { discount: Between(min, max), isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by discount between', error);
            throw error;
        }
    }

    async getOffersByStartDate(date: Date):Promise<offerDto[]>{
        try {
            if (!date) throw new BadRequestException('Start date is required');
            const offers = await this.offerRepo.find({ where: { startDate: date, isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by start date', error);
            throw error;
        }
    }

    async getOffersByEndDate(endDate: Date):Promise<offerDto[]> {
        try {
            if (!endDate) throw new BadRequestException('End date is required');
            const offers = await this.offerRepo.find({ where: { endDate, isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by end date', error);
            throw error;
        }
    }

    async getOffersByTitle(title:string) {
        try {
            if (!title) throw new BadRequestException('Title is required');
            const offers = await this.offerRepo.find({ where: { title, isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by title', error);
            throw error;
        }
    }

    async getOffersBySellerId(sellerId: number) {
        try {
            if (!sellerId) throw new BadRequestException('Seller id is required');
            const offers = await this.offerRepo.find({ where: { product: { seller: { id: sellerId } }, isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by seller id', error);
            throw error;
        }
    }

    async getOffersByStartAndEndDate(startDate: Date, endDate: Date) {
        try {
            if (!startDate) throw new BadRequestException('Start date is required');
            if (!endDate) throw new BadRequestException('End date is required');
            const offers = await this.offerRepo.find({ where: { startDate: Between(startDate, endDate), isActive: true }, relations: ['product', 'product.seller'] });
            if (!offers.length) throw new BadRequestException('Offers not found');
            return plainToInstance(offerDto, offers);
        } catch (error) {
            Logger.error('Error getting offers by start and end date', error);
            throw error;
        }
    }
  

}
