import { Contact, Modality } from "@/app/core/entity"

export interface Partner {
    id?: number;
    name: string;
    surname: string;
    birthDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    contacts?: Contact[];
    modalities?: Modality[];
}
