import {Admin} from "@/model/Admin";
import {Caregiver} from "@/model/Caregiver";
import {Provider} from "@/model/Provider";
import {Associate} from "@/model/Associate";
import {Occurrences} from "@/model/Occurrences";

export class User {
    id!: number;
    login!: string;
    password!: string;
    confirmPassword!: string;
    admin!: Admin;
    caregiver!: Caregiver;
    provider!: Provider;
    associate!: Associate;
    occurrences!: Occurrences;
    approved!: boolean;
    pending!: boolean;
    rejected!: boolean;
}