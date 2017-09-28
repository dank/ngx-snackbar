import resolve from 'rollup-plugin-node-resolve';

const globals = {
  '@angular/core': 'ng.core',
  '@angular/common': 'ng.common',
  'rxjs/Observable': 'Rx',
  'rxjs/Observer': 'Rx',
  'rxjs/Subject': 'Rx'
};

export default {
  entry: './dist/modules/ngx-snackbar.es5.js',
  dest: './dist/bundles/ngx-snackbar.umd.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'ng.ngxSnackbar',
  plugins: [
    resolve()
  ],
  external: Object.keys(globals),
  globals: globals,
  onwarn: () => {
    return;
  }
}
