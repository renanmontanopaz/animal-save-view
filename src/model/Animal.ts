import {AbstractEntity} from "./AbstractEntity.ts";
import {Vaccination} from "./Vaccination.ts";
import {AnimalType} from "./enum/AnimalType.ts";
import {AnimalSize} from "./enum/AnimalSize.ts";
import {Caregiver} from "./Caregiver.ts";

export class Animal extends AbstractEntity {
    name!: string;
    breed!: string;
    vaccination!: Vaccination;
    animalType!: AnimalType;
    animalSize!: AnimalSize;
    color!: string;
    age!: number;
    observation!: string;
    caregiver!: Caregiver;
}