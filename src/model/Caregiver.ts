import {AbstractEntity} from "./AbstractEntity.ts";
import {Address} from "./Address.ts";
import {Animal} from "./Animal.ts";
import {User} from "./User.ts";
import {Occurrences} from "./Occurrences.ts";
import {Aprove} from "./enum/Aprove.ts";

export class Caregiver extends AbstractEntity {
    firstName!: string;
    lastName!: string;
    contact!: string;
    address!: Address;
    physicalSpace!: string;
    spending!: number;
    capacityAnimals!: number;
    aprove!: Aprove;
    occurrences!: Occurrences;
    animal!: Animal;
    user!: User;
}