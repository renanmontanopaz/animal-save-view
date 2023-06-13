import {AbstractEntity} from "./AbstractEntity.ts";
import {User} from "./User.ts";
import {Situation} from "./enum/Situation.ts";

export class Occurrences extends AbstractEntity {
    name!: string;
    contact!: string;
    description!: string;
    situation!: Situation;
    user!: User;
}