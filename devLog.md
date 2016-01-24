### 计划（持续更新）：

本周完成：
* 0917-0930
  * 完成gulp部署代码编写；

### 开发日志：
* 11-01：
  * bootstrap 配合 jquery的进度条效果很不理想，5秒内完成的进度，进度条样式跟不上。
* 11-04
  * 用本地样式 覆盖 bootstrap样式代码：padding:0px !important;
* 11-07
  * bootstrap 3.2 的移动设备优先的结果就是: 很多样式移动端显示正常，而PC端显示异常; 
  * 如果使用 !important 简单的修改 ， 那pc端显示正常，移动端显示异常。要同时兼容两端样式上还是得花时间。
* 11-13
  * j滑动效果不太理想，从左往右滑动过程中 自适应宽度块内的元素会变形(百度gmu是使用 css3 的transition 实现过渡)，方案：滑动前固定宽度，滑动后恢复100%自适应；
* 11-15
  * 按需加载实现原理，监听滚动条，滚动条到达底部时 解析新的dom;
  * UC 浏览器 判断滚动条到达底部时:  $(document).scrollTop() != $(document).height() - $(window).height()
* 11-18
  * 手机web开发缓存解决方案，加入“时间戳”， document.writeln() 实现。
* 12-03
  * 使用grunt 进行打版，grunt-usemin 是难点，解决方案：使用最新版本（官方英文教程为最新版）+ 细看 官方教程(在github 或 npm网站可搜到);
* 01-14  项目作为博客栗子作参考, 对比 grunt gulp 熊猫压缩，对比压缩png图片的质量对比；
  * 任意一张图(图片已经过ps存储为Web所用格式)： 

* 9-17
  * 使用 gulp 重新进行部署；
* 1-24
  * 说明页面更改成gulp打版，上线后使用CDN加载类库速度对比(http://www.bootcdn.cn/)
  * 线上加载时间对比截图1,cdn加速版:
  ![线上加载时间对比截图1,cdn加速版](https://github.com/wteam-xq/threeKingdoms/blob/master/images/tkd_v2_load.png)
  * 线上加载时间对比截图1,cdn未加速版:
  ![线上加载时间对比截图1,cdn未加速版](https://github.com/wteam-xq/threeKingdoms/blob/master/images/tkd_v2_load2.png)
* 应用初始加载的数据用了6.82s（8.42s）， 所以该单页面demo线上的主要问题在于将所有数据起始加载;

### 维护日志：
* 04-10 武将攻略页面， 翻页点击事件 仍留内存；
  * 方案：jquery 节点“live” 事件改成普通事件。
* 04-10 点击搜索框进入搜索页后再点击武将菜单，武将双菜单bug：点击右侧菜单无响应；
  * 原因：二维码dom 遮住了菜单
  * 方案：二维码dom 新增display显示隐藏样式（原来只是用透明度显示隐藏）。
* 07-06 图片在手机端显示有些模糊
  * 方案： 使用 background-size: Wpx Hpx;(W 图片宽度、H图片高度)设置图片共用类
* 07-07 单页面应用， 路由管理器实现；
  * 实现原理：
* 07-10 首页置顶效果bug: 从首页到二级页面，然后再从二级页面返回后，首页置顶效果消失！头部 fixed失效！
  * 原因：css 的 fixed效果 被 transform干掉了。（相关教程：http://www.zhangxinxu.com/wordpress/2015/05/css3-transform-affect/）
  * 方案：jquery的animate效果结束后，干掉transform。

### 留存bug
* 小米系统(MIUI 4.12.5)浏览器 武将菜单 下拉首次增加数据时， 加载图标右侧渲染出脏节点； 
* grunt-contrib-imagemin   error the socket is closed (住处笔记本正常，办公室笔记本出现)
