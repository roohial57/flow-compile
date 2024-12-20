export interface Edge {
    source: string;
    target: string;
    type?: string;
    label?: string;
    style?: { offset?: number; endArrow?: { path: string; fill: string; }; };
}
