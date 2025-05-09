import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offers } from './entity/offers.entity';
import { Repository } from 'typeorm';
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
      
        try{

            if(!await this.productRepo.findOneBy({id:offers.product,isActive:true}))throw new BadRequestException('Product not found');

            if(await this.offerRepo.findOneBy({id:offers.id,isActive:true,title:offers.title,
                startDate:offers.startDate,endDate:offers.endDate}))throw new BadRequestException('Offer already exists');


             const newOffer= plainToInstance(Offers,offers);
             return await this.offerRepo.save(newOffer);   
        }catch(error){
            throw error;
        }
         
    }

    async getAllOffers(){
        try{
            const offersEntity= await this.offerRepo.find({where:{isActive:true}})
            const offers= plainToInstance(offerDto,offersEntity);
            return offers;
        }catch(error){
          throw error;
        }
    }

    async deleteOffer(id:number){
        try{
            if(!id) throw new BadRequestException('Offer id is required');
            const offer= await this.offerRepo.findOneBy({id});
            if(!offer) throw new BadRequestException('Offer not found');
            offer.isActive=false;
            return await this.offerRepo.save(offer);
        }catch(error){
            throw error;
        }
    }

    async updateOffer(offer:offerDto){

        try{
            if(!offer.id) throw new BadRequestException('Offer id is required');
            const offerEntity= await this.offerRepo.findOneBy({id:offer.id});
            if(!offerEntity) throw new BadRequestException('Offer not found');
            if(!await this.productRepo.findOneBy({id:offer.product,isActive:true}))throw new BadRequestException('Product not found');
            return await this.offerRepo.save(plainToInstance(Offers,offer));
        }catch(error){
            throw error;
        }

    }


}
