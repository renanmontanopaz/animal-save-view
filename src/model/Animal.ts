import {AbstractEntity} from "@/model/AbstractEntity";
import {Caregiver} from "@/model/Caregiver";
import {AnimalType} from "@/model/enum/AnimalType";
import {AnimalSize} from "@/model/enum/AnimalSize";

class Vaccination {
}

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