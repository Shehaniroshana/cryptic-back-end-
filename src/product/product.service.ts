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

}
