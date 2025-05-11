import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

interface OrderItem {
    product: number;
    quantity: number;
    price: number;
}

export class OrderDto{
  
  @IsOptional()
  id?: number;
  @IsNotEmpty({message:'user id is required'})
  user: number;
  @IsArray()
  @IsNotEmpty({message:'order items is required'})
  orderItems: OrderItem[];
  @IsOptional()
  isActive?: boolean;
}