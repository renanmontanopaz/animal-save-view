import {Admin} from "./Admin.ts";
import {Caregiver} from "./Caregiver.ts";
import {Provider} from "./Provider.ts";
import {Associate} from "./Associate.ts";
import {Occurrences} from "./Occurrences.ts";

export class User {
    id!: number;
    login!: string;
    password!: string;
    admin!: Admin;
    caregiver!: Caregiver;
    provider!: Provider;
    associate!: Associate;
    occurrences!: Occurrences;
}