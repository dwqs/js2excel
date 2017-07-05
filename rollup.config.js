/**
 * Created by pomy on 03/07/2017.
 */

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import builtins from 'rollup-plugin-node-builtins';

export default {
    entry: 'src/index.ts',
    format: 'umd',
    moduleName: 'js2excel',
    dest: 'dist/js2excel.js',
    plugins: [
        builtins(),
        resolve({
            customResolveOptions: 'node_modules',
            jsnext: true
        }),
        commonjs(),
        typescript(),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: true
        }),
        uglify({
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            },
            mangle: true
        })
    ]
}