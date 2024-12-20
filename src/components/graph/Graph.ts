import G6 from '@antv/g6';
import { NodeType } from '../add-node/NodeType';
import './DeclarationNode';
import './InputNode';
import './OutputNode';
import { Edge } from './Edge';
import { Node } from './Node';

interface GraphData {
    nodes: Node[];
    edges: Edge[];
}

interface Graph {
    graph: any;
    container: HTMLElement | null;
    width: number;
    height: number;
    nodeCount: number;
    data: GraphData;
    init: (id: string) => void;
    getNodeType: (item: any) => NodeType;
    getId: (item: any) => string;
    getSourceOfEdge: (edge: any) => any;
    getEdges: (node: any) => any;
    getNodes: () => any;
    addNode: (nodeType: NodeType, parentId: string, branchNo: number | undefined, text?: string) => void;
    newNode: (nodeType: NodeType, newId: string, text?: string) => Node;
    newEdges: (nodeType: NodeType, newId: string, targetId: string) => Edge[];
    getNode: (id: string) => Node | null;
    editNode: (id: string, data: any) => void;
    onNodeClick: (fn: (evt: any) => void) => void;
    onEdgeClick: (fn: (evt: any) => void) => void;
}

const graphInstance: Graph = {
    graph: null,
    container: null,
    width: 0,
    height: 0,
    nodeCount: 0,
    data: {
        nodes: [
            {
                id: '0',
                label: 'Start',
                type: 'circle',
                nodeType: NodeType.Start,
                data: null
            },
            {
                id: '1',
                label: 'End',
                type: 'circle',
                nodeType: NodeType.End,
                data: null
            }
        ],
        edges: [
            {
                source: '0',
                target: '1',
            },
        ],
    },
    init(id: string) {
        this.nodeCount = this.data.nodes.length;
        this.container = document.getElementById(id);
        if (this.container) {
            this.width = this.container.scrollWidth;
            this.height = this.container.scrollHeight || 500;
            this.graph = new G6.Graph({
                container: id,
                width: this.width,
                height: this.height,
                fitView: true,
                modes: {
                    default: ['drag-canvas', 'drag-node', 'drag-edge'],
                },
                layout: {
                    type: 'dagre',
                    rankdir: 'TB',
                    nodesepFunc: () => 1,
                    ranksepFunc: () => 1,
                    controlPoints: true,
                },
                defaultNode: {
                    size: [30, 20],
                    style: {
                        lineWidth: 2,
                        stroke: '#5B8FF9',
                        fill: '#C6E5FF',
                    },
                },
                defaultEdge: {
                    size: 1,
                    color: '#e2e2e2',
                    type: 'polyline',
                    style: {
                        endArrow: {
                            path: 'M 0,0 L 6,3 L 6,-3 Z',
                            fill: '#e2e2e2',
                        },
                    },
                },
            });
            this.graph.data(this.data);
            this.graph.render();
            if (typeof window !== 'undefined') {
                window.onresize = () => {
                    if (!this.graph || this.graph.get('destroyed')) return;
                    if (!this.container || !this.container.scrollWidth || !this.container.scrollHeight) return;
                    this.graph.changeSize(this.container.scrollWidth, this.container.scrollHeight);
                };
            }
        }
    },
    getNodeType(item: any): NodeType {
        return item._cfg.model.nodeType;
    },
    getId(item: any): string {
        return item._cfg.id;
    },
    getSourceOfEdge(edge: any): any {
        return edge._cfg.source;
    },
    getEdges(node: any): any {
        return node._cfg.edges;
    },
    getNodes(): any {
        return this.graph?.cfg.nodes;
    },
    addNode(nodeType: NodeType, parentId: string, branchNo: number | undefined, text?: string): void {
        const node = this.data.nodes.find(x => x.id === parentId);
        const edge = this.data.edges.filter(x => x.source === parentId)[branchNo || 0];
        const newId = this.nodeCount.toString();
        const newNode = this.newNode(nodeType, newId, text);
        this.data.nodes.push(newNode);
        const edges = this.newEdges(nodeType, newId, edge.target);
        this.data.edges.push(...edges);
        if (edge) edge.target = newNode.id;
        this.graph.data(this.data);
        this.graph.render();
        this.nodeCount = this.data.nodes.length;
    },
    newNode(nodeType: NodeType, newId: string, text?: string): Node {
        const node: Node = {
            type: 'rect',
            id: newId,
            nodeType: nodeType,
            label: text || newId,
            anchorPoints: [
                [0.5, 0],
                [0.5, 0.5]
            ],
            data: null
        };
        switch (nodeType) {
            case NodeType.Condition:
                node.type = 'diamond';
                break;
            case NodeType.Declaration:
                node.type = 'declaration';
                break;
            case NodeType.Output:
                node.type = 'output';
                break;
            case NodeType.Input:
                node.type = 'input';
                break;
        }
        return node;
    },
    newEdges(nodeType: NodeType, newId: string, targetId: string): Edge[] {
        const edges: Edge[] = [{
            source: newId,
            target: targetId,
            type: "polyline"
        }];
        switch (nodeType) {
            case NodeType.Condition:
                edges[0].label = "True";
                edges[0].type = "polyline";
                edges.push({
                    source: newId,
                    target: targetId,
                    label: 'False',
                    style: { offset: 8 },
                });
                break;
        }
        return edges;
    },
    getNode(id: string): Node | null {
        return this.data.nodes.find(x => x.id === id) ?? null;
    },
    editNode(id: string, data: any): void {
        const node = this.data.nodes.find(x => x.id === id);
        if (node) {
            Object.assign(node, data);
        }
    },
    onNodeClick(fn: (evt: any) => void): void {
        this.graph?.on('node:click', fn);
    },
    onEdgeClick(fn: (evt: any) => void): void {
        this.graph?.on('edge:click', fn);
    }
};

export default graphInstance;