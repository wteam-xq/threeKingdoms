//页面加载后执行， dom 加载完成
$(document).ready(function(){
  
  // bootstrap进度条初始化
  function bProgressInit(){
    // 进度表 1秒加载完毕
    var pro_val = 0;   //进度值
    var timer = null;  //setTimeout对象
    var dom_progress = document.getElementById('progress_bar');
    dom_progress.style.width = '0%';
    var dom_proTxt = dom_progress.getElementsByTagName('span')[0];

    setTimeout(updateProgress, 50);

    function updateProgress(){
      dom_progress.setAttribute('aria-valuenow', pro_val);
      dom_progress.style.width = pro_val + '%';
      dom_progress.width = pro_val + '%';
      dom_proTxt.innerHTML = pro_val + '%';
      if(pro_val == 100){
        clearTimeout(timer);
        $("#start").hide();
        $('#mainmenu').show();
        return false;
      }
      pro_val+=1;
      timer = setTimeout(updateProgress, 50);
    }
  }
  // bProgress();
  
  // 插件进度条初始化
  function pProgressInit(){
    // 进图条插件
    var options = {
       speed: 20,
       limit: 100,
       onComplete: function(pro_val){
        // console.log(pro_val); pro_val：进度值
        $("#progress").hide();
        $('#mainmenu').show();
       }
    };
    var myplugin = $('#progress').cprogress(options);
    myplugin.start();
  }
  // pProgressInit();
  
  // 规则面板数据初始化
  function ruleDataInit(){
    var $rule = $('#rule');
    var _item_htmls = '';
    var _item_html = '';
    var rule_data = null;
    $rule.empty();

    if(rule_datas && rule_datas.length > 0){
      // 加载 规则菜单 dom
      for(var i = 0, len = rule_datas.length; i < len; i++){
        rule_data = rule_datas[i];
        _item_html = '<a href="##" class="list-group-item list-group-item-warning">' + 
          '<img class="pull-left list-item-img" src="' + rule_data.icon_src + '" alt="' + rule_data.title + '" >' + 
          '<h3 class="list-group-item-heading">' + rule_data.title + '</h3>' + 
          '<p class="list-group-item-text">' + rule_data.content + '<span class="badge pull-right">点击查看全部</span></p>' + 
        '</a>';
        _item_htmls += _item_html;
      }
      $rule.append(_item_htmls);

    }else{
      $rule.html('数据异常！');
    }
  }

  $("#start").hide();
  $('#mainmenu').show();
  ruleDataInit();
  

  // $("#heros").click(function(){
  // window.location.href="herosMainPage/heros.html";
  // }); //end click function()
  // $("#card").click(function(){
  // window.location.href="herosMainPage/card.html";
  // });
  // $("#rule").click(function(){
  // window.location.href="herosMainPage/rule.html";
  // });
  //  $("#strategy").click(function(){
  // window.location.href="herosMainPage/strategy.html";
  // });
  
});