import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, OneToOne, Column } from "typeorm";
import { Consigment } from "src/consigment/entities/consigment.entity";
import { ConsigmentStatuses } from "src/database/types";

@Entity()
export class ConsigmentStatus extends AbstractEntity<ConsigmentStatus>{
    @OneToOne(() => AbstractEntity<Consigment>, { eager: true })
    consigmentId: AbstractEntity<Consigment>

    @Column({ type: "enum", default: ConsigmentStatuses.RECEIVED_FOR_DEVLIVERY })
    status: ConsigmentStatuses

    @Column("string")
    message: string
}
