import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, OneToOne, Column, JoinColumn, ManyToOne } from "typeorm";
import { Consigment } from "src/consigment/entities/consigment.entity";
import { ConsigmentStatuses } from "src/database/types";

@Entity()
export class ConsigmentStatus extends AbstractEntity<ConsigmentStatus>{
    @ManyToOne(() => Consigment, { eager: true })
    @JoinColumn()
    consigment: Consigment

    @Column({ type: "enum", enum: ConsigmentStatuses, default: ConsigmentStatuses.RECEIVED_FOR_DEVLIVERY })
    status: ConsigmentStatuses

    @Column("text", { nullable: true })
    message: string
}
