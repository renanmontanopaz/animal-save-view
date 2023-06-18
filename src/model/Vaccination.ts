import {AbstractEntity} from "@/model/AbstractEntity";
import {Animal} from "@/model/Animal";

export class Vaccination extends AbstractEntity {
    rabies!: boolean;
    canineParvovirus!: boolean;
    distemper!: boolean;
    canineHepatitis!: boolean;
    animal!: Animal;
}