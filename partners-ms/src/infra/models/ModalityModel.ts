import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Modality } from "@/app/core/entity"
import { ContractModel } from "./ContractModel"

@Entity("modalities")
export class ModalityModel implements Modality {
    @PrimaryGeneratedColumn()
    id?: number

    @Column("text")
    name: string

    @Column("text")
    description: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => ContractModel, contract => contract.modality)
    contracts: ContractModel[];
}
