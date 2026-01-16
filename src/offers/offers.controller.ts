import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { offerDto } from './dto/offers.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('offers')
export class OffersController {
  constructor(private offerService: OffersService) { }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  async deleteOffer(@Param('id', new ParseUUIDPipe()) id: string): Promise<any> {
    const deletedOffer = await this.offerService.deleteOffer(id);
    return {
      message: 'Offer deleted successfully',
      offer: deletedOffer,
    };
  }

  @Post('update')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  async updateOffer(@Body() offer: offerDto): Promise<any> {
    const updatedOffer = await this.offerService.updateOffer(offer);
    return {
      message: 'Offer updated successfully',
      offer: updatedOffer,
    };
  }

  @Get('get/:id')
  @HttpCode(200)
  async getOfferById(@Param('id', new ParseUUIDPipe()) id: string): Promise<any> {
    const offer = await this.offerService.getOfferById(id);
    return {
      message: 'Offer retrieved successfully',
      offer: offer,
    };
  }

  @Get('getByProduct/:id')
  @HttpCode(200)
  async getOffersByProduct(@Param('id', new ParseUUIDPipe()) id: string): Promise<any> {
    const offers = await this.offerService.getOffersByProductId(id);
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }

  @Get('getBySeller/:id')
  @HttpCode(200)
  async getOffersBySeller(@Param('id', new ParseUUIDPipe()) id: string): Promise<any> {
    const offers = await this.offerService.getOffersBySellerId(id);
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }

  @Get('getByTitle/:title')
  @HttpCode(200)
  async getOffersByTitle(@Param('title') title: string): Promise<any> {
    const offers = await this.offerService.getOffersByTitle(title);
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }

  @Get('getByStartDate/:date')
  @HttpCode(200)
  async getOffersByStartDate(@Param('date') date: Date): Promise<any> {
    const offers = await this.offerService.getOffersByStartDate(date);
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }

  @Get('getByEndDate/:date')
  @HttpCode(200)
  async getOffersByEndDate(@Param('date') date: Date): Promise<any> {
    const offers = await this.offerService.getOffersByEndDate(date);
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }

  @Get('getByStartAndEndDate/:startDate/:endDate')
  @HttpCode(200)
  async getOffersByStartAndEndDate(
    @Param('startDate') startDate: Date,
    @Param('endDate') endDate: Date,
  ): Promise<any> {
    const offers = await this.offerService.getOffersByStartAndEndDate(
      startDate,
      endDate,
    );
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }

  @Get('getByDiscount/:discount')
  @HttpCode(200)
  async getOffersByDiscount(@Param('discount') discount: number): Promise<any> {
    const offers = await this.offerService.getOffersByDiscount(discount);
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }

  @Get('getByDiscountBetween/:min/:max')
  @HttpCode(200)
  async getOffersByDiscountBetween(
    @Param('min') min: number,
    @Param('max') max: number,
  ): Promise<any> {
    const offers = await this.offerService.getOffersByDiscountBetween(min, max);
    return {
      message: 'Offers retrieved successfully',
      offers: offers,
    };
  }
}
