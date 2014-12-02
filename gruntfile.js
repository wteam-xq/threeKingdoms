// 执行压缩、合并代码操作
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //清除目录
    clean: ['dest'],

    // 复制字体文件
    copy: {
      main: {
        files: [
          {expand: true, src: ['fonts/*'], dest: 'dest'}
          {expand: true, src: ['components/bootstrap.min.css'], dest: 'dest/components/lib.css'}
        ]
      }
    },

    //压缩JS
    uglify: {
      my_target: {
        files: [{expand: true,cwd: 'components', src: ['**/*.js'],dest: 'dest/components/lib.js'},
          {expand: true,cwd: 'datas', src: ['**/*.js'],dest: 'dest/datas/datas.js'},
          {expand: true, src: ['js/main.js'],dest: 'dest/js/main.js'},
          {expand: true, src: ['js/util.js'],dest: 'dest/js/util.js'},
        ]
      }
    },

    //压缩CSS
    cssmin: {
      prod: {
        files: {
          'dest/css/main.css': ['css/main.css']
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
          {expand: true, src: ['images/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dest'}
        ]
      }
    },

    // 处理html中css、js 引入合并问题
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

  grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin', 'imagemin', 'htmlmin', 'usemin']);
};