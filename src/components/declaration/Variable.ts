
import { VariableType } from './VariableType';

class Variable {
  type: VariableType; // Use the enum here
  name: string;

  constructor(type: VariableType, name: string) {
    this.type = type;
    this.name = name;
  }

  getType(): string {
    return this.type;
  }
}