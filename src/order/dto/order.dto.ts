import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

interface OrderItem {
  product: string;
  quantity: number;
  price: number;
}

export class OrderDto {
  @IsOptional()
  id?: string;
  @IsNotEmpty({ message: 'user id is required' })
  user: string;
  @IsArray()
  @IsNotEmpty({ message: 'order items is required' })
  orderItems: OrderItem[];
  @IsOptional()
  isActive?: boolean;
}
