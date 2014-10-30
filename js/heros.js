var three_all = [];
var three_shu = [];
var three_wei = [];
var three_wu = [];
var three_heros = [];
var three_god = [];

var three_json_data = new Array(three_all,three_shu,three_wei,three_wu,three_heros,three_god);

var g_x,g_y;    // 鼠标当前的坐标
var http_request;//ajax处理json变量

//存储每个武将点击事件信息
var json_hero_infos = [];
var json_num = 0;

function showMainButton(){
	$(".mainMenu_l button[name='l_button_one']").show();
	$(".three_mainMenu_r button[name='r_button_one']").animate({left:'736px'},500);
	
}

function comin_showMainButton(){
	$(".mainMenu_l button[name='l_button_one']").animate({left:'0px'},500);
	$(".three_mainMenu_r button[name='r_button_one']").animate({left:'736px'},500);
}

//显示其他按钮
function show_r_buttons(){
	//单击右按钮事件响应	
	var rightValue = $(".three_mainMenu_r button[name='r_button_five']").css("left");
	var leftValue = $(".mainMenu_l button[name='l_button_two']").css("left");
	
	if(leftValue == "1px"){
		$(".mainMenu_l button[name='l_button_two']").hide(100);
		$(".mainMenu_l button[name='l_button_two']").css("left","0px");
	}else if(rightValue == "737px"){
		hide_otherButton();
	}else{
		show_otherButton();
	}	
}

function show_l_buttons(){
	//单击左按钮事件响应
	var last_leftValue = $(".mainMenu_l button[name='l_button_two']").css("left");
	var last_rightValue = $(".three_mainMenu_r button[name='r_button_five']").css("left");
	
	if(last_rightValue == "737px"){
		hide_otherButton();
	}else if(last_leftValue == "1px"){
		$(".mainMenu_l button[name='l_button_two']").hide(100);
		$(".mainMenu_l button[name='l_button_two']").css("left","0px");
	}else{
		$(".mainMenu_l button[name='l_button_two']").show(100);
		$(".mainMenu_l button[name='l_button_two']").css("left","1px");
	}
}

function show_otherButton(){
	$("button[name='r_button_two']").show(100);
	$("button[name='r_button_three']").show(100);
	$("button[name='r_button_four']").show(100);
	$("button[name='r_button_five']").show(100);
	$("button[name='r_button_six']").show(100);
	$("button[name='r_button_seven']").show(100);
	$("button[name='r_button_eight']").show(100);
	var rightValue = $(".three_mainMenu_r button[name='r_button_five']").css("left","737px");
}

function hide_otherButton(){
	$("button[name='r_button_two']").hide(100);
	$("button[name='r_button_three']").hide(100);
	$("button[name='r_button_four']").hide(100);
	$("button[name='r_button_five']").hide(100);
	$("button[name='r_button_six']").hide(100);
	$("button[name='r_button_seven']").hide(100);
	$("button[name='r_button_eight']").hide(100);
	var rightValue = $(".three_mainMenu_r button[name='r_button_five']").css("left","736px");
}

function to_skip(){
	var rightValue = $(".three_mainMenu_r button[name='r_button_five']").css("left");
	var leftValue = $(".mainMenu_l button[name='l_button_two']").css("left");

	if(leftValue == "1px"){
		$(".mainMenu_l button[name='l_button_two']").hide(100);
		$(".mainMenu_l button[name='l_button_two']").css("left","0px");
		return false;
	}
	
	if(rightValue == "737px"){
		hide_otherButton();
		return false;
	}
	return true;
}
 
 /*点击任何位置*/
 function click_anywhere(){
	var canvas = document.getElementById("threeKingdomsCanvas");
	canvas.addEventListener("click",to_skip,true,-1);
 }

 /*右侧按钮跳转页面事件响应*/
 function three_Onclick(){
	$("#three_shu").click(function(){
		var topValue = $("#three_shu").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#three_shu"),topValue,this.name);
		}
	});
	$("#three_heros").click(function(){
		var topValue = $("#three_heros").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#three_heros"),topValue,this.name);
		}
	});
	$("#three_wei").click(function(){
		var topValue = $("#three_wei").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#three_wei"),topValue,this.name);
		}
	});
	$("#three_wu").click(function(){
		var topValue = $("#three_wu").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#three_wu"),topValue,this.name);
		}
	});
	$("#three_god").click(function(){
		var topValue = $("#three_god").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#three_god"),topValue,this.name);
		}
	});
	$("#three_all").click(function(){
		var topValue = $("#three_all").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#three_all"),topValue,this.name);
		}
	});
	
 }

 /*左侧按钮跳转页面事件响应*/
 function wind_three_Onclick(){
	$("#three").click(function(){
		var topValue = $("#three").css("top");
		if(this.name == "l_button_one"){
			show_l_buttons();
		}else{
			l_button_Event($("#three"),topValue,this.name);
		}
	});
	$("#wind").click(function(){
		var topValue = $("#wind").css("top");
		if(this.name == "l_button_one"){
			show_l_buttons();
		}else{
			l_button_Event($("#wind"),topValue,this.name);
		}
	});
	$("#back_button").click(function(){
		window.location.href="../index.html";
	});
 }

/*风火山林跳转页面事件响应*/
 function wind_Onclick(){
	 /*var packages =  new Array("#wind_all","#wind_standard","#wind_wind","#wind_fire","#wind_moutain","#wind_forest","#wind_sp","#wind_famous");
	 
	 for(var i = 0; i < packages.length; i++){
		 $(packages[i]).click(function(){
			  var topValue = $(packages[i]).css("top");
			  if(this.name == "r_button_one"){
				  show_r_buttons();
			  }else{
				  r_button_Event($(packages[i]),topValue,this.name);
			  }
			});
		 }*/
	$("#wind_all").click(function(){
		var topValue = $("#wind_all").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_all"),topValue,this.name);
		}
	});
	$("#wind_standard").click(function(){
		var topValue = $("#wind_standard").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_standard"),topValue,this.name);
		}

	});
	$("#wind_wind").click(function(){
		var topValue = $("#wind_wind").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_wind"),topValue,this.name);
		}
	});
	$("#wind_fire").click(function(){
		var topValue = $("#wind_fire").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_fire"),topValue,this.name);
		}
	});
	$("#wind_moutain").click(function(){
		var topValue = $("#wind_moutain").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_moutain"),topValue,this.name);
		}
	});
	$("#wind_forest").click(function(){
		var topValue = $("#wind_forest").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_forest"),topValue,this.name);
		}
	});
	$("#wind_sp").click(function(){
		var topValue = $("#wind_sp").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_sp"),topValue,this.name);
		}
	});
	$("#wind_famous").click(function(){
		var topValue = $("#wind_famous").css("top");
		if(this.name == "r_button_one"){
			show_r_buttons();
		}else{
			r_button_Event($("#wind_famous"),topValue,this.name);
		}
	});
	
	$("#back_button").click(function(){
		window.location.href="../index.html";
	});
 }

//右键按钮事件处理
function r_button_Event(pointed_Rbutton,topValue,name){
	$(".three_mainMenu_r button[name='r_button_one']").css("top",topValue);
	$(".three_mainMenu_r button[name='r_button_one']").css("left","736px");
	$(".three_mainMenu_r button[name='r_button_one']").css("display","inline");
	$(".three_mainMenu_r button[name='r_button_one']").attr("name",name);
	pointed_Rbutton.css("top","0px");
	pointed_Rbutton.css("left","1024px");
	pointed_Rbutton.css("display","block");
	pointed_Rbutton.attr("name","r_button_one");

	hide_otherButton();
	showMainButton();

	json_hero_infos = [];
	json_num = 0;
	redrawCanvas(pointed_Rbutton.attr("id"));
}
//左键按钮事件处理
function l_button_Event(pointed_Lbutton,topValue,name){
	$(".mainMenu_l button[name='l_button_one']").css("top",topValue);
	$(".mainMenu_l button[name='l_button_one']").attr("name",name);

	pointed_Lbutton.css("top","0px");
	pointed_Lbutton.css("left","-288px");
	pointed_Lbutton.css("display","inline");
	pointed_Lbutton.attr("name","l_button_one");

	$(".mainMenu_l button[name='l_button_two']").hide(100);
	$(".mainMenu_l button[name='l_button_two']").css("left","0px");

	json_hero_infos = [];
	json_num = 0;
	redrawCanvas_byCat(pointed_Lbutton.attr("id"));
}

//点击右按钮重新绘制画布
function redrawCanvas(pointed_name){
	var canvas = document.getElementById("threeKingdomsCanvas");
	var ctx  = canvas.getContext("2d");
	canvas.removeEventListener("click",canvas_event,true);
	//擦除画布内容,前两个参数为擦除画布左上角坐标x y,后两个参数为擦除的宽度跟高度
	//ctx.clearRect(0,0,1024,2050);
	document.getElementById("canvas_div").innerHTML = "<canvas class='canvas' id='threeKingdomsCanvas'  width='1024px' height='2050px'>不支持canvas标签！</canvas>";
	var reg = /wind/;
	var result =  reg.exec(pointed_name);
	if(result == "wind"){
		wind_canvas(pointed_name);
	}else{
		three_canvas(pointed_name);
		}
	
}

//点击左按钮重新绘制画布
function redrawCanvas_byCat(category_name){
	//重新绘制画布
	var canvas = document.getElementById("threeKingdomsCanvas");
	canvas.removeEventListener("click",canvas_event,true);
	document.getElementById("canvas_div").innerHTML = "<canvas class='canvas' id='threeKingdomsCanvas'  width='1024px' height='2050px'>不支持canvas标签！</canvas>";
	//重新绘制右侧包
	if(category_name == "wind"){
		document.getElementById("three_mainMenu_r").innerHTML = "<button class='m_button m_button_r' name='r_button_one' id='wind_all'><span>全部</span></button>" + "<button class='m_button m_button_r' id='wind_standard' name='r_button_two' ><span>标准包</span></button>" + 
		"<button class='m_button m_button_r' id='wind_wind' name='r_button_three' ><span>其疾如风</span></button>" + "<button class='m_button m_button_r' id='wind_fire' name='r_button_four' ><span>侵略如火</span></button>" +"<button class='m_button m_button_r' id='wind_moutain' name='r_button_five' ><span>不动如山</span></button>" +
		"<button class='m_button m_button_r' id='wind_forest' name='r_button_six' ><span>其徐如林</span></button>" + "<button class='m_button m_button_r' id='wind_sp' name='r_button_seven' ><span>SP系列</span></button>" + "<button class='m_button m_button_r' id='wind_famous' name='r_button_eight'><span>一将成名</span></button>";
	}else{
		document.getElementById("three_mainMenu_r").innerHTML = "<button class='m_button m_button_r' name='r_button_one' id='three_all'><span>全部</span></button>" + "<button class='m_button m_button_r' id='three_shu' name='r_button_two' ><span>蜀国</span></button>" + "<button class='m_button m_button_r' id='three_heros' name='r_button_three' ><span>群雄</span></button>" + 
			"<button class='m_button m_button_r' id='three_wei' name='r_button_four' ><span>魏国</span></button>" +"<button class='m_button m_button_r' id='three_wu' name='r_button_five' ><span>吴国</span></button>" + "<button class='m_button m_button_r' id='three_god' name='r_button_six' ><span>神</span></button>";
	}

	$(".three_mainMenu_r button[name='r_button_one']").css("left","1024px");

	$(".three_mainMenu_r button[name='r_button_five']").css("left","736px");
	comin_showMainButton();

	if(category_name == "wind"){
		wind_Onclick();
		wind_canvas("wind_all");
	}else{
		three_Onclick();
		three_canvas("three_all");
	}
}

 //三国鼎立canvas事件处理函数
 function three_canvas(nation){
	var canvas = document.getElementById("threeKingdomsCanvas");
	if(canvas.getContext)
	{
		var ctx  = canvas.getContext("2d");
		$(".background_img").css("display","block");
		$("html").css("overflow-y","visible");
		drawHeros(ctx,nation);
		//为canvas添加事件响应
		canvas.addEventListener("click",canvas_event,true,2);
		click_anywhere();
	}else{
		alert("获取canvas出错或者您的浏览器不支持Canvas!");
	}
 }
 
 //风火山林canvas事件处理函数
function wind_canvas(package){
	var canvas = document.getElementById("threeKingdomsCanvas");
	var ctx  = canvas.getContext("2d");
	
	drawHeros_byWind(ctx,package);
	//为canvas添加事件响应
	canvas.addEventListener("click",canvas_event,true,2);
	click_anywhere();
}

//画布统一的事件处理
function canvas_event(evt){
	var canvas = document.getElementById("threeKingdomsCanvas");
	var ctx  = canvas.getContext("2d");
	// 获取鼠标在 canvas 中的坐标位置  
	 if (evt.layerX || evt.layerX == 0) {   
		 g_x = evt.layerX ;   
		 g_y = evt.layerY ;   
	 }
	 
	 if(json_hero_infos.length > 0){
		for(var i = 0; i < json_hero_infos.length; i++){
			x = json_hero_infos[i].x;
			y = json_hero_infos[i].y;
			hero_img = json_hero_infos[i].hero_img;
			href = json_hero_infos[i].href;
			//一个武将的最大x y坐标
			var max_x = x + 336;
			var max_y = y + 120;
			//判断当前鼠标位置是否在图片之中  
			if(g_x  >= x && g_x  <= max_x  &&  g_y >= y && g_y <= max_y){

				/*document.getElementById("target").innerHTML = href;    //位于图片中*/
				if(to_skip()){
					//show_img(ctx,x,y,hero_img,1000,120,href);
					/*add_color(ctx,x,y);
					window.location.href = href;*/
					showHeroImag(x,y,hero_img,href);			
				}
				break;
			 }
			 //打印位置信息  
			 /*document.getElementById("xinfo").innerHTML = "mouse X: "+ g_x;   
			 document.getElementById("yinfo").innerHTML = "mouse Y: "+ g_y;*/
		}// end for
	 }//end if
	 
}

//绘制主页面按钮
function drawButton(ctx,leftMenu,rightMenu){
	var button_pic_l = new Image();
	var button_pic_c = new Image();
	var button_pic_r = new Image();

	//绘制按钮文字
	ctx.shadowOffsetX = 3;  
	ctx.shadowOffsetY = 3;  
	ctx.shadowBlur = 3;  
	ctx.shadowColor = "rgba(100, 100, 0, 0.5)";  

	ctx.font = "35px Times New Roman";  
	

	button_pic_l.onload = function(){
		ctx.drawImage(button_pic_l,0, 0);
		ctx.drawImage(button_pic_c,370, 0);
		ctx.drawImage(button_pic_r,737, 0);
		//3个参数参数1为绘制的字体内容，后两个参数为位置坐标dx dy
		ctx.fillStyle = "#ffffff"; 
		ctx.fillText(leftMenu, 78, 38);
		ctx.fillText("返回主菜单", 425, 38);
		ctx.fillText(rightMenu, 850, 38);
	}
	button_pic_l.src = "../images/military_page_button.jpg";
	button_pic_c.src = "../images/military_page_button.jpg";
	button_pic_r.src = "../images/military_page_button.jpg";
}

//绘制大分隔栏,对应参数分别为 画布上下文ctx 大分隔栏文字txt 以及大分隔栏的y 坐标 position 还有字体的x 坐标
function drawBigNav(ctx,txt,position,font_x){
	var pic_list = new Image();
	var pic_category_list = new Image();
	var pic_list_divider = new Image();
	var fontPosition = position + 50;
	var categoryPosition = position + 30;
	var dividerPosition = position + 78;
	//绘制按钮文字
	ctx.shadowOffsetX = 3;  
	ctx.shadowOffsetY = 3;  
	ctx.shadowBlur = 3;  
	ctx.shadowColor = "rgba(100, 100, 0, 0.5)";  

	ctx.font = "bold 35px Times New Roman"; 

	pic_list.onload = function(){
		var ptrn = ctx.createPattern(pic_category_list,'repeat'); 
		ctx.fillStyle = ptrn;  
		ctx.fillRect(0,categoryPosition,1024,22);
		var ptrn2 = ctx.createPattern(pic_list_divider,'repeat'); 
		ctx.fillStyle = ptrn2;
		ctx.fillRect(0,dividerPosition,1024,10);

		ctx.drawImage(pic_list,420, position);
		ctx.fillStyle = "#ffffff"; 
		ctx.fillText(txt, font_x, fontPosition);
	}
	pic_category_list.src = "../images/category_list_left.png";
	pic_list_divider.src = "../images/list_divider.png";
	pic_list.src = "../images/category_list_center.png";
	
}

//绘制小分隔栏
function drawNav(ctx,position){
	var pic_list_divider = new Image();
	pic_list_divider.onload = function(){
		var ptrn = ctx.createPattern(pic_list_divider,'repeat'); 
		ctx.fillStyle = ptrn;
		ctx.fillRect(0,position,1024,10);
	}
	pic_list_divider.src = "../images/list_divider.png";
}

//绘制一个武将包图形
function drawhero_package(package_heros,package_name,start_position,ctx){
	var hero_x = 0;
	var hero_y = start_position + 95;
	var loop_newline = 0;
	var nav_y = 0;

	/*//获取画布
	var canvas = document.getElementById("threeKingdomsCanvas");
	var ctx  = canvas.getContext("2d");*/
	//绘制大分隔栏
	if(package_name == "标准包" || package_name == "SP系列" || package_name == "神武将"){
		drawBigNav(ctx,package_name,start_position,460);
	}else{
		drawBigNav(ctx,package_name,start_position,440);
	}
	
	
	//设置文字阴影效果
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 0;
	ctx.shadowBlur = 0;
	//绘制武将文字
	ctx.fillStyle = "#000000";

	for(var i = 0; i < package_heros.length; i++){
		if(loop_newline < 3){
			//绘制一个武将
			drawhero(package_heros[i].name,package_heros[i].nickname,
				package_heros[i].img,package_heros[i].href,hero_x,hero_y,ctx);
			hero_x = hero_x + 336;
			loop_newline++;
		}else{
			//绘制小分隔栏
			nav_y = hero_y + 5 + 120;
			drawNav(ctx,nav_y);
			loop_newline = 0;
			hero_x = 0;
			hero_y = nav_y + 15;
			//绘制一个武将
			drawhero(package_heros[i].name,package_heros[i].nickname,
				package_heros[i].img,package_heros[i].href,hero_x,hero_y,ctx);
			hero_x = hero_x + 336;
			loop_newline++;
		}	
	}//end for loop
	//绘制完成，返回下一个武将包的y坐标
	hero_y = hero_y + 127;
	return hero_y;
}//end function drawhero_package()

//绘制一个武将
function drawhero(name,nickname,img,href,x,y,ctx){
	/*//获取画布
	var canvas = document.getElementById("threeKingdomsCanvas");
	var ctx  = canvas.getContext("2d");*/
	var hero_img = new Image();
	var font_x = x + 120;
	var name_y = y + 45;
	var nickname_y = y + 118;
 
	hero_img.onload = function(){
		ctx.drawImage(hero_img,x, y);
		
		//绘制武将文字
		ctx.fillStyle = "#000000";
		ctx.font = "bold 50px Times New Roman";
		ctx.fillText(name, font_x, name_y);
		ctx.font = "lighter 35px Times New Roman";
		ctx.fillText(nickname, font_x, nickname_y);
	}
	hero_img.src = img;
	var json_event_info = {"x":x,"y":y,"hero_img":img,"href":href};
	json_hero_infos[json_num] = json_event_info;
	json_num++;
}

//图片放大效果
function show_img(ctx,x,y,hero_img,time,dw,href){
	if(time == 0) {window.location.href = href; return;}
	ctx.drawImage(hero_img,x, y,dw,dw);
	time = time - 100;
	dw = dw + 20;
	setTimeout(function(){ show_img(ctx,x,y,hero_img,time,dw,href);},30);
}

//图片加色效果
function add_color(ctx,x,y){
	ctx.fillStyle = 'rgba(58,169,222,0.4)'; 
	ctx.fillRect(x,y,336,120);
}

//武将头像淡入淡出效果
function showHeroImag(x,y,hero_img,href){
	var img_x = x - 60;
	var img_y = y - 60;
	var hero_head = $("#hero_head");
	hero_head.get(0).innerHTML = "<img src='" + hero_img + "' height='360px' width='360px' alt='hero_head'>";
	hero_head.css("top",img_y + "px");
	hero_head.css("left",img_x + "px");
	hero_head.fadeIn('slow');
	//hero_head.css("display","inline");
	setTimeout ("window.location.href = href",600);
	hero_head.fadeOut('slow');
	}
	
//绘制所有武将图形
function drawHeros(ctx,heroNation){
	var storage = window.localStorage;

	//绘制武将包的起始坐标
    var package_y = 55;
   //武将包名数组
    var package_names = new Array("标准包","其疾如风","侵略如火","不动如山","其徐如林","SP系列","一将成名");
	
	switch(heroNation){
	case "three_shu":
		$("#threeKingdomsCanvas").attr("height","2050px");
		three_shu = JSON.parse(storage.getItem("storage_three_shu"));
		var hero_nation = this.three_shu;
		break;
	case "three_all":
		$("#threeKingdomsCanvas").attr("height","6250px");
		three_all = JSON.parse(storage.getItem("storage_three_all"));
		var hero_nation = this.three_all;
		break;
	case "three_heros":
		$("#threeKingdomsCanvas").attr("height","2050px");
		three_heros = JSON.parse(storage.getItem("storage_three_heros"));
		var hero_nation = this.three_heros;
		break;
	case "three_wei":
		$("#threeKingdomsCanvas").attr("height","2320px");
		three_wei = JSON.parse(storage.getItem("storage_three_wei"));
		var hero_nation = this.three_wei;
		break;
	case "three_wu":
		$("#threeKingdomsCanvas").attr("height","2050px");
		three_wu = JSON.parse(storage.getItem("storage_three_wu"));
		var hero_nation = this.three_wu;
		break;
	case "three_god":
		$("#threeKingdomsCanvas").attr("height","1200px");
		three_god = JSON.parse(storage.getItem("storage_three_god"));
		var hero_nation = this.three_god;
		break;
	default:
		break;
	}
	
	var nation_length = hero_nation.length; 
	for(var i = 0; i < nation_length; i++){
		var hero_num = hero_nation[i].length;
		if(hero_num > 0){
			if(heroNation == "three_god" && (i == 0 || i == 6)) alert("出错了！");
			package_y = drawhero_package(hero_nation[i],package_names[i],package_y,ctx);
		}
	}

}//end function drawHeros()

//根据点击包绘制武将
function drawHeros_byWind(ctx,heroPackage){
	var storage = window.localStorage;
	three_shu = JSON.parse(storage.getItem("storage_three_shu"));
	three_all = JSON.parse(storage.getItem("storage_three_all"));
	three_heros = JSON.parse(storage.getItem("storage_three_heros"));
	three_wei = JSON.parse(storage.getItem("storage_three_wei"));
	three_wu = JSON.parse(storage.getItem("storage_three_wu"));
	three_god = JSON.parse(storage.getItem("storage_three_god"));

	//绘制武将包的起始坐标
    var package_y = 55;
   //武将包名数组
    var nation_names = new Array("群雄武将","蜀国武将","魏国武将","吴国武将","神武将");
	var nations = new Array(three_heros,three_shu,three_wei,three_wu,three_god);
	
	 var hero_package = [
	 [],
	 [],
	 [],
	 [],
	 []
	 ];
	var package_length = hero_package.length;

	switch(heroPackage)
   {
	   	 case "wind_all":
		 $("#threeKingdomsCanvas").attr("height","5800px");		 
		 for(var k = 0; k < package_length; k++){
			 var nation_hero = nations[k];
			 var hero_num = nation_hero.length;
			 for(var i = 0; i < hero_num; i++){
				 if(nation_hero[i].length > 0){
					 hero_package[k] = hero_package[k].concat(nation_hero[i]);
					 }
			 }
		 }
		 break;
		 
	   case "wind_standard":
		 $("#threeKingdomsCanvas").attr("height","1800px");
		 for(var k = 0; k < package_length; k++){
		   var nation_hero = nations[k];
		   if(nation_hero[0].length > 0){
			   //hero_package[k] = hero_package[k].concat(nation_hero[0]);
			   hero_package[k] = nation_hero[0];
			   }
		 }
		 break;
	   case "wind_wind":
		 $("#threeKingdomsCanvas").attr("height","1170px");
		 for(var k = 0; k < package_length; k++){
		   var nation_hero = nations[k];
		   if(nation_hero[1].length > 0){
			   hero_package[k] = hero_package[k].concat(nation_hero[1]);
			   }
		 }
		 break;
	   case "wind_fire":
		 $("#threeKingdomsCanvas").attr("height","1170px");
		 for(var k = 0; k < package_length; k++){
		   var nation_hero = nations[k];
		   if(nation_hero[2].length > 0){
			   hero_package[k] = hero_package[k].concat(nation_hero[2]);
			   }
		 }
		 break;
	   case "wind_moutain":
		 $("#threeKingdomsCanvas").attr("height","1170px");
		 for(var k = 0; k < package_length; k++){
		   var nation_hero = nations[k];
		   if(nation_hero[3].length > 0){
			   hero_package[k] = hero_package[k].concat(nation_hero[3]);
			   }
		 }
		 break;
	   case "wind_forest":
		 $("#threeKingdomsCanvas").attr("height","1170px");
		 for(var k = 0; k < package_length; k++){
		   var nation_hero = nations[k];
		   if(nation_hero[4].length > 0){
			   hero_package[k] = hero_package[k].concat(nation_hero[4]);
			   }
		 }
		 break;
	   case "wind_sp":
		 $("#threeKingdomsCanvas").attr("height","1600px");
		 for(var k = 0; k < package_length; k++){
		   var nation_hero = nations[k];
		   if(nation_hero[5].length > 0){
			   hero_package[k] = hero_package[k].concat(nation_hero[5]);
			   }
		 }
		 break;
	   case "wind_famous":
		 $("#threeKingdomsCanvas").attr("height","1650px");
		 for(var k = 0; k < package_length; k++){
		   var nation_hero = nations[k];
		   if(nation_hero[6].length > 0){
			   hero_package[k] = hero_package[k].concat(nation_hero[6]);
			   }
		 }
		 break;
	   default:
		 return;
   }//end swith()
   for(var i = 0; i < hero_package.length; i++){
	    var heroPackage = hero_package[i];
		if(heroPackage.length > 0){
			if(heroPackage == "wind_standard" && i == 4) alert("出错啦");
			package_y = drawhero_package(heroPackage,nation_names[i],package_y,ctx);
		}
	}
   
}

//调整画布宽度及高度
function resize(){

	canvas.attr("width",window.innerwidth);

	canvas.attr("height",window.innerHeight);

	context.fillRect(0, 0, canvas.width(),canvas.height());
}

