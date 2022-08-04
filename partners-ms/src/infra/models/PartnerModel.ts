import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Partner } from "@/app/core/entity"
import { ModalityModel } from "./ModalityModel"
import { ContactModel } from "./ContactModel"
import { ContractModel } from "./ContractModel"

@Entity("partners")
export class PartnerModel implements Partner {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    name: string

    @Column("text")
    surname: string

    @Column("text")
    birthDate: Date

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @OneToMany(() => ContractModel, (contract) => contract.partner, {
      cascade: true,
      onUpdate: "CASCADE"
    })
    contracts: ContractModel[];

    @OneToMany(() => ContactModel, contacts => contacts.partner, {
      cascade: true,
      onUpdate: "CASCADE"
    })
    contacts: ContactModel[];

    @ManyToMany(() => ModalityModel)
    @JoinTable()
    modalities: ModalityModel[];
}
