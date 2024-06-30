import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, OneToOne, Column, JoinColumn } from "typeorm";
import { ConsignmentDelivery, ConsignmentType } from "src/database/types";

import { Address } from "./address.entity";

@Entity()
export class Consignment extends AbstractEntity<Consignment> {
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

    @Column({ type: "enum", enum: ConsignmentType, default: ConsignmentType.LOCAL })
    type: ConsignmentType

    @Column({ type: "enum", enum: ConsignmentDelivery, default: ConsignmentDelivery.NEXT_DAY })
    deliveryType: ConsignmentDelivery
};