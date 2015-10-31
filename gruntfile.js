// 执行压缩、合并代码、优化图片 操作
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //清除目录
    clean: {
      all: ['dest/*'],
      unImg: ["dest/*", "!dest/images"]
    },

    // 复制文件
    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html', 'favicon.ico'], dest: 'dest'}
        ]
      }
    },
    //压缩JS
    uglify: {
      generated: {
        files: [
          {dest: 'dest/datas/datas.js', src: ['datas/*.js']},
          {dest: 'dest/js/main.js', src: ['js/util.js', 'js/main.js']}
        ]
      }
    },
    //压缩CSS
    cssmin: {
      generated: {
        files: {
          'dest/css/main.css': ['css/main.css']
        }
      }
    },
    //压缩图片
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [{expand: true, 
            cwd: 'images/', 
            src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'], 
            dest: 'dest/images'
        }]
      }
    },
    // 处理html中css、js 引入合并问题
    useminPrepare:{
      html: 'index.html',
      options: {
        root: 'threeKingdoms_xq',
        dest: 'dest'
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
          'dest/index.html': 'dest/index.html'
        }
      }
    }

  });
  // 加载任务的插件
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');
  // 包括图片处理
  grunt.registerTask('default', ['clean', 'copy', 'uglify:generated', 'cssmin', 'imagemin', 'usemin', 'htmlmin']);
  // 不包括图片处理
  // grunt.registerTask('default', ['clean:unImg', 'copy', 'uglify:generated', 'cssmin', 'usemin', 'htmlmin']);
};