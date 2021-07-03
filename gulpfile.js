	// I don't feel like writing var everytime
	var gulp = require("gulp"),
	    sass = require("gulp-sass")(require('sass')),
	    postcss = require("gulp-postcss"),
	    autoprefixer = require("autoprefixer"),
	    cssnano = require("cssnano"),
	    sourcemaps = require("gulp-sourcemaps");

	// npm i gulp gulp-sass gulp-postcss autoprefixer cssnano gulp-sourcemaps

	function style() {
	    return (
	        gulp
	        .src("./sass/**/*.scss")
	        // Initialize sourcemaps before compilation starts
	        .pipe(sourcemaps.init())
	        .pipe(sass())
	        .on("error", sass.logError)
	        // Use postcss with autoprefixer and compress the compiled file using cssnano
	        .pipe(postcss([autoprefixer(), cssnano()]))
	        // Now add/write the sourcemaps
	        .pipe(sourcemaps.write())
	        .pipe(gulp.dest("./css"))
	    );
	}


	function watch() {
	    //I usually run the compile task when the watch task starts as well
	    style();

	    gulp.watch("./sass/**/*.scss", style);
	}

	// Don't forget to expose the task!
	//exports.watch = watch

	function defaultTask(cb) {
	    // place code for your default task here
	    watch();
	}

	exports.default = defaultTask