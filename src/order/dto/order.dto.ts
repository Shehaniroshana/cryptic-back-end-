import { IsArray, IsNotEmpty, IsOptional } from "class-validator";

interface OrderItem {
    productId: number;
    quantity: number;
    price: number;
}

export class OrderDto{
  
  @IsOptional()
  id?: number;
  @IsNotEmpty({message:'user id is required'})
  userId: number;
  @IsArray()
  @IsNotEmpty({message:'order items is required'})
  orderItems: OrderItem[];
  @IsOptional()
  isActive?: boolean;
}