import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Like, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async saveUser(user: UserDto): Promise<User> {
    try {
      if (await this.userRepo.findOne({ where: { email: user.email } })) {
        this.logger.log('<-- Email already exists');
        throw new BadRequestException('Email already exists');
      }
      user.password = await bcrypt.hash(user.password, 10);
      const userEntity = plainToInstance(User, user);
      const savedUser = await this.userRepo.save(userEntity);
      savedUser.password = '';
      return savedUser;
    } catch (error) {
      this.logger.log('<-- Error saving user', error);
      throw error;
    }
  }

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<{ user: User; message: string }> {
    try {
      if (!email || !password)
        throw new BadRequestException('Email and Password are required');
      if (!email.includes('@'))
        throw new BadRequestException('Invalid Email Format');
      const user = await this.userRepo.findOne({ where: { email } });
      if (!user) throw new BadRequestException('User not found');
      if (!user.isActive) throw new BadRequestException('User is not active');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new BadRequestException('Invalid Password');
      user.password = '';
      return { user, message: 'Login Success' };
    } catch (error) {
      this.logger.log('<-- Error authenticating user', error);
      throw error;
    }
  }

  getAllUsers(): Promise<User[]> {
    try {
      return this.userRepo.find();
    } catch (error) {
      this.logger.log('<-- Error getting all users', error);
      throw error;
    }
  }

  getAllActiveUsers(): Promise<User[]> {
    try {
      return this.userRepo.find({ where: { isActive: true } });
    } catch (error) {
      this.logger.log('<-- Error getting all active users', error);
      throw error;
    }
  }

  getAllInactiveUsers(): Promise<User[]> {
    try {
      return this.userRepo.find({ where: { isActive: false } });
    } catch (error) {
      this.logger.log('<-- Error getting all inactive users', error);
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      if (!id) throw new BadRequestException('User ID is required');
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new BadRequestException('User not found');
      user.password = '';
      return user;
    } catch (error) {
      this.logger.log('<-- Error getting user by id', error);
      throw error;
    }
  }

  async updateUser(user: UserDto): Promise<User> {
    try {
      if (!user.id) throw new BadRequestException('User ID is required');
      const userEntity = await this.userRepo.findOne({
        where: { id: user.id },
      });
      if (!userEntity) throw new BadRequestException('User not found');
      if (user.password) user.password = await bcrypt.hash(user.password, 10);
      const updatedUser = Object.assign(userEntity, user) as User;
      const savedUser = await this.userRepo.save(updatedUser);
      savedUser.password = '';
      return savedUser;
    } catch (error) {
      this.logger.log('<-- Error updating user', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) throw new BadRequestException('User not found');
      if (!user.isActive)
        throw new BadRequestException('User is already inactive');
      user.isActive = false;
      const savedUser = await this.userRepo.save(user);
      savedUser.password = '';
      return savedUser;
    } catch (error) {
      this.logger.log('<-- Error deleting user', error);
      throw error;
    }
  }

  async updateUserName(user: UserDto): Promise<User> {
    try {
      if (!user.id) throw new BadRequestException('User ID is required');
      const currentUser = await this.userRepo.findOne({
        where: { id: user.id },
      });
      if (!currentUser) throw new BadRequestException('User not found');
      const isMatch = await bcrypt.compare(user.password, currentUser.password);
      if (!isMatch) throw new BadRequestException('Invalid Password');
      if (user.name) currentUser.name = user.name;
      const savedUser = await this.userRepo.save(currentUser);
      savedUser.password = '';
      return savedUser;
    } catch (error) {
      this.logger.log('<-- Error updating user name', error);
      throw error;
    }
  }

  async updateUserEmail(user: UserDto): Promise<User> {
    try {
      if (!user.id) throw new BadRequestException('User ID is required');
      const currentUser = await this.userRepo.findOne({
        where: { id: user.id },
      });
      if (await this.userRepo.findOne({ where: { email: user.email } }))
        throw new BadRequestException('Email already exists');
      if (!currentUser) throw new BadRequestException('User not found');
      const isMatch = await bcrypt.compare(user.password, currentUser.password);
      if (!isMatch) throw new BadRequestException('Invalid Password');
      if (user.email) currentUser.email = user.email;
      const savedUser = await this.userRepo.save(currentUser);
      savedUser.password = '';
      return savedUser;
    } catch (error) {
      this.logger.log('<-- Error updating user email', error);
      throw error;
    }
  }

  async updateUserPassword(user: UserDto): Promise<User> {
    try {
      if (!user.id) throw new BadRequestException('User ID is required');
      const currentUser = await this.userRepo.findOne({
        where: { id: user.id },
      });
      if (!currentUser) throw new BadRequestException('User not found');
      const isMatch = await bcrypt.compare(user.password, currentUser.password);
      if (!isMatch) throw new BadRequestException('Invalid Password');
      if (user.password)
        currentUser.password = await bcrypt.hash(user.password, 10);
      const savedUser = await this.userRepo.save(currentUser);
      savedUser.password = '';
      return savedUser;
    } catch (error) {
      this.logger.log('<-- Error updating user password', error);
      throw error;
    }
  }

  async updateUserRole(user: UserDto): Promise<User> {
    try {
      if (!user.id) throw new BadRequestException('User ID is required');
      const currentUser = await this.userRepo.findOne({
        where: { id: user.id },
      });
      if (!currentUser) throw new BadRequestException('User not found');
      const isMatch = await bcrypt.compare(user.password, currentUser.password);
      if (!isMatch) throw new BadRequestException('Invalid Password');
      if (user.role) currentUser.role = user.role;
      const savedUser = await this.userRepo.save(currentUser);
      savedUser.password = '';
      return savedUser;
    } catch (error) {
      this.logger.log('<-- Error updating user role', error);
      throw error;
    }
  }

  async searchByUserName(name: string): Promise<User[]> {
    if (!name) throw new BadRequestException('Name is required');
    const users = await this.userRepo.find({
      where: { name: Like(`%${name}%`) },
    });
    if (users.length === 0) throw new BadRequestException('No users found');
    return users;
  }
  async searchByUserEmail(email: string): Promise<User[]> {
    if (!email) throw new BadRequestException('Email is required');
    const users = await this.userRepo.find({
      where: { email: Like(`%${email}%`) },
    });
    if (users.length === 0) throw new BadRequestException('No users found');
    return users;
  }
}
