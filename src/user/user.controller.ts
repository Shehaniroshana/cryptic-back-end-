import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
