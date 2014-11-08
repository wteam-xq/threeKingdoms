//页面加载后执行， dom 加载完成
$(document).ready(function(){
  
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
          '<p class="list-group-item-text">' + item_data.content + '</p>' + 
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
    var $app_btn = null;

    if(datas == null || datas.length == 0){
      return $target_dom;
    }
    $target_dom.empty();

    for(var k = 0, list_len = datas.length; k < list_len; k++){
      item_data = datas[k];
      if (item_data && item_data.array_datas){
        _item_html = '<div class="str-btn dropup">' + 
          '<div class="btn btn-block btn-lg btn-app">' + item_data.group_name + 
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
    $app_btn = $target_dom.find('.btn-app');

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

  // 生成 dropdown-menu 的UI项
  function createMenuUl(_datas, $target_dom){
    var $result = null;
    var _html = ''; 
    var _data = null;
    if (_datas == null || _datas.length == 0){
      return $result;
    }
    _html = '<ul class="dropdown-menu tkd-dropdown-menu" role="menu" aria-labelledby="class_type">';
    for(var i = 0, len = _datas.length; i < len; i++){
      _data = _datas[i];
      _html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" id="' + _data.id + '">' + _data.title + '</a></li>'
      if ( i + 1 < len) {
        _html += '<li role="presentation" class="divider"></li>';
      }
    }
    _html += '</ul>';
    $result = $(_html);
    $target_dom.append($result)
    dropdownMenuEvent($target_dom);
    return $target_dom;
  }
  // 生成武将菜单项dom
  function createDropdownMenu(datas, $target_dom){
    var data_item = null;
    var _item_html = '';
    var $item_html = null
    var _item_htmls = '';
    var data_item_array = [];
    var pull_left_right = 'pull-left';

    if (datas == null || datas.length == 0){
      return $target_dom;
    }
    $target_dom.empty();
    for(var i = 0, len = datas.length; i < len; i++){
      data_item = datas[i];
      data_item_array = data_item.datas || [];
      pull_left_right = (i % 2 == 0)?'pull-left':'pull-right';
      if (data_item_array.length > 0){
        _item_html = '<div class="dropdown ' + pull_left_right + ' col-xs-12 col-md-4">' + 
          '<button class="btn btn-pairs btn-lg dropdown-toggle" type="button" id="' + data_item.id + '" data-toggle="dropdown">' + 
            data_item.title + 
            '<span class="caret"></span>'
          '</button>' + 
        '</div>';
        $item_html = $(_item_html);
        createMenuUl(data_item_array, $item_html)
        $target_dom.append($item_html);
      }
    }

    return $target_dom;
  }
  // dropdownmenu 点击事件
  function dropdownMenuEvent($target_dom){
    
    var $li_a = $target_dom.find('li > a');

    $li_a.on('click', function(){
      var $this = $(this);
      var _id = this.id;
      var _type = /drmenu/.test(_id)?'drmenu':/country/.test(_id)?'country':'package'
      var $ul_parent = $this.parents('div.tab-pane:first');
      switch(_type){
        case 'drmenu':
          drmenuEvent(_id, $ul_parent);
          break;
        case 'package':
          packageEvent(_id, $ul_parent);
          break;
        case 'country':
          countryEvent(_id, $ul_parent);
          break;
        default:
          return false;
          break;
      }
    });
    return $target_dom;
  }
  // drmenu li点击事件
  function drmenuEvent(_id, $target_dom){
    var drmenu_name = ''; 
    var _datas = [];
    var $influDrmenu = null;
    var current_name = '';

    if (_id == null){
      return false;
    }
    drmenu_name = _id.replace('drmenu_', '');
    //drMenu_type_datas 为全局变量
    _datas = drMenu_type_datas[drmenu_name];
    if (_datas.length > 0){
      $influDrmenu = $target_dom.find('.dropdown:eq(1)');
      current_name = $influDrmenu.find('a:first').attr('id').split('_')[0];
      // 如果点选的为当前类型， 不切换
      if (current_name === drmenu_name){
        return false;
      }
      $influDrmenu.find('ul').remove();
      createMenuUl(_datas, $influDrmenu);
    }
    return true;
  }
  function packageEvent(_id, $target_dom){
    console.log('packageEvent');
  }
  function countryEvent(_id, $target_dom){
    console.log('countryEvent');
  }

  var $heros = $('#heros');
  $("#start").hide();
  $('#mainmenu').show();
  createGroupItem(rule_datas, $('#rule') );
  createGroupItem(card_datas, $('#card') );
  createToggleBtn(str_datas, $('#strategy') );
  createDropdownMenu(heros_datas, $heros)
  
});