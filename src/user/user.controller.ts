import { Body, Controller, Get, HttpCode, Param, Post, Put, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @HttpCode(201)
    async createUser(@Body() userDto: UserDto) {
        const user = await this.userService.saveUser(userDto);
        return { message: 'User created successfully', data: user };
    }

    @Post('login')
    async login(@Body() credentials: { email: string; password: string }) {
        const user = await this.userService.authenticateUser(credentials.email, credentials.password);
        return user;
    }

    @Get()
    async findAll() {
        const users = await this.userService.getAllUsers();
        return { message: 'All users fetched successfully', data: users };
    }

    @Get('active')
    async findActive() {
        const users = await this.userService.getAllActiveUsers();
        return { message: 'Active users fetched successfully', data: users };
    }

    @Get('inactive')
    async findInactive() {
        const users = await this.userService.getAllInactiveUsers();
        return { message: 'Inactive users fetched successfully', data: users };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const user = await this.userService.getUserById(+id);
        return { message: 'User fetched successfully', data: user };
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() userDto: UserDto) {
        const user = await this.userService.updateUser({ ...userDto, id: +id });
        return { message: 'User updated successfully', data: user };
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        const result = await this.userService.deleteUser(+id);
        return { message: 'User deleted successfully', data: result };
    }

    @Patch(':id/name')
    async updateName(@Param('id') id: string, @Body() userDto: UserDto) {
        const user = await this.userService.updateUserName({ ...userDto, id: +id });
        return { message: 'User name updated successfully', data: user };
    }

    @Patch(':id/email')
    async updateEmail(@Param('id') id: string, @Body() userDto: UserDto) {
        const user = await this.userService.updateUserEmail({ ...userDto, id: +id });
        return { message: 'User email updated successfully', data: user };
    }

    @Patch(':id/password')
    async updatePassword(@Param('id') id: string, @Body() userDto: UserDto) {
        const user = await this.userService.updateUserPassword({ ...userDto, id: +id });
        return { message: 'User password updated successfully', data: user };
    }

    @Patch(':id/role')
    async updateRole(@Param('id') id: string, @Body() userDto: UserDto) {
        const user = await this.userService.updateUserRole({ ...userDto, id: +id });
        return { message: 'User role updated successfully', data: user };
    }
}
