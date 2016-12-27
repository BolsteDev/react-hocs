import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import { Instrumenter } from 'isparta';
import util from 'gulp-util';

/**
 * Optional param:
 * --quiet
 * --fix
 */
gulp.task('es-lint', () => {
  return gulp.src([
    'src/**/*.js',
    'src/**/*.jsx',
  ])
  .pipe(eslint({
    quiet: !!util.env.quiet,
    fix: !!util.env.fix,
  }))
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('lint', ['es-lint']);

/**
 * Optional param:
 * --test=`module`
 */
gulp.task('pre-test', () => {
  let test = '**';

  if (util.env.test) {
    test = `**/${util.env.test}/**`;
  }

  return gulp.src([
    `src/${test}/*.js`,
    `src/${test}/*.jsx`,
  ])
  .pipe(istanbul({
    instrumenter: Instrumenter,
    includeUntested: true,
  }))
  .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  let test = '**';

  if (util.env.test) {
    test = `**/${util.env.test}/**`;
  }

  gulp.src([
    'test-boot.js',
    `src/${test}/*.test.js`,
  ])
  .pipe(mocha())
  .pipe(istanbul.writeReports())
  .pipe(istanbul.enforceThresholds({ thresholds: { global: 10 } }));
});
