import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

enum Role {
  customer = 'CUSTOMER',
  admin = 'ADMIN',
  seller = 'SELLER',
}
export class UserDto {
  @IsOptional()
  id?: number;

  @IsNotEmpty({ message: 'name is required' })
  @MinLength(3, { message: 'name must be at least 3 characters' })
  name: string;

  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'invalid email' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password: string;

  @IsOptional()
  role?: Role;

  @IsOptional()
  isActive?: boolean;
}
