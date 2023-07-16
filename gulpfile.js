"use strict";

import gulp from "gulp";
import sass from "gulp-dart-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import rename from "gulp-rename";
import terser from "gulp-terser";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import browserSync from "browser-sync";
import del from "delete";
import { stacksvg } from "gulp-stacksvg";
import include from "gulp-file-include";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import concat from "gulp-concat";

const styles = () => {
  return gulp
    .src("./source/scss/main.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css", { sourcemaps: "." }))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return gulp
    .src("source/js/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(babel())
    .pipe(concat("main.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build/js"))
    .pipe(browserSync.stream());
};

const html = () => {
  return gulp
    .src("source/**/*.html")
    .pipe(include())
    .pipe(gulp.dest("build"))
    .pipe(browserSync.stream());
};

const images = () => {
  return gulp
    .src("source/img/**/*.{jpg,png}")
    .pipe(
      squoosh({
        webp: {},
      })
    )
    .pipe(gulp.dest("build/img"));
};

const svg = () => {
  return gulp
    .src(["source/img/**/*.svg", "!source/img/svg/icon/*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img"));
};

const stack = () => {
  return gulp
    .src("source/img/svg/icons/*.svg")
    .pipe(svgo())
    .pipe(stacksvg({ output: "stack.svg" }))
    .pipe(gulp.dest("build/img"));
};

const server = (done) => {
  browserSync.init({
    server: "./build",
  });
  done();
};

const clean = () => {
  return del("build");
};

const reload = (done) => {
  browserSync.reload();
  done();
};

const watch = () => {
  gulp.watch(["source/img/**/*.svg", "!source/img/svg/icon/*.svg"], svg);
  gulp.watch("source/img/svg/icons/*.svg", stack);
  gulp.watch("./source/img/**/*.{jpeg,jpg,png}", images);
  gulp.watch("./source/scss/**/*.scss", styles);
  gulp.watch("./source/js/**/*.js", scripts);
  gulp.watch("./source/*.html", gulp.series(html, reload));
};

export const build = gulp.series(
  clean,
  gulp.parallel(scripts, styles, html, images, svg, stack)
);

export default gulp.series(
  clean,
  gulp.parallel(scripts, styles, html, images, svg, stack),
  server,
  watch
);
