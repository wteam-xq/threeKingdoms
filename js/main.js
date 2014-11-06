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

  // 主菜单列表html生成
  function createGroupItem(datas, $target_dom){
    var _item_htmls = '';
    var _item_html = '';
    var item_data = null;
    $target_dom.empty();

    if(datas && datas.length > 0){
      // 加载 规则菜单 dom
      for(var i = 0, len = datas.length; i < len; i++){
        item_data = datas[i];
        _item_html = '<a href="##" class="list-group-item list-group-item-warning">' + 
          '<img class="pull-left list-item-img" src="' + item_data.icon_src + '" alt="' + item_data.title + '" >' + 
          '<h3 class="list-group-item-heading">' + item_data.title + '</h3>' + 
          '<p class="list-group-item-text">' + item_data.content + '<span class="badge pull-right">点击查看全部</span></p>' + 
        '</a>';
        _item_htmls += _item_html;
      }
      $target_dom.append(_item_htmls);
      return $target_dom;
    }else{
      $target_dom.html('数据异常！');
      return $target_dom;
    }
  }

  // 生成toggle 面板 按钮
  function createToggleBtn(datas, $target_dom){
    
    var _item_html = '';
    var $item_list = null;
    var item_data = null;

    if(datas == null || datas.length == 0){
      return $target_dom;
    }
    $target_dom.empty();

    for(var k = 0, list_len = datas.length; k < list_len; k++){
      item_data = datas[k];
      if (item_data && item_data.array_datas){
        _item_html = '<div class="str-btn dropup">' + 
          '<div class="btn btn-block btn-lg app-btn">' + item_data.group_name + 
            '<span class="caret"></span>' + 
          '</div>' +
          '<div role="tabpanel" class="list-group tab-pane fade rule active in" id="str_' + item_data.id + '"></div>' +
        '</div>';
        $item_list = $(_item_html);
        $target_dom.append($item_list);
        createGroupItem( item_data.array_datas, $item_list.find('#str_' + item_data.id) );
      }
    } 
    // 生成toggle 面板 按钮
    var $app_btn = $target_dom.find('.app-btn');

    $app_btn.on('click', function(){
      var $this = $(this);
      var $parent = $this.parent();
      if($parent.hasClass('dropup')){
        $parent.removeClass('dropup');
        $parent.find('.list-group').slideUp();
      }else{
        $parent.addClass('dropup');
        $parent.find('.list-group').slideDown();
      }
    });
    return $target_dom;
  }

  $("#start").hide();
  $('#mainmenu').show();
  createGroupItem(rule_datas, $('#rule') );
  createGroupItem(card_datas, $('#card') );
  createToggleBtn(str_datas, $('#strategy') );
  

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