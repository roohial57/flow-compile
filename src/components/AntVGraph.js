import G6 from '@antv/g6';
import { NodeType } from '@/enum.js';

G6.registerNode('print', {
    draw: function drawShape(cfg, group) {
        const r = 2;
        const color = '#5B8FF9';
        const w = cfg.size[0];
        const h = cfg.size[1];
        const shape = group.addShape('rect', {
            attrs: {
                x: -w / 2,
                y: -h / 2,
                width: w, //200,
                height: h, // 60
                stroke: color,
                radius: r,
                fill: '#fff',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'main-box',
            draggable: true,
        });
        group.addShape('rect', {
            attrs: {
                x: -w / 2,
                y: -h / 2,
                width: w, //200,
                height: h/2, // 60
                fill: color,
                radius: [r, r, 0, 0],
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'title-box',
            draggable: true,
        });
        group.addShape('text', {
            attrs: {
                textBaseline: 'top',
                x: -w / 2 + 8,
                y: -h / 2 + 2,
                lineHeight: 10,
                fontSize:8,
                text: 'پرینت',
                fill: '#fff',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'title',
        });
        group.addShape('text', {
            attrs: {
                textBaseline: 'top',
                x: -w / 2 + 8,
                y: -h / 2 + 24,
                lineHeight: 20,
                fontSize:8,
                text: 'پرینت',
                fill: 'rgba(0,0,0, 1)',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: `description`,
        });
        return shape;
    }
});

export default {
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
                nodeType: NodeType.Start
            },
            {
                id: '1',
                label: 'End',
                type: 'circle',
                nodeType: NodeType.End
            }
        ],
        edges: [
            {
                source: '0',
                target: '1',
            },
        ],
    },
    init(id) {
        this.nodeCount = this.data.nodes.length;
        this.container = document.getElementById(id);
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
        if (typeof window !== 'undefined')
            window.onresize = () => {
                if (!this.graph || this.graph.get('destroyed')) return;
                if (!this.container || !this.container.scrollWidth || !this.container.scrollHeight) return;
                graph.changeSize(this.container.scrollWidth, this.container.scrollHeight);
            };
    },
    getNodeType(item) {
        return item._cfg.model.nodeType;
    },
    getId(item) {
        return item._cfg.id;
    },
    getSourceOfEdge(edge) {
        return edge._cfg.source;
    },
    getEdges(node) {
        return node._cfg.edges;
    },
    getNodes() {
        return this.graph.cfg.nodes;
    },
    addNode(nodeType, parentId, branchNo, text) {
        let node = this.data.nodes.find(x => x.id == parentId);
        let edge = this.data.edges.filter(x => x.source == parentId)[branchNo || 0];
        let newId = this.nodeCount + '';
        let newNode = this.newNode(nodeType, newId, text);
        this.data.nodes.push(newNode);
        let edges = this.newEdges(nodeType, newId, edge.target);
        this.data.edges.push(...edges);
        edge.target = newNode.id;
        this.graph.data(this.data);
        this.graph.render();
        this.nodeCount = this.data.nodes.length;
    },
    newNode(nodeType, newId, text) {
        let node = {
            type: 'rect',
            id: newId,
            nodeType: nodeType,
            label: text || newId,
            anchorPoints: [
                [0.5, 0],
                [0.5, 0.5]
            ]
        }
        switch (nodeType) {
            case NodeType.Condition:
                node.type = 'diamond';
                break;
        }
        return node;
    },
    newEdges(nodeType, newId, targetId) {
        let edges =
            [{
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
    }
}


