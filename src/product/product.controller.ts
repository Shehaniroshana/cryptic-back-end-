import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/product.dot';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  async createProduct(@Body() product: ProductDTO): Promise<any> {
    const newProduct = await this.productService.createProduct(product);
    return { message: 'Product Created', product: newProduct };
  }

  @Get()
  async getAllProducts(): Promise<any> {
    const products = await this.productService.getAllProducts();
    return { message: 'Products Fetched', products };
  }

  @Get('getBy/:id')
  async getProductById(@Param('id') id: number): Promise<any> {
    const product = await this.productService.getProductById(id);
    return { message: 'Product Fetched', product };
  }

  @Post('update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  async updateProduct(@Body() product: ProductDTO): Promise<any> {
    const updatedProduct = await this.productService.updateProduct(product);
    return { message: 'Product Updated', product: updatedProduct };
  }

  @Post('delete/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SELLER', 'ADMIN')
  async deleteProduct(@Param('id') id: number): Promise<any> {
    const deletedProduct = await this.productService.deleteProduct(id);
    return { message: 'Product Deleted', product: deletedProduct };
  }

  @Get('search/:name')
  async searchByName(@Param('name') name: string): Promise<any> {
    const products = await this.productService.searchByName(name);
    return { message: 'Products Fetched', products };
  }

  @Get('trending')
  async getTrendingProducts(): Promise<any> {
    const products = await this.productService.getTrendingProducts();
    return { message: 'Products Fetched', products };
  }
}
