import {AbstractEntity} from "@/model/AbstractEntity";
import {Address} from "@/model/Address";
import {Task} from "@/model/Task";
import {User} from "@/model/User";

export class Provider extends AbstractEntity {
    fantasyName!: string;
    businessName!: string;
    cnpj!: string;
    contact!: string;
    address!: Address;
    tasks!: Task;
    user!: User;

    constructor() {
        super()
        this.user = new User
        this.address = new Address
        this.tasks = new Task
    }
}