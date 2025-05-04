import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/product.dot';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepo:Repository<Product>,@InjectRepository(User) private userRepo:Repository<User>){}

    async createProduct(product:ProductDTO):Promise<Product>{
        try{
        const user= await this.userRepo.findOne({where:{id:product.seller}});
        if(!user) throw new BadRequestException('User not found');
        if(!user.isActive) throw new BadRequestException('User is not active');
        if(user.role !== 'SELLER') throw new BadRequestException('User is not a seller');
        if(await this.productRepo.findOne({where:{seller: { id: product.seller }, name: product.name }})) throw new BadRequestException('Product name already exists');
        const newProduct=plainToInstance(Product, product);
        return await this.productRepo.save(newProduct);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getAllProducts():Promise<ProductDTO[]>{
        try{
            const products= await this.productRepo.find({where:{isActive:true},relations:{seller:true}});
            return plainToInstance(ProductDTO, products);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getProductById(id:number):Promise<ProductDTO>{
        try{
            if(!id) throw new BadRequestException('Product id is required');
            const product= await this.productRepo.findOne({where:{id},relations:{seller:true}});
            if(!product) throw new BadRequestException('Product not found');
            return plainToInstance(ProductDTO, product);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateProduct(product:ProductDTO):Promise<Product>{
        try{
            if(!product.id) throw new BadRequestException('Product id is required');
            if(!await this.productRepo.findOne({where:{id:product.id}})) throw new BadRequestException('Product not found');
            if(await this.productRepo.findOne({where:{seller: { id: product.seller }, name: product.name }})) throw new BadRequestException('Product name already exists');
            const productToUpdate= await this.productRepo.findOne({where:{id:product.id}});
            if(!productToUpdate) throw new BadRequestException('Product not found');
            const updatedProduct=plainToInstance(Product, product);
            return await this.productRepo.save(updatedProduct);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteProduct(id:number):Promise<Product>{
        try{
            if(!id) throw new BadRequestException('Product id is required');
            const productToDelete= await this.productRepo.findOne({where:{id}});
            if(!productToDelete) throw new BadRequestException('Product not found');
            productToDelete.isActive=false;
            return await this.productRepo.save(productToDelete);
        }catch(error){
            console.log(error);
            throw error;
        }
    }

}
