import {AbstractEntity} from "./AbstractEntity.ts";

export class Address extends AbstractEntity {
    cep!: string;
    neighborhood!: string;
    road!: string;
    houseNumber!: number;
}