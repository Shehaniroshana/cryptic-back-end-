import { IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class UserDto{
    
    @IsOptional()
    id?:number;
    
    @IsNotEmpty({message:'name is required'})
    name:string;

    @IsNotEmpty({message:'email is required'})
    email:string;

    @IsNotEmpty({message:'password is required'})
    @MinLength(6,{message:'password must be at least 6 characters'})

    password:string;

}