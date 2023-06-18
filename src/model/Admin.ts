import {AbstractEntity} from "@/model/AbstractEntity";
import {User} from "@/model/User";


export class Admin extends AbstractEntity {
    name!: string;
    user!: User;
}