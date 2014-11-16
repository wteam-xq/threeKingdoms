//页面加载后执行， dom 加载完成
$(document).ready(function(){

  var $window = $(window);
  var $mainmenu = $('#mainmenu');
  var $heros = $('#heros');
  var $rule = $('#rule');
  var $card = $('#card');
  var $strategy = $('#strategy');
  var $searchInfo = $('#search-info');
  // 武将页面最后dom 偏移值
  var dom_off_top = 0;
  
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
        $('#progress').hide();

        $('#mainmenu').show();
        createGroupItem(rule_datas, $rule );
        createGroupItem(card_datas, $card );
        createToggleBtn(str_datas, $strategy );
        createDropdownMenu(heros_datas, $heros);
       }
    };
    var myplugin = $('#progress').cprogress(options);
    myplugin.start();
  }
  
  
  try{
    document.createElement('canvas').getContext('2d');
    // pProgressInit();
    $('#progress').hide();
    $mainmenu.show();
    createGroupItem(rule_datas, $rule );
    createGroupItem(card_datas, $card );
    createToggleBtn(str_datas, $strategy );
    createDropdownMenu(heros_datas, $heros);
    createHerosList($heros);

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

  }catch(e){
    $('#progress').hide();
    $('#noCanvasTips').show();
  }
  // 添加加载图标
  function addLoading($target){
    if ($target == null){
      return false
    }
    var _html_str = '<div class="col-md-12 col-xs-12 loading-cont"><div class="loading-ico"></div></div>';
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
  function createHerosList($target){
    // heros_array 全局变量
    var herosDatas = heros_array[0];
    var herosTypes = drMenu_type_datas.package.slice(1);
    var list_datas = getHerosGroupDatas(herosDatas, herosTypes);
    var _html_str = '';
    var list_dom_datas = null;
    //说明当前显示项
    _html_str = '<div class="items-type col-xs-12 col-md-12">' + '蜀国' + '全部武将</div>';
    $target.append(_html_str);

    _html_str = '<div class="heros-list col-xs-12 col-md-12"></div>';
    $target.append(_html_str);
    
    createToggleBtn(list_datas, $target.find('.heros-list') );

    //按需加载变量
    list_dom_datas = {
      'datas': herosDatas,
      'types': herosTypes
    };
    dom_off_top = $target.find('.str-btn:last').offset().top;
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
  }
  // 监听用户输入文字
  function watchInputEvent(){
    var $this = $(this);
    var $backIndex = $this.parent().next('#back-index');
    if ($this.val().length == 0){
      $backIndex.attr('data-btntype', 'cancel');
      $backIndex.text('取消');
    }else if($backIndex.attr('data-btntype') == 'cancel'){
      $backIndex.attr('data-btntype', 'search');
      $backIndex.text('搜索');
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

    if ($body.scrollTop() >= 150){
      // $toTop.show();
      $toTop.addClass('showme');
    }else{
      // $toTop.hide();
      $toTop.removeClass('showme');
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
    var $dropdown_menu = null;

    if (datas == null || datas.length == 0){
      return $target_dom;
    }
    $target_dom.empty();
    _item_html = '<div class="heros-dropdownmenu"></div>';
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

});