import {AbstractEntity} from "@/model/AbstractEntity";


export class Address extends AbstractEntity {
    cep!: string;
    neighborhood!: string;
    road!: string;
    houseNumber!: number;
}