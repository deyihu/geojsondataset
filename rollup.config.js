import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import { nodeResolve as resolve } from '@rollup/plugin-node-resolve';
const pkg = require('./package.json');

const banner = `/*!\n * ${pkg.name} v${pkg.version}\n * LICENSE : ${pkg.license}\n * */`;

let outro = pkg.name + ' v' + pkg.version;

outro = `typeof console !== 'undefined' && console.log('${outro}');`;

const intro = '';

const basePlugins = [
    resolve({
        module: true,
        jsnext: true,
        main: true
    }),
    json()
];

module.exports = [
    {
        input: './index.js',
        plugins: basePlugins,
        external: [],
        output: {
            'sourcemap': true,
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'outro': outro,
            'extend': true,
            'intro': intro,
            'globals': {

            },
            'file': `dist/${pkg.name}.js`
        }
    },
    {
        input: './index.js',
        plugins: basePlugins.concat([terser()]),
        external: [],
        output: {
            'sourcemap': false,
            'format': 'umd',
            'name': pkg.name,
            'banner': banner,
            'outro': outro,
            'extend': true,
            'intro': intro,
            'globals': {

            },
            'file': `dist/${pkg.name}.min.js`
        }
    },
    {
        input: './index.js',
        plugins: basePlugins,
        external: ['geojson-seg', 'mitt'],
        output: {
            'sourcemap': false,
            'format': 'es',
            'name': pkg.name,
            'banner': banner,
            'outro': outro,
            'extend': true,
            'intro': intro,
            'globals': {

            },
            'file': `dist/${pkg.name}.es.js`
        }
    },
];