//鼠标坐标
var g_x = 0;
var g_y = 0;
//存储每个点击事件信息
json_hero_infos = [];
json_num = 0;

var canvas = null;
var ctx = null;

var json_data = [];
			
//绘制攻略菜单,定义绘制菜单类
if(typeof DrawMenu == 'undefined'){
	function DrawMenu(){
		var _this = this;
		//用var定义的属性是私有的。我们需要使用this关键字来定义公有的属性
		//_this.menu_name = null;
		_this.FIELDX = 620;
		_this.FIELDY = 130;

		canvas = document.getElementById("StrategyCanvas");
		if(canvas.getContext)
		{
			var detail_text = new DetailText();
			ctx  = canvas.getContext("2d");
			//添加canvas事件
			canvas.addEventListener("click",_this.addEventListener,true);
			//添加dom事件
			detail_text.clickButton();
		}else{
			alert("获取canvas出错或者您的浏览器不支持Canvas!");
		}
 }//end class DrawMenu
}//end if
//绘制文字
DrawMenu.prototype.drawMenu = function(menu_name){
	var _this = this;
	//var field_names = new Array("1v1模式","3v3模式","身份模式");
	var field_names = [{"mode":"1v1模式","event":"onevsone"},{"mode":"3v3模式","event":"threevsthree"},{"mode":"身份模式","event":"status"}];
	//var figures = new Array("蜀国武将","魏国武将","吴国武将","群雄武将");
	var figures = [{"mode":"蜀国武将","event":"shu"},{"mode":"魏国武将","event":"wei"},{"mode":"吴国武将","event":"wu"},{"mode":"群雄武将","event":"heros"}];
	//var cards = new Array("锦囊牌","武器牌");
	var cards = [{"mode":"锦囊牌","event":"kit"},{"mode":"武器牌","event":"weapon"}];
	var x = _this.FIELDX;
	var y = _this.FIELDY;
	ctx.clearRect(0,0,1024,600);
	ctx.fillStyle = "#fff";
	ctx.font = "bold 50px Times New Roman";

	//回复0事件
	json_hero_infos = [];
	json_num = 0;
	
	switch(menu_name)
	{
		case "field":
			y = y + 40;
			for(var i = 0; i < field_names.length; i++){
				ctx.fillText(field_names[i].mode, x, y);
				var json_event_info = {"x":x,"y":y,"href":field_names[i].event,"name":field_names[i].mode};
				json_hero_infos[json_num] = json_event_info;
				json_num++;
				y = y + 3 * 50;
			}
			break;
		case "figure":
			y = y + 30;
			for(var i = 0; i < figures.length; i++){
				ctx.fillText(figures[i].mode, x, y);
				var json_event_info = {"x":x,"y":y,"href":figures[i].event,"name":figures[i].mode};
				json_hero_infos[json_num] = json_event_info;
				json_num++;
				y = y + 2 * 50;
			}
			break;
		case "card":
			y = y + 80;
			for(var i = 0; i < cards.length; i++){
				ctx.fillText(cards[i].mode, x, y);
				var json_event_info = {"x":x,"y":y,"href":cards[i].event,"name":cards[i].mode};
				json_hero_infos[json_num] = json_event_info;
				json_num++;
				y = y + 4 * 50;
			}
			break;
		default:
			return;
	}
}
//点击按钮响应事件
DrawMenu.prototype.clickButton = function(){
	var _this = this;
	
	$("#strategy_field").click(function(){
		_this.drawMenu("field");
	});
	$("#strategy_figure").click(function(){
		_this.drawMenu("figure");
	});
	$("#strategy_card").click(function(){
		_this.drawMenu("card");
	});
	$("#back").click(function(){
		window.location.href = "../index.html";
	});
}

//字菜单响应事件,例如点击战场攻略中的“1v1模式”的页面跳转
DrawMenu.prototype.addEventListener = function(evt){
	//这里的this是canvas而不是类DrawMenu
	//var _this = this;

	var detail_text = new DetailText();

	// 获取鼠标在 canvas 中的坐标位置  
	 if (evt.layerX || evt.layerX == 0) {   
		 g_x = evt.layerX ;   
		 g_y = evt.layerY ;   
	 }

	 if(json_hero_infos.length > 0){
		var x = 0;
		var y = 0;
		var max_x = 0;
		var max_y = 0;
		for(var i = 0; i < json_hero_infos.length; i++){
			x = json_hero_infos[i].x;
			y = json_hero_infos[i].y - 50;
			max_x = x + json_hero_infos[i].name.length*50;
			max_y = json_hero_infos[i].y;
			if(g_x > x && g_x < max_x && g_y > y && g_y < max_y && page_type == "menu"){
				if(evt.target == this){
					detail_text.showDetail(json_hero_infos[i].href,current_page - 1);
					}
				break;
			}
		}
	 }//end if
}


var page_type = "menu";
var current_page = 1;
var total_page = 0;
var can_toggle = false;
//绘制详细内容的类
if(typeof DetailText == 'undefined'){
	function DetailText(){
		var _this = this;
		}
}

//展示具体信息
DetailText.prototype.showDetail = function(href,i){
	var _this = this;	
	//改变了画布的高度会自动清空画布
	//ctx.clearRect(0,0,1024,600);
	//记录当前页面模式
	_this.current_mode = href;
	//从异步端web workers获得json数据
	json_data = getJson(href);
	//添加背景图片dom
	$(".background_img").css("display","block");

	_this.showDetailButton(href,i);
	page_type = "detail";
	//alert(href);
	//计算新canvas高度
	if(json_data.length == 0){
		var canvas_height = 600;
		$("#StrategyCanvas").attr("height",canvas_height + "px");
		}else{
			var canvas_height = _this.canvasHeight(href,i);
			$("#StrategyCanvas").attr("height",canvas_height + "px");
			_this.drawFont(href,i);
			}	

				
}

//翻页
DetailText.prototype.changePage = function(href,i){
	var _this = this;	
	//计算新canvas高度
	_this.showDetailButton(href,i);
	var canvas_height = _this.canvasHeight(href,i);
	$("#StrategyCanvas").attr("height",canvas_height + "px");
	_this.drawFont(href,i);
	
}

//返回按钮事件
DetailText.prototype.clickButton = function(){
	var _this = this;
	/*返回按钮事件*/
	$("#back_button").click(function(){
		$(".m_button").css("display","inline");
		$(".background_img").css("display","none");
		_this.hideDetailButton();
		$("#StrategyCanvas").attr("height","600px");
		$("#mainmenu").attr("class","mainMenu");
		$("html").css("overflow","hidden");
		//$("#mainmenu").css("background","#E1CAA1 url(../images/StrategyBack.jpg) no-repeat fixed");
		/*var draw_font = new DrawMenu();
		//移除事件
		canvas.removeEventListener("click",draw_font.addEventListener,true);*/
		page_type = "menu";
		current_page = 1;
		can_toggle = false;
		});
	
	/*下一页按钮事件*/
	$("#next_page").click(function(event){
		  _this.hideDetailButton();
		  current_page++;
		  //页面跳转至顶部
		  if(document.body.scrollTop){
			  document.body.scrollTop = 0;/*for chrome*/
			  }else{
				  document.documentElement.scrollTop = 0;/*ie ff*/
			  }
		  _this.changePage(_this.current_mode,current_page - 1);
		  event.stopPropagation();
		});
	/*上一页按钮事件*/
	$("#last_page").click(function(event){
		_this.hideDetailButton();
		current_page--;
		if(document.body.scrollTop){

			  document.body.scrollTop = 0;/*for chrome*/
			  }else{
				  document.documentElement.scrollTop = 0;/*ie ff*/
			  }
		_this.changePage(_this.current_mode,current_page - 1);
		});	
		
	/*伸缩按钮事件*/
	$("#StrategyCanvas").click(function(){
		if(can_toggle){
			$("#back_button").toggle();
			$("#last_page").toggle();
			$("#next_page").toggle();
			$("#turn_top").toggle();
			}else{
				can_toggle = true;
				}
		
		});
	}
	
//绘制文字
DetailText.prototype.drawFont = function(href,i){
	current_page = i + 1;
	//绘制文字
	ctx.fillStyle = "#000";
	ctx.font = "25px Microsoft YaHei";
	var FONTLENGTH = 40;

	var interval = 5 + 25;
	var x = 5;
	var y = 25;
	var font = "";
	var font_num = 0;
	var first_x = x +50;
	
	for(var j = 0; j < json_data[i].length; j++){
		
		while(json_data[i][j].p.length > font_num + FONTLENGTH){
			font = json_data[i][j].p.substring(font_num,font_num + FONTLENGTH);
			ctx.fillText(font,x,y);
			y = y + interval + 10;
			font_num = font_num + FONTLENGTH;
			}//end while loop
		font = json_data[i][j].p.substring(font_num,font_num + FONTLENGTH);
		ctx.fillText(font,x,y);
		y = y + interval + 15;
		font_num = 0;
		}
	}
	
//计算canvas高度
DetailText.prototype.canvasHeight = function(href,i){
	//绘制文字
	var FONTLENGTH = 40;
	var interval = 5 + 25;
	var x = 5;
	var y = 25;
	var font = "";
	var font_num = 0;
	var first_x = x +50;
	
	for(var j = 0; j < json_data[i].length; j++){
		while(json_data[i][j].p.length > font_num + FONTLENGTH){
			y = y + interval + 10;
			font_num = font_num + FONTLENGTH;
			}//end while loop		
		y = y + interval + 15;
		font_num = 0;
		}
	if(y < 600){
		y = 600;
		}
	return y;
	}
	
//显示详细页面按钮
DetailText.prototype.showDetailButton = function(href,i){
	//总页数
	total_page = json_data.length;
	//当前页数
	current_page = i + 1;
	
	$(".m_button").css("display","none");
	$("#mainmenu").attr("class","otherPage");
	$("html").css("overflow","visible");
	//$("#mainmenu").css("background","#E1CAA1 url(../images/militaryBg.jpg) repeat-y fixed");
	//document.getElementById("back_button").innerHTML = "<div class='back_button'><span>返回上级</span></div>";
	document.getElementById("back_button").innerHTML = "<div class='detail_button back_button'><span>返回上级</span></div>";
	document.getElementById("turn_top").innerHTML = "<div ><a class='detail_button turn_top' href='javascript:scroll(0,0)' target='_self'>返回顶部</a></div>";
	
	if(current_page == 1){
		document.getElementById("next_page").innerHTML = "<div class='detail_button next_page'><span>下一页</span></div>";
		}else if(total_page > current_page){			
			document.getElementById("next_page").innerHTML = "<div class='detail_button next_page'><span>下一页</span></div>";
			document.getElementById("last_page").innerHTML = "<div class='detail_button last_page'><span>上一页</span></div>";
			}else{
				document.getElementById("last_page").innerHTML = "<div class='detail_button last_page'><span>上一页</span></div>";
				}
	}
	
//隐藏详细页面按钮
DetailText.prototype.hideDetailButton = function(){
	$(".back_button").css("display","none");
	$(".last_page").css("display","none");
	$(".next_page").css("display","none");
	$(".turn_top").css("display","none");
	}

//实现从web workers异步加载json数据
DetailText.prototype.getJsonData = function(href){
	var json_data = [];

	var getWebWorkerSupport = function() {
            return (typeof(Worker) !== "undefined") ? true:false;
        }
	var isSupport = getWebWorkerSupport();
	if(isSupport){
		//WEB页主线程
		 var worker = new Worker("js/strategyWorker.js"); //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL
		 worker.postMessage(href);     //向worker发送数据
		 worker.onmessage = function(evt){     //接收worker传过来的数据函数
		   console.log(evt.data);              //输出worker发送来的数据
		   json_data = evt.data;
			}
		 worker.onerror = function(event){
				alert('Worker error:'+error.message+'/n');
				throw error;
			};
		 return json_data;	
	}
	
}

//测试web workers异步加载（注意谷歌浏览器不支持）
function testWebworker(href){
	var hero_data = "";
	//WEB页主线程
	 var worker = new Worker("js/strategyWorker.js"); //创建一个Worker对象并向它传递将在新线程中执行的脚本的URL
	 worker.postMessage(href);     //向worker发送数据
	 worker.onmessage = function(evt){     //接收worker传过来的数据函数
	   console.log(evt.data);              //输出worker发送来的数据
	   hero_data = evt.data;
		}
	 alert(hero_data);
	}//end function testWEbworker()

