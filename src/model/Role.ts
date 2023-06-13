import {User} from "./User.ts";

export class Role {
    id!: number;
    authority!: string;
    user!: User;
}