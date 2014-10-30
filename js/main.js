//页面加载后执行， dom 加载完成
$(document).ready(function(){
  // 进度表 1秒加载完毕
  var pro_val = 0;   //进度值
  var timer = null;  //setTimeout对象
  var $progre = $("div.progress-bar");
  $progre.css('width', '0%');

  setTimeout(updateProgress, 100);

  function updateProgress(){
    if(pro_val == 100){
      clearTimeout(timer);
      $("#start").hide();
      $('#mainmenu').show();
      return;
    }
    $progre.attr('aria-valuenow', pro_val);
    $progre.css('width', pro_val + '%');
    $progre.find('.txt').text(pro_val + '%');
    pro_val+=1;
    timer = setTimeout(updateProgress, 100);
  }
  
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