# geojsondataset

## Introduce

geojson dataset,In the dataset, a large number of geojson can be automatically cut by [geojson-seg](https://github.com/deyihu/geojson-seg) and consumed by frame

## Install

- CDN

```html
<script type="text/javascript" src="https://unpkg.com/geojsondataset/dist/geojsondataset.js"
></script>
```

- NPM

```shell
  npm i geojsondataset

  #or

  yarn add geojsondataset
```

## API

### GeoDataSet

- constructor(options)

  - options.coordinateCount `the count of per geojson file coordinates`
  - options.loopFPS `the count of fps when loop`

  ```js
  import { GeoDataSet } from "geojsondataset";

  const geoDataSet = new GeoDataSet({ coordinateCount: 3000, loopFPS: 2 });
  ```

- on(dataGroupId,handler) `Listen for a data set to be dequeued`

  - dataGroupId `the id data group`
  - handler `callback ,when data is listed`

  ```js
  import { GeoDataSet } from "geojsondataset";

  const geoDataSet = new GeoDataSet({ coordinateCount: 3000, loopFPS: 2 });

  geoDataSet.on("testgeojson", (geojson) => {
    //do some things
  });
  ```

- off(dataGroupId,handler) `remove Listen for a data set to be dequeued`

  - dataGroupId `the id data group`
  - handler `callback ,when data is listed`

  ```js
  import { GeoDataSet } from "geojsondataset";

  const geoDataSet = new GeoDataSet({ coordinateCount: 3000, loopFPS: 2 });

  const handler = (geojson) => {
    //do some things
  };
  geoDataSet.on("testgeojson", handler);
  geoDataSet.off("testgeojson", handler);
  ```
- addGeoData(dataGroupId,geojson) `add geojson data to dataGroupId`

  - dataGroupId `the id data group`
  - geojson `geojson data`

  ```js
  import { GeoDataSet } from "geojsondataset";

  const geoDataSet = new GeoDataSet({ coordinateCount: 3000, loopFPS: 2 });

  const handler = (geojson) => {
    //do some things
  };
  geoDataSet.on("testgeojson", handler);

  fetch('./data/test.geojson').then(res=>res.json()).then(geojson=>{
     geoDataSet.addGeoData('testgeojson',geojson);

  })
  ```
