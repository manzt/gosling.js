import * as PIXI from 'pixi.js';
import { GoslingTrackModel } from '../gosling-track-model';
import { BasicSingleTrack } from '../gosling.schema';
import { drawTriangle } from './triangle';

describe('Rendering triangle', () => {
    const g = new PIXI.Graphics();
    it('Linear Triangle', () => {
        const t: BasicSingleTrack = {
            data: { type: 'csv', url: '' },
            mark: 'triangle-l',
            x: { field: 'x', type: 'genomic' },
            xe: { field: 'xe', type: 'genomic' },
            y: { field: 'y', type: 'quantitative' },
            width: 100,
            height: 100
        };
        const d = [
            { x: 1, xe: 1, y: 2 },
            { x: 11, xe: 11, y: 22 },
            { x: 111, xe: 111, y: 222 }
        ];
        const model = new GoslingTrackModel(t, d);
        drawTriangle(g, model);
    });

    it('Circular Triangle', () => {
        const t: BasicSingleTrack = {
            layout: 'circular',
            data: { type: 'csv', url: '' },
            mark: 'triangle-l',
            x: { field: 'x', type: 'genomic' },
            xe: { field: 'xe', type: 'genomic' },
            y: { field: 'y', type: 'quantitative' },
            width: 100,
            height: 100
        };
        const d = [
            { x: 1, xe: 1, y: 2 },
            { x: 11, xe: 11, y: 22 },
            { x: 111, xe: 111, y: 222 }
        ];
        const model = new GoslingTrackModel(t, d);
        drawTriangle(g, model);
    });
});