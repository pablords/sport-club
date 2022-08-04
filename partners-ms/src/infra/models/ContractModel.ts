import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { Contract } from "@/app/core/entity"
import { ModalityModel } from "./ModalityModel"
import { PartnerModel } from "./PartnerModel"

@Entity("contracts")
export class ContractModel implements Contract {
    @PrimaryGeneratedColumn()
    id?: number

    @Column("date")
    start: Date

    @Column("date")
    dueDate: Date

    @Column("boolean")
    isActive: boolean

    @Column("int")
    status: number

    @Column({ type: "bigint", nullable: true })
    modalityId: number

    @Column({ type: "bigint", nullable: true })
    partnerId: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => PartnerModel, (partner) => partner.contracts, {
      onDelete: "CASCADE"
    })
    partner: ModalityModel;

    @ManyToOne(() => ModalityModel, modality => modality.contracts)
    modality: ModalityModel;
}
