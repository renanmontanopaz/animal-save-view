import {AbstractEntity} from "./AbstractEntity.ts";
import {Address} from "./Address.ts";
import {User} from "./User.ts";
import {Aprove} from "./enum/Aprove.ts";
import {Task} from "./Task.ts";

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