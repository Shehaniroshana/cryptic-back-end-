import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

    @Post('logIn')
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
    @Put('updateUser')
    async updateUser(@Body() user:UserDto):Promise<any>{
        return await this.userService.updateUser(user);  
    }
    @Post('deleteUser/:id')
    async deleteUser(@Param('id') id:string):Promise<any>{
        return await this.userService.deleteUser(+id);  
    }

    @Put('updateUserName')
    async updateUserName(@Body() user:UserDto):Promise<any>{
        return await this.userService.updateUserName(user);  
    }
    @Put('updateUserEmail')
    async updateUserEmail(@Body() user:UserDto):Promise<any>{
        return await this.userService.updateUserEmail(user);  
    }
    @Put('updateUserPassword')
    async updateUserPassword(@Body() user:UserDto):Promise<any>{
        return await this.userService.updateUserPassword(user);  
    }
    @Put('updateUserRole')
    async updateUserRole(@Body() user:UserDto):Promise<any>{
        return await this.userService.updateUserRole(user);  
    }
}
