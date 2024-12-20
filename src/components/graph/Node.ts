
import { NodeType } from '../add-node/NodeType';
export interface Node {
    id: string;
    label: string;
    type: string;
    nodeType: NodeType;
    anchorPoints?: number[][];
    data: any
}

