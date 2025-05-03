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
    


}
