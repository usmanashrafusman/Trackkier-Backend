import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, OneToOne, Column, JoinColumn } from "typeorm";
import { ConsigmentDelivery, ConsigmentType } from "src/database/types";

import { Address } from "./address.entity";

@Entity()
export class Consigment extends AbstractEntity<Consigment>{
    // the sender 
    @OneToOne(() => Address, { eager: true, cascade: true, })
    @JoinColumn()
    consignor: Address

    // the receiver 
    @OneToOne(() => Address, { eager: true, cascade: true, })
    @JoinColumn()
    consignee: Address

    @Column("int")
    weight: number

    @Column({ type: "enum", enum: ConsigmentType, default: ConsigmentType.LOCAL  })
    type: ConsigmentType

    @Column({ type: "enum", enum: ConsigmentDelivery, default: ConsigmentDelivery.NEXT_DAY })
    deliveryType: ConsigmentDelivery
};