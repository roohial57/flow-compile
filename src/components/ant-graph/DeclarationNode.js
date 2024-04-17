import G6 from '@antv/g6';

G6.registerNode('declaration', {
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
                height: h / 2, // 60
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
                fontSize: 8,
                text: 'تعریف متغییر',
                fill: '#fff',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: 'title',
        });
        group.addShape('text', {
            attrs: {
                textBaseline: 'top',
                x: -w / 2 + 8,
                y: -h / 2 + 10,
                lineHeight: 20,
                fontSize: 8,
                text: '...',
                fill: 'rgba(0,0,0, 1)',
            },
            // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
            name: `description`,
        });
        return shape;
    }
});




