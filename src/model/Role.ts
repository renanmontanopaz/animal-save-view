import {User} from "@/model/User";

export class Role {
    id!: number;
    authority!: string;
    user!: User;
}