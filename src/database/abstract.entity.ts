import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { Visibility } from './types';

export class AbstractEntity<T> {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "boolean", default: false })
    isDeleted: boolean;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: "enum", enum: Visibility, default: Visibility.PUBLIC })
    visibility: Visibility

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    constructor(entity: Partial<T>) {
        Object.assign(this, entity);
    }
}