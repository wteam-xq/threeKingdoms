
## 三国杀宝典

#### 三国杀游戏查询手册

本项目是 bootstrap3.2.0 更新版（v2.0），在github上 实时更新（学习练手项目）

* ps: 本项目数据信息部分已过时(第一版时用java代码生成)，更详细准确的三国杀 fap， 请访问： [三国杀fap](http://dadao.net/sgs/#) 
* 项目中其他文件夹对应百度网盘链接：[otherPackages](http://pan.baidu.com/s/1eQ9vZKA) 
  * 包含文件夹：1.components(第三方库文件);2.fonts(bootstrap字体图标);3.images(应用图片).
  * 将压缩包中的文件夹放置于index.html同级目录即可
  * 开发期间 以上文件夹经常变更，建议出稳定版本后下载之。（完成版本后即更新网盘内容）


动工前的准备：
* 1.完成手绘UI图;
* 2.阅读、理解完bootstrap教程;（[慕课网](http://www.imooc.com/learn/141) 、[官网教程](http://v3.bootcss.com/)）
* 3.设计代码文件结构图;
* 4.photoshop 完成 UI图对应 素材.

完工后的准备：
* 使用 node.js grunt 混淆、压缩代码;
* 租或借服务器放置代码.

### 计划（持续更新）：

本周完成：
* 11_30- 12_06
  * 项目打包;(12_2)
  * 检测设备， 添加二维码按钮（参考 禅知）(12_3)
  * 项目放置 云主机;
  * 博客园博文迁移；
  * 购买服务器准备

### 开发日志：
* 11-01：
  * bootstrap 配合 jquery的进度条效果很不理想，5秒内完成的进度，进度条样式跟不上。
* 11-04
  * 用本地样式 覆盖 bootstrap样式代码：padding:0px !important;
* 11-07
  * bootstrap 3.2 的移动设备优先的结果就是: 很多样式移动端显示正常，而PC端显示异常; 
  * 如果使用 !important 简单的修改 ， 那pc端显示正常，移动端显示异常。要同时兼容两端样式上还是得花时间。
* 11-13
  * jquery的效果，从左往右滑动过程中 自适应宽度块内的元素会变形(百度gmu是使用 css3 的transition 实现过渡)
* 11-15
  * 按需加载实现原理，监听滚动条，滚动条到达底部时 解析新的dom;
  * UC 浏览器 判断滚动条到达底部时:  $(document).scrollTop() != $(document).height() - $(window).height()
* 11-18
  * 手机web开发缓存解决方案，加入“时间戳”， document.writeln() 实现。

### 有待添加
* 检测用户访问设备， 如果是PC端 弹出手机访问提示及二维码；