/**
 * Created by pomy on 03/07/2017.
 */

import uglify from 'rollup-plugin-uglify';

import config from './rollup.config';

config.plugins.push(
    uglify({
        compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
        },
        mangle: true
    })
);

export default {
    entry: 'src/index.ts',
    format: 'umd',
    moduleName: 'js2excel',
    dest: 'dist/js2excel.min.js',
    plugins: config.plugins
};