import {AbstractEntity} from "@/model/AbstractEntity";
import {Address} from "@/model/Address";
import {Occurrences} from "@/model/Occurrences";
import {Animal} from "@/model/Animal";
import {User} from "@/model/User";

export class Caregiver extends AbstractEntity {
    firstName!: string;
    lastName!: string;
    contact!: string;
    address!: Address;
    physicalSpace!: string;
    spending!: string;
    capacityAnimals!: number;
    occurrences!: Occurrences;
    animal!: Animal;
    user!: User;

    constructor() {
        super()
        this.user = new User
        this.address = new Address
        this.occurrences = new Occurrences
        this.animal = new Animal
    }
}