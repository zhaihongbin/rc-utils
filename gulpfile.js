const babel = require('gulp-babel');
const gulp = require('gulp');
const rimraf = require('gulp-rimraf');
const through = require('through2');
const ts = require('gulp-typescript');
const tsconfig = require('./tsconfig.json');
const eslint = require('gulp-eslint');

function lint() {
  return gulp
    .src('lib/*')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function clean() {
  return gulp.src('lib/*', { read: false, allowEmpty: true }).pipe(rimraf());
}

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: 'ES6',
  });
  return gulp.src(['src/**/*.ts']).pipe(tsProject).pipe(gulp.dest('lib/es/'));
}

function buildCJS() {
  return gulp
    .src(['lib/es/**/*.js'])
    .pipe(
      babel({
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    )
    .pipe(gulp.dest('lib/cjs/'));
}

function buildDeclaration() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    paths: {
      ...tsconfig.compilerOptions.paths,
      'react': ['node_modules/@types/react'],
    },
    module: 'ES6',
    declaration: true,
    emitDeclarationOnly: true,
  });
  return gulp
    .src(['src/**/*.{ts,tsx}'])
    .pipe(tsProject)
    .pipe(gulp.dest('lib/es/'))
    .pipe(gulp.dest('lib/cjs/'));
}

function generatePackageJSON() {
  return gulp
    .src('./package.json')
    .pipe(
      through.obj((file, enc, cb) => {
        const rawJSON = file.contents.toString();
        const parsed = JSON.parse(rawJSON);
        delete parsed.scripts;
        delete parsed.devDependencies;
        delete parsed.publishConfig;
        delete parsed.files;
        delete parsed.resolutions;
        delete parsed.packageManager;
        const stringified = JSON.stringify(parsed, null, 2);
        file.contents = Buffer.from(stringified);
        cb(null, file);
      })
    )
    .pipe(gulp.dest('./lib/'));
}

exports.default = gulp.series(
  lint,
  clean,
  buildES,
  buildCJS,
  buildDeclaration,
  generatePackageJSON
);
