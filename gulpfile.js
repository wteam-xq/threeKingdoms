// 获取 gulp
var gulp = require('gulp'),
    // js 压缩插件 （用于压缩 JS）
    uglify = require('gulp-uglify'),
    // 压缩css插件
    minifyCSS = require('gulp-minify-css'),
    // 获取 gulp-imagemin 模块
    imagemin = require('gulp-imagemin'),
    // 压缩html插件
    htmlmin = require('gulp-htmlmin'),
    // 合并文件
    concat = require("gulp-concat"),
    // html 文件对合并文件后的替换处理插件
    htmlReplace = require("gulp-html-replace"),
    // 复制文件（文件拷贝）
    copy = require('copy'),
    // 清除文件
    del = require('del');
// 版本号
var APP_VERSION = 'v.1.0';
// 1. 清除旧部署文件；
gulp.task('clean', function(cb){
    del(['dist/*']);
    cb();
});
// 2.拷贝 图标、字体、第三方已压缩文件；
gulp.task('copy', function(cb){
    copy('favicon.ico', 'dist/');
    cb();
});
// 3.压缩 js 文件；（包括合并操作， 多个js文件压缩成一个文件）
gulp.task('uglifyjs', function(){
    // 1. 找到文件
    gulp.src(['datas/*.js'])
    // 2. 压缩文件
        .pipe(uglify())
    // 3. 合并成一个文件
        .pipe( concat('datas.js') )
    // 4. 另存压缩后的文件
        .pipe( gulp.dest('dist/datas/') );

    gulp.src(['js/util.js', 'js/main.js'])
        .pipe(uglify())
        .pipe( concat('main.js') )
        .pipe( gulp.dest('dist/js/') );
});
// 4.压缩 css 文件；
gulp.task('cssmin', function(){
    // 1. 找到文件
    gulp.src('css/main.css')
    // 2. 压缩文件
        .pipe(minifyCSS())
    // 3. 另存为压缩文件
        .pipe(gulp.dest('dist/css/'))
});
// 5.压缩图片；
gulp.task('imagemin', function () {
    // 1. 找到图片
    gulp.src('images/**/*.{png,jpg,jpeg,gif,webp,svg}')
    // 2. 压缩图片
        .pipe( imagemin({
            progressive: true
        }) )
    // 3. 另存图片
        .pipe(gulp.dest('dist/images'))
});
// 6. 在html 中替换 调用的 js代码，以及压缩html（例如， a.html 调用了 a.js b.js， 然后 a.js b.js在第3步或第5步被合并成 c.min.js ;  这部分作用就是自动将a.html中改成调用 c.min.js ）。
gulp.task('htmlmin', function () {
    var options = {
        collapseWhitespace: true,//压缩HTML
        //省略布尔属性的值 <input checked="true"/> ==> <input />
        collapseBooleanAttributes: false,
        //删除所有空格作属性值 <input id="" /> ==> <input />
        removeEmptyAttributes: true,
        //删除<script>的type="text/javascript"
        removeScriptTypeAttributes: true,
        //删除<style>和<link>的type="text/css"
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('index.html')
        .pipe( htmlReplace({
            'datasjs': 'datas/datas.js',
            'mainjs': 'js/main.js'
            }) )
        .pipe( htmlmin(options) )
        .pipe( gulp.dest('dist/') );
});
// 默认任务(组合任务)
gulp.task('default', ['clean'], function(){
    gulp.start('copy', 'uglifyjs', 'cssmin', 'imagemin', 'htmlmin');
});
