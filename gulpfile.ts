import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import * as gulpLoadPlugins from 'gulp-load-plugins';
import * as CONFIG from './gulp.config';

const $ = gulpLoadPlugins();

gulp.task('compile', () => {
    let tsResult = gulp.src(CONFIG.ts.src)
        .pipe($.sourcemaps.init())
        .pipe($.typescript(
            $.typescript.createProject(CONFIG.ts.config)
        ));
    return tsResult.js
        .pipe($.sourcemaps.write('.', {sourceRoot: CONFIG.js.srcRoot}))
        .pipe(gulp.dest(CONFIG.js.dest));
});

gulp.task('build', (done) => {
    runSequence('compile', done);
});