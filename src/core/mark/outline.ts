import { GeminidTrackModel } from '../geminid-track-model';
import { IsChannelDeep } from '../geminid.schema.guards';

export const TITLE_STYLE = {
    fontSize: '12px',
    fontFamily: 'Arial',
    fontWeight: 'normal',
    fill: 'black',
    background: 'white',
    lineJoin: 'round'
};

export function drawChartOutlines(HGC: any, trackInfo: any, tm: GeminidTrackModel) {
    /* helper */
    const { colorToHex } = HGC.utils;

    const g = trackInfo.pBorder; // use pBorder not to affected by zoomming

    // size and position
    const [l, t] = trackInfo.position;
    const [w, h] = trackInfo.dimensions;

    if (tm.spec().title) {
        const paddingX = 3;
        const paddingY = 3;

        const text = tm.spec().title;
        const textGraphic = new HGC.libraries.PIXI.Text(text, { ...TITLE_STYLE });
        textGraphic.anchor.x = 0;
        textGraphic.anchor.y = 0;
        textGraphic.position.x = l + paddingX;
        textGraphic.position.y = t + paddingY;
        g.addChild(textGraphic);

        const textStyleObj = new HGC.libraries.PIXI.TextStyle(TITLE_STYLE);
        const textMetrics = HGC.libraries.PIXI.TextMetrics.measureText(text, textStyleObj);
        const textWidth = textMetrics.width;
        const textHeight = textMetrics.height;
        g.beginFill(colorToHex('white'), 0.7);
        g.lineStyle(
            0,
            colorToHex('#DBDBDB'),
            0.7, // alpha
            0 // alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outter)
        );
        g.drawRect(l, t, textWidth + paddingX * 2, textHeight + paddingY * 2);
    }

    // Rectangular outline
    g.lineStyle(
        tm.spec().style?.outlineWidth ?? 1,
        // TODO: outline not working
        colorToHex(tm.spec().style?.outline ?? '#DBDBDB'),
        1, // alpha
        0 // alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outter)
    );
    g.beginFill(colorToHex('white'), 0);
    g.drawRect(l, t, w, h);

    // Borders
    const x = tm.spec().x;

    g.lineStyle(
        1,
        colorToHex('black'),
        1, // alpha
        0.5 // alignment of the line to draw, (0 = inner, 0.5 = middle, 1 = outter)
    );

    if (IsChannelDeep(x) && x.axis === 'top') {
        // top
        g.moveTo(l, t);
        g.lineTo(l + w, t);

        // left
        // g.moveTo(l, t);
        // g.lineTo(l, t + h);
    } else if (IsChannelDeep(x) && x.axis === 'bottom') {
        // bottom
        g.moveTo(l, t + h);
        g.lineTo(l + w, t + h);

        // left
        // g.moveTo(l, t);
        // g.lineTo(l, t + h);
    }
}
