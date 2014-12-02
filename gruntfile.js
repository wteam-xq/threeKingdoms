// 执行压缩、合并代码操作
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //清除目录
    clean: ['dest/*'],

    // 复制字体文件
    copy: {
      main: {
        files: [
          {expand: true, src: ['fonts/*'], dest: 'dest'}
        ]
      }
    },

    //压缩JS
    uglify: {
      my_target: {
        files: [{dest: 'dest/components/lib.js', src: ['components/*.js'] },
          {dest: 'dest/datas/datas.js', src: ['datas/*.js']},
          {dest: 'dest/js/main.js', src: ['js/main.js']},
          {dest: 'dest/js/util.js', src: ['js/util.js']}
        ]
      }
    },

    //压缩CSS
    cssmin: {
      prod: {
        files: {
          'dest/css/main.css': ['css/main.css'],
          'dest/css/lib.css': ['components/bootstrap.min.css']
        }
      }
    },

    //压缩图片
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          {expand: true, cwd: 'images/', src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dest/images'}
        ]
      }
    },
    // 处理html中css、js 引入合并问题
    useminPrepare:{
      html: 'index.html',
      options: {
        flow: { steps: { js: ['concat', 'uglifyjs'], css: ['concat', 'cssmin'] }, post: {} } 
      }
    },
   
    usemin: {
      html: 'dest/index.html'
      
    },

    //压缩HTML
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      html: {
        files: {
          'dest/index.html': 'index.html'
        }
      }
    }

  });
  // 加载任务的插件
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');
  // grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin', 'imagemin', 'htmlmin', 'usemin']);
  grunt.registerTask('default', ['clean', 'useminPrepare', 'uglify', 'cssmin', 'htmlmin', 'usemin']);
};