import {
    IsNotEmpty,
    IsOptional,
    IsInt,
    IsString,
    IsNumber,
    IsEnum,
    IsBoolean,
  } from "class-validator";
  
  enum RiskLevel {
    low = "LOW",
    medium = "MEDIUM",
    high = "HIGH",
    veryHigh = "VERY_HIGH"
  }
  
  export class ProductDTO {
    @IsOptional()
    id?: number;
  
    @IsNotEmpty({ message: "Name is required" })
    @IsString()
    name: string;
  
    @IsNotEmpty({ message: "Description is required" })
    @IsString()
    description: string;
  
    @IsNotEmpty({ message: "Price is required" })
    @IsNumber()
    price: number;
  
    @IsNotEmpty({ message: "Shipping cost is required" })
    @IsNumber()
    shippingCost: number;
  
    @IsNotEmpty({ message: "Stock is required" })
    @IsInt({ message: "Stock must be an integer" })
    stock: number;
  
    @IsNotEmpty({ message: "Seller ID is required" })
    @IsInt({ message: "Seller ID must be an integer" })
    sellerId: number;
  
    @IsNotEmpty({ message: "Country of origin is required" })
    @IsString()
    countryOfOrigin: string;
  
    @IsNotEmpty({ message: "Risk level is required" })
    @IsEnum(RiskLevel, { message: "Invalid risk level" })
    riskLevel: RiskLevel;

    @IsNotEmpty({ message: "Supernatural effect is required" })
    @IsString()
    superNaturalEffect: string;

    @IsOptional()
    @IsBoolean()
    isActive: boolean;
  }
  