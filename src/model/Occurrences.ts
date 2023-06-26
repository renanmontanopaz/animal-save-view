import {AbstractEntity} from "@/model/AbstractEntity";
import {Situation} from "@/model/enum/Situation";
import {User} from "@/model/User";
import {Caregiver} from "@/model/Caregiver";

export class Occurrences extends AbstractEntity {
    name!: string;
    contact!: string;
    description!: string;
    referenceLocal!: string;
    situation!: string;
    user!: User;
}

interface caregiver{
    id: number
}