import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { offerDto } from './dto/offers.dto';

@Controller('offers')
export class OffersController {
    constructor(private offerService:OffersService) {}

    @Post()
    @HttpCode(201)
    async createOffer(@Body() offer: offerDto): Promise<any> {
        const newOffer = await this.offerService.createOffer(offer);
        return {
            message: 'Offer created successfully',
            offer: newOffer,
        };
    }

    @Get()
    @HttpCode(200)
    async getAllOffers(): Promise<any> {
        const offers = await this.offerService.getAllOffers();
        return {
            message: 'Offers retrieved successfully',
            offers: offers,
        };
    }

    @Delete('delete/:id')
    @HttpCode(200)
    async deleteOffer(@Param('id') id: number): Promise<any> {
        const deletedOffer = await this.offerService.deleteOffer(id);
        return {
            message: 'Offer deleted successfully',
            offer: deletedOffer,
        };
    }

    @Post('update')
    @HttpCode(200)
    async updateOffer(@Body() offer: offerDto): Promise<any> {
        const updatedOffer = await this.offerService.updateOffer(offer);
        return {
            message: 'Offer updated successfully',
            offer: updatedOffer,
        };
    }

}
