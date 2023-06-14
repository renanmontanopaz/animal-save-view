import {AbstractEntity} from "@/model/AbstractEntity";
import {Address} from "@/model/Address";
import {Task} from "@/model/Task";
import {Aprove} from "@/model/enum/Aprove";
import {User} from "@/model/User";

export class Provider extends AbstractEntity {
    firstName!: string;
    lastName!: string;
    cnpj!: string;
    contact!: string;
    address!: Address;
    tasks!: Task;
    aprove!: Aprove;
    user!: User;
}