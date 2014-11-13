
## 三国杀宝典

#### 三国杀游戏查询手册

本项目是 bootstrap3.2.0 更新版（v2.0），在github上 实时更新（学习练手项目）

* ps: 本项目数据信息部分已过时，更详细准确的三国杀 fap， 请访问： [三国杀fap](http://dadao.net/sgs/#) 
* 项目中的images 文件夹对应百度网盘链接：[images](http://pan.baidu.com/s/1sjmEicd) 
* 项目中的components 文件夹对应百度网盘链接：[components](http://pan.baidu.com/s/1i3yzO93)
  * 1.jquery-1.10.2.min.js; 
  * 2.bootstrap-3.2.0.min.js; 
  * 3.bootstrap-3.2.0.min.css;
  * 4.progress.js;
* 开发期间 images、components文件经常变更，建议出稳定版本后下载之。（完成版本后才更新网盘内容）


动工前的准备：
* 1.完成手绘UI图;
* 2.阅读、理解完bootstrap教程;（[慕课网](http://www.imooc.com/learn/141) 、[官网教程](http://v3.bootcss.com/)）
* 3.设计代码文件结构图;
* 4.photoshop完成UI图.

完工后的准备：
* 使用 node.js grunt 混淆、压缩代码;
* 租或借服务器放置代码.

### 计划（持续更新）：

本周完成：
* 11_09 - 11_15
  * 页面： 点击logo 作者信息展示；(11_11)
  * 优化：极客标签  置顶 小图标。(11_12)
  * 搜索框 修改成单独页面。(使用字体图标)(11_12)
  * 首页武将页面 内容添加；（难点：页面只显示20个武将，监听滚动条，超过20就加载新20条数据）;
  * 删除 卡牌、攻略、规则菜单 图片、样式、脚本（武将暂时保留）;
  * 搜索 点击事件添加（暂时加入已有菜单页面，关键字：规则、游戏牌、武将、攻略以及 武将的若干）;


### 开发日志：
* 11-01：
  * bootstrap 配合 jquery的进度条效果很不理想，3秒内完成的进度条，进度条样式跟不上。
* 11-04
  * 用本地样式 覆盖 bootstrap样式代码：padding:0px !important;
* 11-07
  * bootstrap 3.2 的移动设备优先的结果就是: 很多样式移动端显示正常，而PC端显示异常; 
  * 如果使用 !important 修改 ， 那pc端显示正常， 移动端显示异常。
* 11-13
  * jquery的效果，从左往右滑动过程中 自适应宽度块内的元素会变形

