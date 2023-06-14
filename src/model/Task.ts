import {AbstractEntity} from "@/model/AbstractEntity";
import {Provider} from "@/model/Provider";

export class Task extends AbstractEntity {
    name!: string;
    cost!: number;
    monthlyAmount!: number;
    description!: string;
    provider!: Provider;
}