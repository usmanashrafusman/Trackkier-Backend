import { City } from "src/database/types";
import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column } from "typeorm";

@Entity()
export class Address extends AbstractEntity<Address>{
    @Column("text")
    name: string

    // name of place / company 
    @Column("text")
    place: string

    // complete address 
    @Column("text")
    address: string

    @Column("text")
    phone: string

    @Column({ type: "enum", enum: City, default: City.KARACHI })
    city: City

    @Column({ nullable: true })
    email: string

}
