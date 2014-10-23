//画布的全局变量
var canvas = null;
var ctx = null;
var storage = null;
var can_toggle = false;

//定义菜单类
if(typeof DrawMenu == 'undefined'){
	function DrawMenu(){
		var _this = this;

		canvas = document.getElementById("ruleCanvas");
		if(canvas.getContext)
		{
			ctx  = canvas.getContext("2d");
			//添加dom事件
			_this.clickButton();
			//初始化json数据(使用localstorage)
			_this.saveData();
		}else{
			alert("获取canvas出错或者您的浏览器不支持Canvas!");
		}
 }//end class DrawMenu
}//end if

//给localstorage存入数据
DrawMenu.prototype.saveData = function(){
	 if (window.localStorage) {
		storage = window.localStorage;
		var storage_onevsone = storage.getItem("storage_onevsone");
		//判断localStorage中有没有存储json对象
		if(storage_onevsone){
			//alert("已经存储了json对象");
			}else{
				//将json数据存入
				storage.setItem("storage_onevsone",JSON.stringify(json_onevsone));
				storage.setItem("storage_threevsthree",JSON.stringify(json_threevsthree));
				storage.setItem("storage_status",JSON.stringify(json_status));
				storage.setItem("storage_battle_royal",JSON.stringify(json_battle_royal));
				storage.setItem("storage_hlg",JSON.stringify(json_hlg));
				storage.setItem("storage_relive",JSON.stringify(json_relive));
				}
		}else{
			alert("您的浏览器不支持 local storage!");
			}

}

//点击按钮响应事件，例如点击了“1v1规则”时的页面跳转
DrawMenu.prototype.clickButton = function(event){
	var _this = this;
	$("#rule_onevsone").click(function(event){
		var json_onevsone = JSON.parse(storage.getItem("storage_onevsone"));
		//从ruleWorker中获取数据
		_this.drawDetailPage(json_onevsone);
		//event.stopPropagation();
		});
	$("#rule_threevsthree").click(function(event){
		var json_threevsthree = JSON.parse(storage.getItem("storage_threevsthree"));
		_this.drawDetailPage(json_threevsthree);
		//event.stopPropagation();
		});
	$("#rule_status").click(function(event){
		var json_status = JSON.parse(storage.getItem("storage_status"));
		_this.drawDetailPage(json_status);
		//event.stopPropagation();
		});
	$("#rule_battle_royal").click(function(event){
		var json_battle_royal = JSON.parse(storage.getItem("storage_battle_royal"));
		_this.drawDetailPage(json_battle_royal);
		event.stopPropagation();
		});
	$("#rule_hlg").click(function(event){
		var json_hlg = JSON.parse(storage.getItem("storage_hlg"));
		_this.drawDetailPage(json_hlg);
		event.stopPropagation();
		});
	$("#rule_relive").click(function(event){
		var json_relive = JSON.parse(storage.getItem("storage_relive"));
		_this.drawDetailPage(json_relive);
		event.stopPropagation();
		});
	$("#back").click(function(event){
		window.location.href = "../mainmenu.html";
		});

	$("#back_button").click(function(event){
		$("#ruleCanvas").attr("height","600px");
		$(".back_button").css("display","none");
		$(".m_button").css("display","inline");
		$("#mainmenu").attr("class","mainMenu");
		$("html").css("overflow","hidden");
		$(".background_img").css("display","none");
		can_toggle = false;
		});

	$("#ruleCanvas").click(function(){
			$("#back_button").toggle();
		});
}

//绘制页面事件
DrawMenu.prototype.drawDetailPage = function(json_data){
	var _this = this;
	$(".m_button").css("display","none");
	$("#mainmenu").attr("class","otherPage");
	$("html").css("overflow-y","visible");
	$(".background_img").css("display","block");
	
	document.getElementById("back_button").innerHTML = "<div class='detail_button back_button'><span>返回上级</span></div>";

	var canvas_height = _this.canvasHeight(json_data);
	if(canvas_height < 600){
		canvas_height = 600;
	}
	//计算新canvas高度
	if(json_data.length == 0){
		$("#ruleCanvas").attr("height",canvas_height + "px");
		}else{
			$("#ruleCanvas").attr("height",canvas_height + "px");
			_this.drawFont(json_data);
			}
	/*$("#ruleCanvas").attr("height","1000px");
	_this.drawFont(json_data);*/
}

//计算canvas高度
DrawMenu.prototype.canvasHeight = function(json_data){

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
			var img_height = parseInt(json_data[j].height,10);
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

var rule_imgs = [];
//绘制canvas内容
DrawMenu.prototype.drawFont = function(json_data){
	//绘制文字
	ctx.fillStyle = "#000";
	ctx.font = "25px Microsoft YaHei";
	var FONTLENGTH = 40;

	var interval = 5 + 25;
	var x = 5;
	var y = 25;
	var font = "";
	var font_num = 0;
	var img_json_num = 0;
	rule_imgs = [];
	
	//主标题绘制居中效果
	font = json_data[0].p;
	ctx.fillText(font,x + 430,y + 5);
	y = y + interval + 15;

	for(var j = 1; j < json_data.length; j++){
		//当json数据位图片时
		if(json_data[j].p == null){
			var rule_img = new Image();
			var img_width = json_data[j].width;
			var img_height = parseInt(json_data[j].height,10);
			var img_x = x + 512 - img_width/2;
			var img_y = y;
			rule_img.src = json_data[j].img;
			var json_img = {"img":rule_img,"x":img_x,"y":img_y,"width":img_width,"height":img_height};
			rule_imgs[img_json_num] = json_img;
			img_json_num++;
			//ctx.drawImage(rule_img,img_x, img_y,img_width,img_height);							
			y = y + 5 + img_height + 25;
			}else{
				while(json_data[j].p.length > font_num + FONTLENGTH){
					font = json_data[j].p.substring(font_num,font_num + FONTLENGTH);
					ctx.fillText(font,x,y);
					y = y + interval + 10;
					font_num = font_num + FONTLENGTH;
					}//end while loop
				font = json_data[j].p.substring(font_num,font_num + FONTLENGTH);
				ctx.fillText(font,x,y);
				y = y + interval + 15;
				font_num = 0;
				}
		}//end for loop
	//循环绘制出图片
	rule_imgs[rule_imgs.length - 1].img.onload = function(){
		for(var i = 0; i < rule_imgs.length; i++){
			var x = rule_imgs[i].x;
			var y = rule_imgs[i].y;
			var width = rule_imgs[i].width;
			var height = rule_imgs[i].height;
			var img = rule_imgs[i].img;
			ctx.drawImage(img,x,y,width,height);
			}
		}//end onload function()
	}

//展示返回按钮
DrawMenu.prototype.showBackButton = function(){
	document.getElementById("back_button").innerHTML = "<div class='detail_button back_button'><span>返回上级</span></div>";
	}

