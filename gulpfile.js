const babel = require("gulp-babel");
// const del = require("del");
const gulp = require("gulp");
const ts = require("gulp-typescript");
const tsconfig = require("./tsconfig.json");

// function clean() {
//   return del("./lib/**");
// }

function buildES() {
  const tsProject = ts({
    ...tsconfig.compilerOptions,
    module: "ES6",
  });
  return gulp.src(["src/**/*.ts"]).pipe(tsProject).pipe(gulp.dest("lib/es/"));
}

function buildCJS() {
  return gulp
    .src(["lib/es/**/*.js"])
    .pipe(
      babel({
        plugins: ["@babel/plugin-transform-modules-commonjs"],
      })
    )
    .pipe(gulp.dest("lib/cjs/"));
}

exports.default = gulp.series(
  // clean,
  buildES,
  buildCJS
);
