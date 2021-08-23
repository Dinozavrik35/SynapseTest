const {src, dest, parallel, series, watch} = require('gulp');

const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const scss         = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss     = require('gulp-clean-css');
const compress     = require('compress-images');
const del          = require('del');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        },
        notify: false
    })
}

function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.min.js', 
        'node_modules/flickity/dist/flickity.pkgd.min.js',
        'app/js/app.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js/'))
    .pipe(browserSync.stream())
}

function styles() {
    return src([
        'node_modules/flickity/css/flickity.css',
        'app/scss/style.scss'
    ])
    .pipe(scss())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 versions'],
        grid: true
    }))
    .pipe(cleancss({
        level: {1: {specialComments: 0}}
    }))
    .pipe(dest('app/css/'))
    .pipe(browserSync.stream())
}

async function images() {
	compress(
		"app/images/src/**/*",
		"app/images/dest/",
		{ compress_force: false, statistic: true, autoupdate: true }, false,
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, 
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { 
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

function cleanImg() {
	return del('app/images/dest/**/*', { 
        force: true 
    })
}

function watching() {
    watch('app/scss/style.scss', styles);
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts);
    watch('app/**/*.html').on('change', browserSync.reload); 
    watch('app/images/src/**/*', images);
}

function buildCopy() {
	return src([ 
		'app/css/**/*.min.css',
		'app/js/**/*.min.js',
		'app/images/dest/**/*',
		'app/**/*.html',
		], { base: 'app' }) 
	.pipe(dest('dist'))
}

function cleanDist() {
	return del('dist/**/*', { 
        force: true 
    })
}

exports.browsersync = browsersync; 
exports.scripts     = scripts; 
exports.styles      = styles; 
exports.images      = images; 
exports.cleanImg    = cleanImg; 

exports.build       = series(cleanDist, styles, scripts, images, buildCopy);
exports.default     = parallel(styles, scripts, browsersync, watching);