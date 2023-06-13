import {AbstractEntity} from "./AbstractEntity.ts";
import {Provider} from "./Provider.ts";

export class Task extends AbstractEntity {
    name!: string;
    cost!: number;
    monthlyAmount!: number;
    description!: string;
    provider!: Provider;
}