import {AbstractEntity} from "./AbstractEntity.ts";
import {Animal} from "./Animal.ts";

export class Vaccination extends AbstractEntity {
    rabies!: boolean;
    canineParvovirus!: boolean;
    distemper!: boolean;
    canineHepatitis!: boolean;
    animal!: Animal;
}