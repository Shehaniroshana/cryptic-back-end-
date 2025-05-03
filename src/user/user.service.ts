import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
    constructor(
     @InjectRepository(User)
     private userRepo:Repository<User>
    ){}
  
    async saveUser(user:UserDto):Promise<User>{
       try{
        if(await this.userRepo.findOne({where:{email:user.email}})) throw new BadRequestException("Email already exists");
        user.password = await bcrypt.hash(user.password, 10);
        const userEntity=plainToInstance(User,user);
        return await this.userRepo.save(userEntity);
       }catch(error){
        console.log(error);
        throw new BadRequestException(error);
       }
    }

    async authenticateUser(email:string,password:string):Promise<any>{
        try{
        if(!email || !password) throw new BadRequestException('Email and Password are required');
        if(!email.includes('@')) throw new BadRequestException('Invalid Email Format');    
        const user =await this.userRepo.findOne({where:{email}});
        if(!user) throw new BadRequestException('User not found');
        if(!user.isActive) throw new BadRequestException('User is not active');
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch) throw new BadRequestException('Invalid Password');
        user.password="";
        return {user,message:'Login Success'};
        }catch(error){
            console.log(error);
            throw new BadRequestException(error);
        }
    }

    async getAllUsers():Promise<User[]>{
        try{
        return await this.userRepo.find();
        }catch(error){
            console.log(error);
            throw new BadRequestException(error);
        }
    }
    async getAllActiveUsers():Promise<User[]>{
        try{
        return await this.userRepo.find({where:{isActive:true}});
        }catch(error){
            console.log(error);
            throw new BadRequestException(error);
        }
    }
    async getAllInactiveUsers():Promise<User[]>{
        try{
        return await this.userRepo.find({where:{isActive:false}});
        }catch(error){
            console.log(error);
            throw new BadRequestException(error);
        }
    }

    async getUserById(id:number):Promise<User>{
        try{
        const user= await this.userRepo.findOne({where:{id}});
        if(!user) throw new BadRequestException('User not found');
        user.password="";
        return user;
        }catch(error){
            console.log(error);
            throw new BadRequestException(error);
        }
    }

    async updateUser(user:UserDto):Promise<User>{
        try{
        if(!user.id) throw new BadRequestException('User ID is required');
        const userEntity=await this.userRepo.findOne({where:{id:user.id}});
        if(!userEntity) throw new BadRequestException('User not found');
        if(user.password) user.password = await bcrypt.hash(user.password, 10);
        const updatedUser = Object.assign(userEntity, user) as User;
        return await this.userRepo.save(updatedUser);
        }catch(error){
            console.log(error);
            throw new BadRequestException(error);
        }
    }
    async deleteUser(id:number):Promise<any>{
        try{
        const user= await this.userRepo.findOne({where:{id}});
        if(!user) throw new BadRequestException('User not found');
        if(!user.isActive) throw new BadRequestException('User is already inactive');
        user.password="";
        user.isActive=false;
        return await this.userRepo.save(user);
        }catch(error){
            console.log(error);
            throw new BadRequestException(error);
        }
    }
}
