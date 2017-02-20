// npm install gulp gulp-crisper lazypipe polyclean gulp-rename gulp-vulcanize gulp-util gulp-htmlmin gulp-if --save-dev
// yarn add gulp gulp-crisper lazypipe polyclean gulp-rename gulp-vulcanize gulp-util gulp-htmlmin gulp-if

var crisper = require('gulp-crisper');
var lazypipe = require('lazypipe');
var polyclean = require('polyclean');
var rename = require('gulp-rename');
var vulcanize = require('gulp-vulcanize');
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var gulpIf = require('gulp-if');

// Inline html imports, scripts and css also remove html comments
var htmlPipe = lazypipe().pipe(vulcanize, {
    inlineScripts: true,
    inlineCss: true,
    stripComments: true
});

// Remove whitespace from inline css. REMOVED DUE TO ISSUE WITH CSS MIXINS
//.pipe(polyclean.cleanCss);

// Remove javascript whitespace
var leftAlign = polyclean.leftAlignJs;

// Minimize javascript with uglifyjs
var uglify = polyclean.uglifyJs;

module.exports = function (opts) {
    opts = opts || {};
    var crush = opts.maximumCrush;
    var suffix = '';
    
    if (opts.suffix === false || opts.suffix === "") {
        suffix = '';
    } else if (typeof opts.suffix === 'string') {
        suffix = '.' + opts.suffix.split('.').join('');
    }
    
    var pipe = htmlPipe

    // Switch between cleaning or minimizing javascript
    .pipe(crush ? uglify : leftAlign)

    // Minimize html with htmlmin if crush === true
    .pipe(function() {
        return gulpIf(crush, htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }));
    })

    // Rename files with an infix suffix, if defined
    .pipe(rename, function(path) {
        path.basename += suffix;
    })

    // Split the javascript out into separate HTML and JavaScript files for CSP compliance
    .pipe(crisper)();

    // Have to handle errors ourselves, thanks gulp >:(
    pipe.on('error', function (error) {
        gutil.log(error.toString());
        process.exit(1);
    });

    return pipe;
};