import { Offers } from "src/offers/entity/offers.entity";
import { orderItems } from "src/order/entity/order.item.detail.entity";
import { Rating } from "src/ratings/entity/ratings.entity";
import { User } from "src/user/entity/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";


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
    @Column({
        type:'float'
    })
    price:number;
    @Column({
        type:'float'
    })
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
    @OneToMany(()=>Rating,(rating)=>rating.product)
    ratings:Rating[];
    @OneToMany(()=>Offers,(offers)=> offers.product)
    offers:Offers[];
    @OneToMany(()=>orderItems,(orderItem)=>orderItem.product)
    orderItems:orderItems[]
    @Column({
        default:true
    })
    isActive:boolean;

}