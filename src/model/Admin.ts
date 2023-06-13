import {AbstractEntity} from "./AbstractEntity.ts";
import {User} from "./User.ts";

export class Admin extends AbstractEntity {
    name!: string;
    user!: User;
}