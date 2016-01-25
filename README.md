
## 三国杀FAQ(第一版名：三国杀宝典)

#### 三国杀游戏查询webApp

本项目是 bootstrap3.2.0 练习DEMO版（v2.0），在github上 实时更新（学习项目）

* ps: 
  * 本项目数据信息部分已过时(第一版时用java代码生成)，更详细准确的三国杀 fap， 请访问： [三国杀fap](http://dadao.net/sgs/#) 
  * 项目打包使用了gulp，需要安装node环境；

#### 本地部署（win7 64bit为例）

* 确保本地已安装 git 以及 node 环境
  * win7下安装git [git 安装教程地址](http://wenku.baidu.com/view/e7d838999b89680203d825ba)
  * ps：访问git、TortoiseGit安装包的网址可能需要翻墙， 如无法下载， 根据“msysgit” “TortoiseGit”搜索国内网站下载安装包。
  * window 下安装node [node 安装教程地址](http://jingyan.baidu.com/article/b0b63dbfca599a4a483070a5.html)

* 在某文件夹 右键->“git bash” 运行以下命令行下载项目:
```Bash
git clone https://github.com/wteam-xq/threeKingdoms 
```

* 加入gulp自动化部署依赖包, 右键->“git bash” (或 shift+右键->在此打开命令窗口)运行以下命令行:
	
```Bash
npm install -g gulp
```

```Bash
npm install
```
* ps: npm install在本项目中引入gulp及其相关插件，使用gulp需要在全局以及工程内均安装gulp依赖包；


* 使用gulp 压缩、打包、部署代码,
```Bash
gulp
```


