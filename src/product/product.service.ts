import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { In, Like, Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dot';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entity/user.entity';
import { Order } from 'src/order/entity/order.entity';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Order) private orderRepo: Repository<Order>) { }

    async createProduct(product: ProductDTO): Promise<Product> {
        try {
            this.logger.log(`--> Creating product with name ${product.name}`);
            const user = await this.userRepo.findOne({ where: { id: product.seller } });
            if (!user) throw new BadRequestException('User not found');
            if (!user.isActive) throw new BadRequestException('User is not active');
            if (user.role !== 'SELLER') throw new BadRequestException('User is not a seller');
            if (await this.productRepo.findOne({ where: { seller: { id: product.seller }, name: product.name } })) throw new BadRequestException('Product name already exists');
            const newProduct = plainToInstance(Product, product);
            return await this.productRepo.save(newProduct);
        } catch (error) {
            this.logger.error(`<-- Error creating product: ${error}`);
            throw error;
        }
    }

    async getAllProducts(): Promise<ProductDTO[]> {
        try {
            this.logger.log('--> Getting all products');
            const products = await this.productRepo.find({ where: { isActive: true }, relations: { seller: true, ratings: true } });
            return plainToInstance(ProductDTO, products);
        } catch (error) {
            this.logger.error(`<-- Error getting all products: ${error}`);
            throw error;
        }
    }

    async getProductById(id: number): Promise<ProductDTO> {
        try {
            this.logger.log(`--> Getting product with id ${id}`);
            if (!id) throw new BadRequestException('Product id is required');
            const product = await this.productRepo.findOne({ where: { id }, relations: { seller: true, ratings: true } });
            if (!product) throw new BadRequestException('Product not found');
            return plainToInstance(ProductDTO, product);
        } catch (error) {
            this.logger.error(`<-- Error getting product with id ${id}: ${error}`);
            throw error;
        }
    }

    async updateProduct(product: ProductDTO): Promise<Product> {
        try {
            this.logger.log(`--> Updating product with id ${product.id}`);
            if (!product.id) throw new BadRequestException('Product id is required');
            if (!await this.productRepo.findOne({ where: { id: product.id } })) throw new BadRequestException('Product not found');
            if (await this.productRepo.findOne({ where: { seller: { id: product.seller }, name: product.name } })) throw new BadRequestException('Product name already exists');
            const productToUpdate = await this.productRepo.findOne({ where: { id: product.id } });
            if (!productToUpdate) throw new BadRequestException('Product not found');
            const updatedProduct = plainToInstance(Product, product);
            return await this.productRepo.save(updatedProduct);
        } catch (error) {
            this.logger.error(`<-- Error updating product with id ${product.id}: ${error}`);
            throw error;
        }
    }

    async deleteProduct(id: number): Promise<Product> {
        try {
            this.logger.log(`--> Deleting product with id ${id}`);
            if (!id) throw new BadRequestException('Product id is required');
            const productToDelete = await this.productRepo.findOne({ where: { id } });
            if (!productToDelete) throw new BadRequestException('Product not found');
            await this.productRepo.delete(id);
            return productToDelete;
        } catch (error) {
            this.logger.error(`<-- Error deleting product with id ${id}: ${error}`);
            throw error;
        }
    }

    async searchByName(name: string): Promise<Product[]> {
        try {
            this.logger.log(`--> Searching for products with name ${name}`);
            const products = await this.productRepo.find({
                where: { name: Like(`%${name}%`), isActive: true },
                relations: { seller: true, ratings: true }
            });

            if (products.length === 0) throw new BadRequestException('Products not found');

            const updatedProducts = products.map((product) => {
                const ratings = product.ratings || [];
                const averageRating = ratings.length > 0
                    ? ratings.reduce((sum, r) => sum + r.rate, 0) / ratings.length
                    : 0;
                return {
                    ...product,
                    averageRating: +averageRating.toFixed(1),
                };
            });

            return updatedProducts;
        } catch (error) {
            this.logger.error(`<-- Error searching for products with name ${name}: ${error}`);
            throw error;
        }
    }

    async getTrendingProducts(): Promise<Product[]> {
        this.logger.log('--> Getting trending products');
        try {
            const trendingProductIds: { productId: number }[] = await this.productRepo.query(`
                SELECT productId 
                FROM order_items 
                WHERE productId IS NOT NULL 
                GROUP BY productId 
                ORDER BY COUNT(*) DESC
                LIMIT 10
            `);

            const productIds = trendingProductIds.map(item => item.productId);

            if (productIds.length === 0) {
                return [];
            }

            const trendingProducts = await this.productRepo.find({
                where: {
                    id: In(productIds),
                    isActive: true,
                },
                relations: {
                    seller: true,
                    ratings: true,
                }
            });

            return trendingProducts;
        } catch (error) {
            this.logger.error(`<-- Error getting trending products: ${error}`);
            throw error;
        }
    }
}

