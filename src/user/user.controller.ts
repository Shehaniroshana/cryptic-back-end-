import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() userDto: UserDto) {
    const user = await this.userService.saveUser(userDto);
    return { message: 'User created successfully', data: user };
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    const result = await this.authService.login(
      credentials.email,
      credentials.password,
    );
    return { message: 'Login successful', ...result };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    const users = await this.userService.getAllUsers();
    return { message: 'All users fetched successfully', data: users };
  }

  @Get('active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findActive() {
    const users = await this.userService.getAllActiveUsers();
    return { message: 'Active users fetched successfully', data: users };
  }

  @Get('inactive')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findInactive() {
    const users = await this.userService.getAllInactiveUsers();
    return { message: 'Inactive users fetched successfully', data: users };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.getUserById(+id);
    return { message: 'User fetched successfully', data: user };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Body() userDto: UserDto) {
    const user = await this.userService.updateUser(userDto);
    return { message: 'User updated successfully', data: user };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id') id: string) {
    const result = await this.userService.deleteUser(+id);
    return { message: 'User deleted successfully', data: result };
  }

  @Patch(':id/name')
  @UseGuards(JwtAuthGuard)
  async updateName(@Body() userDto: UserDto) {
    const user = await this.userService.updateUserName(userDto);
    return { message: 'User name updated successfully', data: user };
  }

  @Patch(':id/email')
  @UseGuards(JwtAuthGuard)
  async updateEmail(@Body() userDto: UserDto) {
    const user = await this.userService.updateUserEmail(userDto);
    return { message: 'User email updated successfully', data: user };
  }

  @Patch(':id/password')
  @UseGuards(JwtAuthGuard)
  async updatePassword(@Body() userDto: UserDto) {
    const user = await this.userService.updateUserPassword(userDto);
    return { message: 'User password updated successfully', data: user };
  }

  @Patch(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateRole(@Body() userDto: UserDto) {
    const user = await this.userService.updateUserRole(userDto);
    return { message: 'User role updated successfully', data: user };
  }

  @Get('search/name/:name')
  @UseGuards(JwtAuthGuard)
  async searchByName(@Param('name') name: string) {
    const users = await this.userService.searchByUserName(name);
    return { message: 'Users fetched successfully', data: users };
  }

  @Get('search/email/:email')
  async searchByEmail(@Param('email') email: string) {
    const users = await this.userService.searchByUserEmail(email);
    return { message: 'Users fetched successfully', data: users };
  }
}
