
import { VariableType } from './VariableType';

export class Variable {
    Type: VariableType; // Use the enum here
    Name: string;
    Id: number;
    constructor(id: number, type: VariableType, name: string) {
        this.Type = type || VariableType.Number;
        this.Name = name;
        this.Id = id;
    }

}