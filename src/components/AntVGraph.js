import G6 from '@antv/g6';
export default (id,data) => {
    const container = document.getElementById(id);
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.Graph({
        container: id,
        width,
        height,
        fitView: true,
        modes: {
            default: ['drag-canvas', 'drag-node', 'drag-edge'],
        },
        layout: {
            type: 'dagre',
            rankdir: 'TB',
            align: 'DL',
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
                    path: 'M 0,0 L 8,4 L 8,-4 Z',
                    fill: '#e2e2e2',
                },
            },
        },
    });

    if (typeof window !== 'undefined')
        window.onresize = () => {
            if (!graph || graph.get('destroyed')) return;
            if (!container || !container.scrollWidth || !container.scrollHeight) return;
            graph.changeSize(container.scrollWidth, container.scrollHeight);
        };
    
        return graph;
}
