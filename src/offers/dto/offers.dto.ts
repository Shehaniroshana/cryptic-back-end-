import { IsNotEmpty, IsOptional } from "class-validator";

export class offerDto{
    @IsOptional()
    id?: number;
    @IsNotEmpty({message:'title is required'})
    title: string;
    @IsNotEmpty({message:'discount is required'})
    discount: number;
    @IsNotEmpty({message:'start date is required'})
    startDate: Date;
    @IsNotEmpty({message:'end date is required'})
    endDate: Date;
    @IsNotEmpty({message:'product is required'})
    product:number;
    @IsOptional()
    isActive?: boolean;
}