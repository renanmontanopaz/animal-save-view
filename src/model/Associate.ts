import {AbstractEntity} from "./AbstractEntity.ts";
import {Address} from "./Address.ts";
import {User} from "./User.ts";
import {Occurrences} from "./Occurrences.ts";
import {Aprove} from "./enum/Aprove.ts";

export class Associate extends AbstractEntity {
    firstName!: string;
    lastName!: string;
    email!: string;
    contact!: string;
    username!: string;
    password!: string;
    address!: Address;
    aprove!: Aprove;
    occurrences!: Occurrences;
    user!: User;
}