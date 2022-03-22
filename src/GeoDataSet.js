import { seg } from 'geojson-seg';
import mitt from 'mitt';

const OPTIONS = {
    coordinateCount: 3000,
    //loop per fps
    loopFPS: 1
};

export class GeoDataSet {
    constructor(options) {
        this.options = Object.assign({}, OPTIONS, options);
        this.dataSet = {};
        this._mitt = mitt();
        this._loopFPS = 0;
        this._loop();
    }

    addGeoData(dataGroupId, geojson) {
        this.dataSet[dataGroupId] = this.dataSet[dataGroupId] || [];
        const geojsons = seg(geojson, this.options.coordinateCount);
        geojsons.forEach(geojson => {
            this.dataSet[dataGroupId].push(geojson);
        });
        return this;
    }

    on(dataGroupId, hanlder) {
        this._mitt.on(dataGroupId, hanlder);
        return this;
    }

    off(dataGroupId, hanlder) {
        this._mitt.off(dataGroupId, hanlder);
        return this;
    }

    _fire(dataGroupId, data) {
        this._mitt.emit(dataGroupId, data);
        return this;
    }

    _loop() {
        this._loopFPS++;
        if (this._loopFPS >= this.options.loopFPS) {
            for (const dataGroupId in this.dataSet) {
                const geojsons = this.dataSet[dataGroupId] || [];
                if (geojsons.length) {
                    this._fire(dataGroupId, geojsons[0]);
                    geojsons.splice(0, 1);
                }
            }
            this._loopFPS = 0;
        }
        requestAnimationFrame(this._loop.bind(this));
    }
}
