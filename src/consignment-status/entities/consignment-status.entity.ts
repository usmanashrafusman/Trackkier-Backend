import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, JoinColumn, ManyToOne } from "typeorm";
import { Consignment } from "src/consignment/entities/consignment.entity";
import { ConsignmentStatuses } from "src/database/types";

@Entity()
export class ConsignmentStatus extends AbstractEntity<ConsignmentStatus> {
    @ManyToOne(() => Consignment)
    @JoinColumn()
    consignment: Consignment

    @Column({ type: "enum", enum: ConsignmentStatuses, default: ConsignmentStatuses.RECEIVED_FOR_DELIVERY })
    status: ConsignmentStatuses

    @Column("text", { nullable: true })
    message: string
}
