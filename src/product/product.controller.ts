import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dot';

@Controller('product')
export class ProductController {
    constructor(private productService:ProductService){}

    @Post()
    async createProduct(@Body() product:ProductDTO):Promise<any>{
        const newProduct=await this.productService.createProduct(product);
        return {message:"Product Created",product:newProduct};
    }

    @Get()
    async getAllProducts():Promise<any>{
        const products=await this.productService.getAllProducts();
        return {message:"Products Fetched",products};
    }

    


}
