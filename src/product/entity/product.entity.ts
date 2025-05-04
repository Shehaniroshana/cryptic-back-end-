import { User } from "src/user/entity/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne } from "typeorm";


enum RiskLevel{
    low="LOW",
    medium="MEDIUM",
    high="HIGH",
    veryHigh="VERY_HIGH"
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string;
    @Column()
    description:string;
    @Column()
    price:number;
    @Column()
    shippingCost:number;
    @Column()
    stock:number;
    @ManyToOne(()=>User,(user)=>user.products)
    seller:User;
    @Column()
    countryOfOrigin:string;
    @Column({
        type:'enum',
        enum:RiskLevel,
        default:RiskLevel.low
    })
    riskLevel:RiskLevel;
    @Column()
    superNaturalEffect:string;
    @Column()
    isActive:boolean;

}