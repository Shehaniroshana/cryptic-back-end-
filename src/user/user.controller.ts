import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post()
    async saveUser(@Body() user:UserDto ):Promise<any>{
      return await this.userService.saveUser(user);
    }

    @Get('logIn')
    async authUser(@Body() req:{email:string,password:string}):Promise<any>{
       return this.userService.authenticateUser(req.email,req.password);
    }

    @Get()
    async getAllUsers():Promise<User[]>{
        return await this.userService.getAllUsers();
    }
    @Get('activeUsers')
    async getAllActiveUsers():Promise<User[]>{
        return await this.userService.getAllActiveUsers();
    }
    @Get('inactiveUsers')
    async getAllInactiveUsers():Promise<User[]>{
        return await this.userService.getAllInactiveUsers();
    }
    @Get('user/:id')
    async getUserById(@Param('id') req:{id:string}):Promise<User>{
        return await this.userService.getUserById(+req.id);  
    }
    @Post('updateUser')
    async updateUser(@Body() user:UserDto):Promise<any>{
        return await this.userService.updateUser(user);  
    }
    @Post('deleteUser/:id')
    async deleteUser(@Param('id') id:string):Promise<any>{
        return await this.userService.deleteUser(+id);  
    }
}
