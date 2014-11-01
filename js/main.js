//页面加载后执行， dom 加载完成
$(document).ready(function(){
  
  // // 进度表 1秒加载完毕
  // var pro_val = 0;   //进度值
  // var timer = null;  //setTimeout对象
  // var dom_progress = document.getElementById('progress_bar');
  // dom_progress.style.width = '0%';
  // var dom_proTxt = dom_progress.getElementsByTagName('span')[0];

  // setTimeout(updateProgress, 50);
  // function updateProgress(){

  //   dom_progress.setAttribute('aria-valuenow', pro_val);
  //   dom_progress.style.width = pro_val + '%';
  //   dom_progress.width = pro_val + '%';
  //   dom_proTxt.innerHTML = pro_val + '%';
  //   if(pro_val == 100){
  //     clearTimeout(timer);
  //     $("#start").hide();
  //     $('#mainmenu').show();
  //     return false;
  //   }
  //   pro_val+=1;
  //   timer = setTimeout(updateProgress, 50);
  // }
  
  // 进图条插件
  var options = {
     speed: 20,
     limit: 100,
     onComplete: function(pro_val){
      // console.log(pro_val);
      $("#progress").hide();
      $('#mainmenu').show();
     }
  };
  var myplugin = $('#progress').cprogress(options);
  myplugin.start();
  
  $("#heros").click(function(){
  window.location.href="herosMainPage/heros.html";
  }); //end click function()
  $("#card").click(function(){
  window.location.href="herosMainPage/card.html";
  });
  $("#rule").click(function(){
  window.location.href="herosMainPage/rule.html";
  });
   $("#strategy").click(function(){
  window.location.href="herosMainPage/strategy.html";
  });
});