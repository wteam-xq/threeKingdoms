//画布的全局变量
var canvas = null;
var ctx = null;
var can_toggle = false;
//记录在canvas上的图形坐标，如点击“基本牌”后，6张基本牌的坐标数组
var point_cards = [];
var page_type = "";
//游戏牌详细页面json数据
var card_data = [];
//置顶模式判定符
var top_flg = false;

//定义菜单类
if(typeof DrawMenu == 'undefined'){
	function DrawMenu(){
		var _this = this;

		canvas = document.getElementById("cardCanvas");
		if(canvas.getContext)
		{
			ctx  = canvas.getContext("2d");
			//添加canvas事件
			canvas.addEventListener("click",_this.addEventListener,true);
			//添加dom事件
			_this.clickButton();
		}else{
			alert("获取canvas出错或者您的浏览器不支持Canvas!");
		}
 }//end class DrawMenu
}//end if

//点击按钮响应事件 (所有页面的dom按钮点击事件)
DrawMenu.prototype.clickButton = function(){
	var _this = this;
	$("#card_basic").click(function(){
		_this.drawDetailPage(card_basic);
		});
	$("#card_physical").click(function(){
		_this.drawDetailPage(card_physic);
		});
	$("#card_status").click(function(){
		_this.drawDetailPage(card_status);
		});
	$("#card_kit").click(function(){
		_this.drawDetailPage(card_kit);
		});
	$("#card_weapon").click(function(){
		_this.drawDetailPage(card_weapon);
		});
	$("#card_heros").click(function(){
		window.location.href = "../herosMainPage/canvas_three.html";
		});
	$("#back").click(function(){
		window.location.href = "../index.html";
		});

	$("#back_button").click(function(event){
		$("#cardCanvas").attr("height","600px");
		$(".back_button").css("display","none");
		$(".back_index").css("display","none");
		$(".turn_top").css("display","none");
		$(".m_button").css("display","inline");
		$("#mainmenu").attr("class","mainMenu");
		$("html").css("overflow","hidden");
		/*$(".top_img").css("display","none");*/
		$(".background_img").css("display","none");
		can_toggle = false;
		page_type = "card_index"
		});	
	$("#back_index").click(function(){
		window.location.href = "../index.html";
	});
	/*卡牌的详细页面跳转回卡牌图列表，例如“酒”的详细页面 点击“返回上级” 跳回“基本牌”图列表*/
	$("#detail_back").click(function(){
		$(".detail_back").css("display","none");
		/*$(".top_img").css("display","block");*/
		//页面至顶部
		 window.scrollTo(0,0);
		/*已交由超链接按钮<a></a>搞定*/
		_this.drawDetailPage(current_page);
		});
	/*$("#turn_top").click(function(){
		document.getElementById("turn_top").innerHTML = "<div ><a class='detail_button turn_top' href='javascript:scroll(0,0)' target='_self'>返回顶部</a></div>";
		$("html").css("overflow","visible");
		$("body").css("overflow","visible");
		top_flg = true;
		$("#turn_top").unbind( "click");
	});*/
}

//字菜单响应事件,如点击“基本牌”列表的“酒”的事件触发
DrawMenu.prototype.addEventListener = function(evt){
	//这里的this是canvas而不是类DrawMenu
	//var _this = this;

	var detail_text = new DetailText();

	// 获取鼠标在 canvas 中的坐标位置  
	 if (evt.layerX || evt.layerX == 0) {   
		 g_x = evt.layerX ;   
		 g_y = evt.layerY ;   
	 }
		
	 if(point_cards.length > 0){
		var x = 0;
		var y = 0;
		var max_x = 0;
		var max_y = 0;
		for(var i = 0; i < point_cards.length; i++){
			x = point_cards[i].x - 5;
			y = point_cards[i].y - 5;
			max_x = x + 200 + 5;
			max_y = point_cards[i].y + 290 + 5;
			if(g_x > x && g_x < max_x && g_y > y && g_y < max_y){
				if(page_type == "card_menu"){
					if(evt.target == this){
						//detail_text.showDetail(point_cards[i].jsondata,point_cards[i].img.src);
						//页面至顶部
						//document.body.scrollTop = 0;
						showCardImag(x,y,point_cards[i].jsondata,point_cards[i].img);
						//阻止冒泡
						evt.stopPropagation();
						can_toggle = false;
						}
					break;
					}
				break;
			}
		}
	 }//end if
	 if(page_type == "card_menu"){
		$("#back_button").toggle();
		$("#back_index").toggle();
		$("#turn_top").toggle();		
		}else if(page_type == "card_detail"){
			$("#detail_back").toggle();
			}	
}

//绘制页面图片事件 如点击“基本牌”跳转的页面
DrawMenu.prototype.drawDetailPage = function(json_data){
	var _this = this;
	can_toggle = true;
	$(".m_button").css("display","none");
	$("#mainmenu").attr("class","otherPage");
	$("html").css("overflow","visible");
	
	document.getElementById("back_button").innerHTML = "<div class='detail_button back_button'><span>返回上级</span></div>";
	document.getElementById("back_index").innerHTML = "<div class='detail_button back_index'><span>返回主菜单</span></div>";
	document.getElementById("turn_top").innerHTML = "<div ><a class='detail_button turn_top' href='javascript:scroll(0,0)' target='_self'>返回顶部</a></div>";
	/*if(top_flg){
		document.getElementById("turn_top").innerHTML = "<div ><a class='detail_button turn_top' href='javascript:scroll(0,0)' target='_self'>返回顶部</a></div>";
		$("html").css("overflow","visible");
		}else{
			document.getElementById("turn_top").innerHTML = "<div class='change_mode'><a class='detail_button turn_top'>切换至顶部模式</a></div>";
			}*/
	$(".background_img").css("display","block");

	var canvas_height = _this.canvasHeight(json_data);
	if(canvas_height < 600){
		canvas_height = 600;
	}
	//计算新canvas高度
	if(json_data.length == 0){
		$("#cardCanvas").attr("height",canvas_height + "px");
		}else{
			$("#cardCanvas").attr("height",canvas_height + "px");
			_this.drawCardImg(json_data);
			}
	}

//计算新canvas高度
DrawMenu.prototype.canvasHeight = function(json_data){
	var x = 35;
	var y = 110;
	var IMGINTERVALX = 50;
	var IMGINTERVALY = 25;
	var IMGWIDTH = 200;
	var IMGHEIGHT = 290;
	var line_num = 0;

	for(var i = 0; i < json_data.imgs.length; i++){
		if(line_num == 3){				
			y = y + IMGHEIGHT + IMGINTERVALY;
			x = 35;
			line_num = 0;
			}else{
				x = x + IMGWIDTH + IMGINTERVALX;
				line_num++;
				}
			
		}
	if(line_num == 0){
		y = y + 10;
		}else{
			y = y + IMGHEIGHT + 10;
			}	
	return y;
	}

//存储将要回执图片的数组
var card_imgs = [];
//绘制卡牌图片，例如点击了“基本牌”后的跳转页面
DrawMenu.prototype.drawCardImg = function(json_data){
	card_imgs = [];
	//重置canvas事件响应json数据
	point_cards = []
	page_type = "card_menu";
	var x = 35;
	var y = 110;
	var IMGINTERVALX = 50;
	var IMGINTERVALY = 25;
	var IMGWIDTH = 200;
	var IMGHEIGHT = 290;
	var line_num = 0;
	var img_json_num = 0;
	var point_cards_num = 0;
	
	var top_img = new Image();
	//绘制顶部图片
	top_img.onload = function(){
		ctx.drawImage(top_img,0,0);
		ctx.fillStyle = "#C8A166";
		ctx.font = "35px Microsoft YaHei";
		ctx.shadowColor = "#ffffbe";
		ctx.shadowBlur = "25";
		ctx.shadowOffsetX = 3;  
		ctx.shadowOffsetY = 3;
		//绘制出基本牌（或是体力牌等）。
		ctx.fillText(json_data.name,490,57);
	}
	top_img.src = "../images/card_list.png";

	
	
	//循环读取json数据，为了显示正常得在最后一张图片加载时绘制所有图片
	for(var i = 0; i < json_data.imgs.length; i++){
		var data_img = new Image();
		data_img.src = json_data.imgs[i];

		var json_img = {"img":data_img,"x":x,"y":y};
		card_imgs[img_json_num] = json_img;
		img_json_num++;

		if(line_num == 3){				
			y = y + IMGHEIGHT + IMGINTERVALY;
			x = 35;
			line_num = 0;
			}else{
				x = x + IMGWIDTH + IMGINTERVALX;
				line_num++;
				}
			
		}
	//循环绘制出图片
	card_imgs[card_imgs.length - 1].img.onload = function(){
		for(var i = 0; i < card_imgs.length; i++){
			var x = card_imgs[i].x;
			var y = card_imgs[i].y;
			var img = card_imgs[i].img;
			ctx.drawImage(img,x,y);
			var json_card = {"x":x,"y":y,"img":img,"jsondata":json_data};
			point_cards[point_cards_num] = json_card;
			point_cards_num++;
			}
		}//end onload function()
}


//绘制详细内容的类 绘制最后页面（如点击“基本牌”的酒跳转后的页面）的类
if(typeof DetailText == 'undefined'){
	function DetailText(){
		var _this = this;
		}
}


var current_page = [];
//展示具体信息，如点击“基本牌”的“桃”页面
DetailText.prototype.showDetail = function(jsondata,href){
	var _this = this;
	var json_data = [];
	//记录当前页面模式
	current_page = jsondata;
	//从异步端web workers获得json数据
	//json_data = getJson(href);
	
	_this.showDetailButton();
	page_type = "card_detail";
	$(".back_button").css("display","none");
	$(".back_index").css("display","none");
	$(".turn_top").css("display","none");
	/*$(".top_img").css("display","none");*/
	$("#mainmenu").attr("class","detailPage");
	
	$('body').scrollTop(0);
	//根据点击的牌选择对应函数
	switch(jsondata.type){
		case "basic":
			//alert("♥进入基本牌选择");
		case "kit":
			//alert("锦囊牌");
		case "weapon":
			//alert("装备牌");
			json_data = _this.getJsonData(href);
			var canvas_height = _this.canvasHeight(json_data);
			if(canvas_height < 600){
				canvas_height = 600;
				}
			$("#cardCanvas").attr("height",canvas_height + "px");
			_this.drawFont(json_data);
			break;
		case "physic":
			//alert("体力牌");
			json_data = json_physic;
			var canvas_height = _this.canvasHeight(json_data);
			if(canvas_height < 600){
				canvas_height = 600;
				}
			$("#cardCanvas").attr("height",canvas_height + "px");
			_this.drawFont(json_data);	
			//获得该点击的身份牌名称（正则表达式取得）
			var reg = /(physic_).*(\.jpg)$/;
			var regSelectRole = reg.exec(href)[0];
			console.log(regSelectRole);
			//根据点击的身份进行偏移
			switch(regSelectRole){
				case 'physic_2.jpg':
					break;
				case 'physic_3.jpg':
					$('body').scrollTop(300);
					break;
				case 'physic_4.jpg':
					$('body').scrollTop(600);
					break;
				case 'physic_5.jpg':
					$('body').scrollTop(1200);
					break;
			}

			break;
		case "status":
			//alert("身份牌");
			//获得该点击的身份牌名称(字符串方法取得)
			/*var endIndex = href.lastIndexOf('.') - 1;
			var startIndex = href.lastIndexOf('/') + 1;
			var selectRole = href.substring(startIndex,endIndex);
			console.log(selectRole);*/				
			json_data = json_status;
			var canvas_height = _this.canvasHeight(json_data);
			if(canvas_height < 600){
				canvas_height = 600;
				}
			$("#cardCanvas").attr("height",canvas_height + "px");
			_this.drawFont(json_data);
			//获得该点击的身份牌名称（正则表达式取得）
			var reg = /(juese_).*(\.jpg)$/;
			var regSelectRole = reg.exec(href)[0];
			console.log(regSelectRole);
			//根据点击的身份进行偏移
			switch(regSelectRole){
				case 'juese_zhugong.jpg':
					break;
				case 'juese_zhongcheng.jpg':
					$('body').scrollTop(600);
					break;
				case 'juese_fanzei.jpg':
					$('body').scrollTop(1100);
					break;
				case 'juese_neijian.jpg':
					$('body').scrollTop(1600);
					break;
			}

			break;
		default:
			alert("点选出错！");
		}

	
	//计算新canvas高度
	/*if(json_data.length == 0){
		var canvas_height = 600;
		$("#cardCanvas").attr("height",canvas_height + "px");
		}else{
			var canvas_height = _this.canvasHeight(href,i);
			$("#cardCanvas").attr("height",canvas_height + "px");
			_this.drawFont(href,i);
			}		*/		
}

//展示具体信息
DetailText.prototype.showDetailButton = function(){
	document.getElementById("detail_back").innerHTML = "<div class='detail_button detail_back'><a href='javascript:scroll(0,0)' target='_self'>返回上级</a></div>";
	$("#detail_back").show();
	}

//绘制基本牌
DetailText.prototype.getJsonData = function(href){
	var card_data = [];
	//使用正则表达式获得“.jpg”的第一次出现位置
	var reg = /\.jpg/;
	var end_num = href.search(reg);
	//获得最后出现"/"的位置
	var start_num = href.lastIndexOf("/") + 1;
	var new_string =  href.substring(start_num,end_num);
	//获得json数据
	card_data = eval(new_string);
	return card_data;
	//alert(new_string);
	}

//计算canvas高度
DetailText.prototype.canvasHeight = function(json_data){
	var FONTLENGTH = 40;
	var interval = 5 + 25;
	var y = 25;
	var font_num = 0;
	
	//主标题绘制居中效果
	y = y + interval + 15;

	for(var j = 1; j < json_data.length; j++){
		//当json数据位图片时
		if(json_data[j].p == null){	
			//强制转换为十进制数
			var img_height = 290;
			y = y + 5 + img_height + 25;
			}else{
				while(json_data[j].p.length > font_num + FONTLENGTH){					
					y = y + interval + 10;
					font_num = font_num + FONTLENGTH;
					}//end while loop				
				y = y + interval + 15;
				font_num = 0;
				}
		}//end for loop
	return y;
	}

var card_imgs = [];
//绘制canvas内容
DetailText.prototype.drawFont = function(json_data){
	var _this = this;
	//绘制文字
	ctx.fillStyle = "#000";
	ctx.font = "30px Microsoft YaHei";
	var FONTLENGTH = 40;

	var interval = 5 + 25;
	var x = 5;
	var y = 25;
	var font = "";
	var font_num = 0;
	var img_json_num = 0;
	card_imgs = [];
	
	//主标题绘制
	font = json_data[0].p;
	ctx.fillText(font,x,y + 15);
	y = y + interval + 15;
	ctx.fillStyle = "#000";
	ctx.font = "25px Microsoft YaHei";

	for(var j = 1; j < json_data.length; j++){
		//当json数据位图片时
		if(json_data[j].p == null){
			var card_img = new Image();
			var img_width = 200;
			var img_height = 290;
			var img_x = x + 5;
			var img_y = y - 10;
			card_img.src = json_data[j].img;
			var json_img = {"img":card_img,"x":img_x,"y":img_y,"width":img_width,"height":img_height};
			card_imgs[img_json_num] = json_img;
			img_json_num++;					
			y = y + 5 + img_height + 25;
			}else{
				while(json_data[j].p.length > font_num + FONTLENGTH){
					font = json_data[j].p.substring(font_num,font_num + FONTLENGTH);
					_this.drawSpecialFont(font,x,y);
					y = y + interval + 10;
					font_num = font_num + FONTLENGTH;
					}//end while loop
				font = json_data[j].p.substring(font_num,font_num + FONTLENGTH);
				_this.drawSpecialFont(font,x,y);
				//ctx.fillText(font,x,y);
				y = y + interval + 15;
				font_num = 0;
				}
		}//end for loop
	//循环绘制出图片
	card_imgs[card_imgs.length - 1].img.onload = function(){
		for(var i = 0; i < card_imgs.length; i++){
			var x = card_imgs[i].x;
			var y = card_imgs[i].y;
			var width = card_imgs[i].width;
			var height = card_imgs[i].height;
			var img = card_imgs[i].img;
			ctx.drawImage(img,x,y,width,height);
			}
		}//end onload function()
	}

//绘制特殊字体
DetailText.prototype.drawSpecialFont = function(font,x,y){
	var special_font = font.substring(0,3);
	var first_font = font.substring(0,1);
	if( special_font === "[A]" || special_font === "[Q]" ){
		ctx.fillStyle = "#E33431";
		ctx.fillText(special_font,x,y);
		ctx.fillStyle = "#000";
		font = font.substring(3);
		ctx.fillText(font,x + 47,y);
		}else if(special_font === "花色："){							
			ctx.fillText(special_font,x,y);
			ctx.fillStyle = "#E33431";							
			font = font.substring(3);
			ctx.fillText(font,x + 70,y);
			ctx.fillStyle = "#000";
			}else if(special_font === "例如："){
				ctx.fillStyle = "#E33431";
				ctx.fillText(special_font,x,y);
				ctx.fillStyle = "#000";
				font = font.substring(3);
				ctx.fillText(font,x + 80,y);
				}/*else if(first_font == "♦" || first_font == "♥" || first_font == "♠" first_font == "♣"){
					ctx.fillStyle = "#E33431";
					ctx.fillText(font,x,y);
					ctx.fillStyle = "#000";
					}*/else{
						ctx.fillText(font,x,y);
						}
	}//end function drawSpecialFont()

//卡牌淡入淡出效果
function showCardImag(x,y,jsondata,img){
	var img_x = x - 60;
	var img_y = y - 60;
	var hero_head = $("#card_img");
	hero_head.get(0).innerHTML = "<img src='" + img.src + "' height='440px' width='300px' alt='card_head'>";
	hero_head.css("top",img_y + "px");
	hero_head.css("left",img_x + "px");
	hero_head.fadeIn('slow');
	setTimeout (function(){
		//跳转至详细牌页面，如点击了“基本牌”的“酒”的跳转页面
		var detail_text = new DetailText();
		detail_text.showDetail(jsondata,img.src);
		},600);
	hero_head.fadeOut('slow');
	page_type = "card_detail";
	}