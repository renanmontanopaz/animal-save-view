import {AbstractEntity} from "@/model/AbstractEntity";
import {Situation} from "@/model/enum/Situation";
import {User} from "@/model/User";

export class Occurrences extends AbstractEntity {
    name!: string;
    contact!: string;
    description!: string;
    situation!: Situation;
    user!: User;
}