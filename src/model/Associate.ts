import {AbstractEntity} from "@/model/AbstractEntity";
import {Address} from "@/model/Address";
import {User} from "@/model/User";

export class Associate extends AbstractEntity {
    firstName!: string;
    lastName!: string;
    contact!: string;
    cpf!: string;
    address!: Address;
    approved!: boolean;
    pending!: boolean;
    rejected!: boolean;
    user!: User;

    constructor() {
        super()
        this.user = new User
        this.address = new Address
    }
}