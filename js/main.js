var PACKAGE_AMOUNT = 7;

//页面加载后执行， dom 加载完成
$(document).ready(function(){

  var $window = $(window);
  var $mainmenu = $('#mainmenu');
  var $heros = $('#heros');
  var $rule = $('#rule');
  var $card = $('#card');
  var $strategy = $('#strategy');
  var $searchInfo = $('#search-info');
  
  // 插件进度条初始化
  function pProgressInit(){
    $('body').css({'background-color':'#000'});
    // 进图条插件
    var options = {
       speed: 20,
       limit: 100,
       onComplete: function(){
        // 隐藏进度条，背景颜色变更
        $('body').css({'background-color':'#fff'});
        // 启动函数
       }
    };
    var myplugin = $('#progress').cprogress(options);
    myplugin.start();
  }
  
  try{
    document.createElement('canvas').getContext('2d');
  }catch(e){
    $('#progress').hide();
    $('#noCanvasTips').show();
    return false;
  }
  // pProgressInit();
  $('#progress').hide();
  $mainmenu.show();
  createGroupItem(rule_datas, $rule );
  createGroupItem(card_datas, $card );
  createToggleBtn({'datas':str_datas, '$target_dom':$strategy});
  createDropdownMenu(heros_datas, $heros);
  // 获得 风火山林 包 package_array(全局变量)
  package_array = getPackagesDatas();
  // 默认显示 “三国鼎立” “蜀国”
  createHerosList('country_shu', $heros);

  // 定义基本事件
  $mainmenu.find('#to-person-info').on('click',logoEvent);
  $('input.input-search').on('focus', toSearchEvent);
  $('#backtotop').on('click', toTop);
  // 滚动监听
  $window.scroll(scrollSpyEvent);
  //搜索框点击事件
  $searchInfo.find('.search-close').on('click', removeSearchEvent);
  $searchInfo.find('input').on('input', watchInputEvent);
  $searchInfo.find('#back-index').on('click', searchBtnEvent);

  // 添加加载图标
  function addLoading($target){
    if ($target == null && $target.find('div.loading-cont').length > 0){
      return false
    }
    var _html_str = '<div class="loading-cont"><div class="loading-ico"></div></div>';
    $target.append(_html_str);
    return true;
  }
  // 取消加载图标
  function removeLoading($target){
    if ($target == null){
      return false
    }
    $target.find('.loading-cont').remove();
    return true;
  }
  // 生成武将列表
  function createHerosList(package_name ,$target){
    // heros_array drMenu_type_datas 全局变量
    var herosDatas = [];
    var herosTypes = [];
    var list_datas = [];
    var _title = '';
    var _type = '';
    // 按需加载， 只显示一部分数据
    var datas_len = 0;
    var _index = 0;
    var _html_str = '';
    var list_dom_datas = null;

    _type = package_name.split('_')[0];
    switch (_type){
      case 'package':
        _title = package_title[package_name];
        for(name in package_title){
          if (package_name ==  name) {
            break;
          }
          _index++;
        }
        if (_index == package_array.length){
          // 合并数据
          herosDatas = package_array;
        }else{
          herosDatas = package_array[_index];
        }
        herosTypes = drMenu_type_datas.country.slice(1);
        break;
      case 'country':
        _title = country_title[package_name];
        for(name in country_title){
          if (package_name ==  name) {
            break;
          }
          _index++;
        }
        if (_index == heros_array.length){
          herosDatas = heros_array;
        }else{
          herosDatas = heros_array[_index];
        }
        herosTypes = drMenu_type_datas.package.slice(1);
        break;
      default:
        _title = '莫名武将';
        break;
    }

    datas_len = parseInt(herosDatas.length/2);
    list_datas = getHerosGroupDatas(herosDatas.slice(0, datas_len), herosTypes.slice(0, datas_len))
    //说明当前显示项
    _html_str = '<div class="items-type" id="items-type" data-cur-name="country_shu">' + _title + '</div>';
    $target.append(_html_str);

    _html_str = '<div class="heros-list"></div>';
    $target.append(_html_str);
    
    createToggleBtn({'datas':list_datas, '$target_dom':$target.find('.heros-list') });

    //按需加载变量
    list_dom_datas = {
      'datas': herosDatas,
      'types': herosTypes,
      'allshow':false
    };
    
    $target.find('.heros-list').data('dom-datas', list_dom_datas);
    return true;
  }
  // 获得武将列表显示数据
  function getHerosGroupDatas(herosDatas, herosTypes){
    var _result = [];
    var _data_item = null;
    var _type_item = null;
    var _result_item = null;

    if (herosDatas.length == 0 || herosTypes.length == 0 || herosDatas.length != herosTypes.length){
      return _result;
    }
    for(var i = 0, len = herosDatas.length; i < len; i++){
      _data_item = herosDatas[i];
      _type_item = herosTypes[i];
      _result_item = {
        group_name: _type_item.title,
        id: _type_item.id,
        array_datas: _data_item
      }
      _result.push(_result_item);
    }
    return _result;
  }
  // 获得“风火山林”数据
  function getPackagesDatas(){
    var _result = [];
    var _three_item = [];
    var _package_item = [];

    if (heros_array.length == 0){
      return _result;
    }
    _result = new Array(7);

    for(var i = 0, len = heros_array.length; i < len; i++){
      _three_item = heros_array[i];
      if ( _three_item.length != PACKAGE_AMOUNT ){
        console.log('索引为' + i + '的国家包异常!');
        continue;
      }
      for (var j = 0, jLen = _result.length; j < jLen; j++){
        _package_item = _result[j];
        if (_package_item == null || _package_item.legth == 0){
          _package_item = [];
        }
        _package_item.push(_three_item[j]);
        _result[j] = _package_item;
      }
    }
    return _result;
  }
  // 删除搜索文字
  function removeSearchEvent(){
    var $this = $(this);
    var $searchInput = $this.prev('input');
    var $backIndex = $this.parent().next('#back-index');
    if ($searchInput.val() == ''){
      return false;
    }
    $searchInput.val('');
    $backIndex.attr('data-btntype', 'cancel');
    $backIndex.text('取消');
    $this.addClass('hidden');
  }
  // 监听用户输入文字
  function watchInputEvent(){
    var $this = $(this);
    var $closeBtn = $this.next('.search-close');
    var $backIndex = $this.parent().next('#back-index');
    if ($this.val().length == 0){
      $backIndex.attr('data-btntype', 'cancel');
      $backIndex.text('取消');
      if (!$closeBtn.hasClass('hidden')){
        $closeBtn.addClass('hidden');
      }
    }else if($backIndex.attr('data-btntype') == 'cancel'){
      $backIndex.attr('data-btntype', 'search');
      $backIndex.text('搜索');
      $closeBtn.removeClass('hidden');
      return false;
    }
  }
  //搜索页面 按钮点击
  function searchBtnEvent(){
    var $this = $(this);
    var _type = $this.attr('data-btntype');
    if (_type == 'search'){
      console.log('搜索数据');
    }else if (_type == 'cancel'){
      console.log('返回上级页面');
    }
  }
  // logo点击事件
  function logoEvent(){
    var $main = $('#mainmenu'); 
    var $target = $('#person-info');
    gotoPage($target, $main);
  }
  // 进入搜索页面
  function toSearchEvent(){
    var $target = $('#search-info');
    var $this = $(this);
    var parent_id = $this.attr('data-parentId');
    var $main = $('#' + parent_id);
    gotoPage($target, $main);
  }
  // 滚动监听
  function scrollSpyEvent(){
    var $body = $('body');
    var $toTop = $body.find('#backtotop');
    var $heros_list = null;
    var _dom_datas = null;
    var _datas_len = 0;
    var _list_datas = [];
    // 判断滚动条是否到达底部
    var _scroll_bottom = false;
    var _has_loading = false;

    // 置顶图标的出现或消失
    if ($body.scrollTop() >= 150){
      $toTop.addClass('showme');
    }else{
      $toTop.removeClass('showme');
    }

    // 武将页面 “按需加载” 监听
    if ( $heros.is(':visible') ){
      $heros_list = $heros.find('div.heros-list');
      _dom_datas = $heros_list.data('dom-datas');
      // 滚动条到达底部
      // alert('测试： $document.scrollTop:' + $(document).scrollTop() + '\n' + 
      //   '$document.height: ' + $(document).height() + '\n' + 
      //   '$window.height: ' + $(window).height() + '\n' + 
      //   'dH - wH: ' + ($(document).height() - $(window).height()) );

      _scroll_bottom = ( ($(document).scrollTop() + 50) >= $(document).height() - $(window).height() )?true:false;
      _has_loading = $heros_list.find('div.loading-cont').length > 0?true:false;
      if (_scroll_bottom && _dom_datas && !_dom_datas.allshow && !_has_loading){
        _datas_len = parseInt(_dom_datas.datas.length/2);
        addLoading($heros_list);
        _list_datas = getHerosGroupDatas(_dom_datas.datas.slice(_datas_len), _dom_datas.types.slice(_datas_len));
        setTimeout(function(){
          removeLoading($heros_list);
          createToggleBtn({'datas':_list_datas, '$target_dom':$heros_list, 'is_empty': false});
          _dom_datas.allshow = true;
        }, 1000);
      }
    }
  }
  // 滚动条置顶
  function toTop(){
    window.scrollTo(0,0);
  }
  // 公用滑屏事件 打开、关闭
  function gotoPage($target, $main){
    if ($target == null || $main == null){
      return false;
    }
    var back_event = function(){
      closePage($target, $main);
    }
    
    var $backIco = $target.find('#back-index');

    openPage($target, $main);
    // 配置返回页面事件
    if ( $target.attr('data-backEvent') != 'true'){
      $backIco.on('click', back_event);
      $target.attr('data-backEvent', 'true');
    }else{
      // 去除已存在的事件
      $backIco.off('click');
      $backIco.on('click', back_event);
    }
  }
  function openPage($target, $main){
    if ($target == null || $main == null){
      return false;
    }
    $main.animate({'margin-left': '-' + $main.css('width')}, 200, function(){
      var $this = $(this);
      $this.hide();
      $this.css('margin-left', '0px');
    });

    $target.css('margin-left', $target.css('width'));
    // $target.css({'position':'absolute', 'left': $target.css('width')});
    $target.show();
    $target.animate({'margin-left':'0px'}, 200, function(){});
    // $target.animate({'left':'0px'}, 500, function(){});
  }
  function closePage($target, $main){
    if ($target == null || $main == null){
      return false;
    }
    var $backIco = $target.find('#back-index');
    if ($backIco.attr('data-btntype') != 'cancel'){
      return false;
    }
    $main.css('margin-left', '-' + $main.css('width'));
    $main.show();
    $main.animate({'margin-left':'0px'}, 200, function(){
    });

    $target.animate({'margin-left': $target.css('width')}, 200, function(){
      var $this = $(this);
      $this.hide();
      $this.css('margin-left', '0px');
    });
  }

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
  function createToggleBtn(options){
    var setting = {
      'datas': [],
      '$target_dom': null,
      'is_empty': true
    };
    var _item_html = '';
    var $item_list = null;
    var item_data = null;
    var $app_btn = null;
    $.extend(setting, options);
    

    if(setting.datas == null || setting.datas.length == 0){
      return setting.$target_dom;
    }
    if (setting.is_empty && setting.$target_dom){
      setting.$target_dom.empty();
    }

    for(var k = 0, list_len = setting.datas.length; k < list_len; k++){
      item_data = setting.datas[k];
      if (item_data && item_data.array_datas && item_data.array_datas.length > 0){
        _item_html = '<div class="str-btn dropup">' + 
          '<div class="btn btn-block btn-lg btn-app">' + item_data.group_name + 
            '<span class="caret"></span>' + 
          '</div>' +
          '<div role="tabpanel" class="list-group tab-pane fade rule active in" id="str_' + item_data.id + '"></div>' +
        '</div>';
        $item_list = $(_item_html);
        setting.$target_dom.append($item_list);
        createGroupItem( item_data.array_datas, $item_list.find('#str_' + item_data.id) );
      }
    } 
    // 生成toggle 面板 按钮
    $app_btn = setting.$target_dom.find('.btn-app');
    // 先去除原有click事件
    $app_btn.off('click');

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
    return setting.$target_dom;
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
    var $dropdown_menu = null;

    if (datas == null || datas.length == 0){
      return $target_dom;
    }
    $target_dom.empty();
    _item_html = '<div class="heros-dropdownmenu row"></div>';
    $target_dom.append(_item_html);
    $dropdown_menu = $target_dom.find('.heros-dropdownmenu');

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
        $dropdown_menu.append($item_html);
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
          drmenuLeftEvent(_id, $ul_parent);
          break;
        case 'package':
          drmenuRightEvent(_id, $ul_parent, 'package');
          break;
        case 'country':
          drmenuRightEvent(_id, $ul_parent, 'country');
          break;
        default:
          return false;
          break;
      }
    });
    return $target_dom;
  }
  // drmenu li点击事件
  function drmenuLeftEvent(_id, $target_dom){
    var drmenu_name = ''; 
    var current_name = '';
    var item_title = '';
    var $influDrmenu = null;
    var $package_title = null;
    var _datas = [];

    if (_id == null){
      return false;
    }
    drmenu_name = _id.replace('drmenu_', '');
    item_title = drmenu_name + '_all';
    //drMenu_type_datas 为全局变量
    _datas = drMenu_type_datas[drmenu_name];
    if (_datas.length > 0){
      $influDrmenu = $target_dom.find('.dropdown:eq(1)');
      $package_title = $target_dom.find('#items-type');
      current_name = $package_title.attr('data-cur-name');
      // 如果点选的为当前类型， 不切换
      if (current_name === item_title){
        return false;
      }
      // 更改标题名称
      $package_title.html('全部武将').attr('data-cur-name', item_title);
      $influDrmenu.find('ul').remove();
      createMenuUl(_datas, $influDrmenu);
    }
    return true;
  }
  // _type 类型： 1.package 包  2. country 国家
  function drmenuRightEvent(_id, $target_dom, _type){
    var _title = '';
    var $package_title = $target_dom.find('#items-type');
    var current_name = '';

    current_name = $package_title.attr('data-cur-name');
    // 如果点选的为当前类型， 不切换
    if (current_name === _id){
      return false;
    }
    switch (_type){
      case 'package':
        _title = package_title[_id];
        break;
      case 'country':
        _title = country_title[_id];
        break;
      default:
        _title = '莫名武将';
        break;
    }
    $package_title.html(_title).attr('data-cur-name', _id);
  }

});