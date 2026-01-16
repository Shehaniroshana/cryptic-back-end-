import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class RatingDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty({ message: 'rate is required' })
  @IsIn([1, 2, 3, 4, 5], { message: 'rate must be between 1 and 5' })
  rate: number;
  @IsNotEmpty({ message: 'comment is required' })
  comment: string;
  @IsNotEmpty({ message: 'user id is required' })
  user: string;
  @IsNotEmpty({ message: 'product id is required' })
  product: string;
  isActive?: boolean;
}
