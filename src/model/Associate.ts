import {AbstractEntity} from "@/model/AbstractEntity";
import {Address} from "@/model/Address";
import {User} from "@/model/User";

export class Associate extends AbstractEntity {
    firstName!: string;
    lastName!: string;
    email!: string;
    contact!: string;
    username!: string;
    password!: string;
    address!: Address;
    user!: User;
}