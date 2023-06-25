import {Admin} from "@/model/Admin";
import {Caregiver} from "@/model/Caregiver";
import {Provider} from "@/model/Provider";
import {Associate} from "@/model/Associate";
import {Occurrences} from "@/model/Occurrences";
import {Role} from "@/model/Role";

export class User {
    id!: number;
    login!: string;
    password!: string;
    admin!: Admin;
    caregiver!: Caregiver;
    provider!: Provider;
    associate!: Associate;
    username!: string;
    occurrences!: Occurrences;
    approved!: boolean;
    pending!: boolean;
    rejected!: boolean;
    roles!: Role;
    accountNonExpired!: boolean;
    credentialsNonExpired!: boolean;
    accountNonLocked!: boolean;
    enabled!: boolean;
}