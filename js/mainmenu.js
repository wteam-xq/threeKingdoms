var PACKAGE_AMOUNT = 7;
// 搜索内容
var search_array = [{'key':'应用信息','type':'appInfo','id':'author'},{'key':'1V1规则','type':'rule','id':'onevone'},{'key':'3V3规则','type':'rule','id':'threevthree'},{'key':'身份局规则','type':'rule','id':'status'},{'key':'国战规则','type':'rule','id':'royal'},{'key':'虎牢关规则','type':'rule','id':'hlg'},{'key':'转世规则','type':'rule','id':'relive'},{'key':'基本牌','type':'card','id':'basic'},{'key':'锦囊牌','type':'card','id':'kit'},{'key':'体力牌','type':'card','id':'physic'},{'key':'身份牌','type':'card','id':'status'},{'key':'装备牌','type':'card','id':'weapon'},{'key':'武将牌','type':'card','id':'heros'}];

//页面加载后执行， dom 加载完成
$(document).ready(function(){

  var $window = $(window);
  var $body = $('body');
  var $mainmenu = $('#mainmenu');
  var $heros = $('#heros');
  var $rule = $('#rule');
  var $card = $('#card');
  var $strategy = $('#strategy');
  var $searchInfo = $('#search-info');
  
  init();

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
        // init();
       }
    };
    var myplugin = $('#progress').cprogress(options);
    myplugin.start();
  }

  // 初始化函数
  function init(){
    // 浏览器兼容处理
    try{
      document.createElement('canvas').getContext('2d');
    }catch(e){
      $('#progress').hide();
      $('#noCanvasTips').show();
      return false;
    }

    $('#progress').hide();
    $mainmenu.show();
    createGroupItem({'datas': rule_datas, '$target_dom': $rule, 'click_fn': showDetail});
    createGroupItem({'datas': card_datas, '$target_dom': $card});
    createDropdownMenu(heros_datas, $heros);
    createToggleBtn({'datas':str_datas, '$target_dom':$strategy});
    // 获得 风火山林 包 package_array(全局变量)
    package_array = getPackagesDatas();
    // 默认显示 “三国鼎立” “蜀国”
    createHerosList('country_shu', $heros);
    // 定义基本事件
    $mainmenu.find('#to-person-info').on('click',logoEvent);
    // 用on 代替 live 
    $body.on('focus', 'input.input-search', toSearchEvent);
    $('#backtotop').on('click', toTop);
    // 滚动监听
    $window.scroll(watchScrollEvent);
    //搜索框点击事件
    $searchInfo.find('.search-close').on('click', removeSearchEvent);
    $searchInfo.find('input').on('input', watchInputEvent);
    $searchInfo.find('#search-submit').on('click', searchBtnEvent);
  }
  
  //rule 页面点击事件
  function showDetail(){
    var $this = $(this);
    var $detailPanel = null;
    var $main = null;
    var _datas = [];
    var _parent_id = '';
    var _detail_id = '';
    var _html = '';
    var _data_item = null;

    _datas = $this.data('item-data');
    if (_datas == null || _datas.length == 0){
      return false;
    }
    _parent_id = $this.parents('div.tab-pane').attr('id');
    _detail_id = _parent_id + '-detail';
    $detailPanel = $('#' + _detail_id);
    $main = $this.parents('div.main-panel');
    createAppHead($detailPanel);

    _html = '<div class="panel panel-warning"><div class="panel-heading"></div><div class="panel-body"></div></div>';
    $detailPanel.append(_html);

    _html = '';
    for (var i = 0, len = _datas.length; i < len; i++){
      _data_item = _datas[i];
      if (i == 0){
        $detailPanel.find('div.panel-heading').html(_data_item.p);
        continue;
      }
      if (_data_item.img){
        _html += '<div class="thumbnail"><img src="' + _data_item.img + '" alt="..."></div>';
        continue;
      }
      _html += '<div>' + _data_item.p +'</div>';
    }
    $detailPanel.find('div.panel-body').append(_html);
    // $detailPanel.css('height', $window.height() + 'px');
    gotoPage($detailPanel, $main);
    $detailPanel.css('padding-top', $detailPanel.find('div.tkd-navbar').css('height') );
  }  
  //生成 次级页面 头部html
  function createAppHead($target_dom){
    var p_id = '';
    var _html = '';

    if ($target_dom == null){
      return false;
    }
    p_id = $target_dom.attr('id');
    _html = '<div class="tkd-navbar navbar navbar-default row"role="navigation"><div class="navbar-header col-xs-5 col-md-3 pull-left"><a href="##"class="navbar-brand logo-brand"><span class="glyphicon glyphicon-chevron-left back-ico"data-btntype="cancel"id="back-index"></span></a></div><form class="navbar-form navbar-right col-xs-7 col-md-4 row"role="search"><div class="form-group pull-left col-xs-12"><span class="glyphicon glyphicon-search tkd-search"></span><input type="text"data-parentId="'+ p_id +'"class="form-control pull-right input-search"placeholder="搜索卡牌、攻略、规则"></div></form></div>';
    $target_dom.empty();
    $target_dom.append(_html);
    return $target_dom;
  } 
  
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
  //根据包名获得武将数据
  function getHerosDatasByName(package_name){
    var _result = null;
    var _herosDatas = [];
    var _herosTypes = [];
    var _type = '';
    var _title = '';
    var _index = 0;

    if (package_name == null || package_name == ''){
      return _result;
    }

    // package_title country_title package_array heros_array drMenu_type_datas全局变量
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
          // 数组降维
          _herosDatas = arrayReDimensions(package_array);
        }else{
          _herosDatas = package_array[_index];
        }
        _herosTypes = drMenu_type_datas.country.slice(1);
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
          _herosDatas = arrayReDimensions(heros_array);
        }else{
          _herosDatas = heros_array[_index];
        }
        _herosTypes = drMenu_type_datas.package.slice(1);
        break;
      default:
        _title = '莫名武将';
        break;
    }
    if (_herosDatas.length > 0 ){
      _result = {
        'title': _title,
        'herosDatas': _herosDatas,
        'herosTypes': _herosTypes
      }
    }
    return _result;
  }

  // 生成武将列表
  function createHerosList(package_name ,$target){
    // heros_array drMenu_type_datas 全局变量
    var herosDatas = [];
    var herosTypes = [];
    var list_datas = [];
    var title = '';
    // 按需加载， 只显示一部分数据
    var datas_len = 0;
    var _html_str = '';
    var list_dom_datas = null;
    var package_heros_datas = null;

    package_heros_datas = getHerosDatasByName(package_name);
    if (package_heros_datas == null){
      return false;
    }
    title = package_heros_datas.title;
    herosDatas = package_heros_datas.herosDatas;
    herosTypes = package_heros_datas.herosTypes;

    datas_len = parseInt(herosDatas.length/2);
    list_datas = getHerosGroupDatas(herosDatas.slice(0, datas_len), herosTypes.slice(0, datas_len));
    //说明当前显示项
    _html_str = '<div class="items-type" id="items-type" data-cur-name="' + package_name + '">' + title + '</div>';
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
  // 数组降维(只适用于维度2+以上的数组)
  function arrayReDimensions(array){
    var _result = [];
    var _array_item = [];

    if (array == null || array.length == 0){
      return _result;
    }

    _result = array[0].slice(0);
    for (var i = 1, len = array.length; i < len; i++){
      _array_item = array[i];
      for (var j = 0, jLen = _array_item.length; j < jLen; j++){
        _result[j] = _result[j].concat(_array_item[j]);
      }
    }
    return _result;
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
    var $backIndex = $this.parents('.navbar').find('#back-index');
    var $searchSubmit = $this.parents('.navbar').find('#search-submit');
    if ($searchInput.val() == ''){
      return false;
    }
    $searchInput.val('');
    $backIndex.show();
    $searchSubmit.hide();
    $this.addClass('hidden');
  }
  // 监听用户输入文字
  function watchInputEvent(){
    var $this = $(this);
    var $closeBtn = $this.next('.search-close');
    var $backIndex = $this.parents('.navbar').find('#back-index');
    var $searchSubmit = $this.parents('.navbar').find('#search-submit');

    if ($this.val().length == 0){
      $backIndex.show();
      $searchSubmit.hide();
      if (!$closeBtn.hasClass('hidden')){
        $closeBtn.addClass('hidden');
      }
    }else if( $backIndex.is(':visible') ){
      $backIndex.hide();
      $searchSubmit.show();
      $closeBtn.removeClass('hidden');
      return false;
    }
  }
  //搜索页面 按钮点击
  function searchBtnEvent(){
    var $this = $(this);
    var val = '';

    val = $this.prevAll('.form-group').find('input').val();
    searchEvent(val);
  }
  // 点击搜索按钮 事件
  function searchEvent(val){
    var filter_array = [];
    var search_item = null;
    var $searchList = $('#search-info').find('div.search-list');
    var _has_loading = false;
    var _old_key = '';

    if (val == null || val == ''){
      return false;
    }
    _old_key = $searchList.data('old-key');
    if (_old_key == val){
      return false;
    }
    //  search_array 为全局变量
    for (var i = 0, len = search_array.length; i < len; i++){
      search_item = search_array[i];
      if ( search_item.key.search(new RegExp(val,"i")) != -1){
        filter_array.push(search_item);
      }
    }

    _has_loading = $searchList.find('div.loading-cont').length > 0?true:false;
    if (!_has_loading){
      $searchList.data('old-key', val);
      $searchList.empty();
      addLoading($searchList);

      if (filter_array.length > 0){
        setTimeout(function(){
          removeLoading($searchList);
          createListGroup(filter_array, $searchList);
        }, 500);
      }else{
        setTimeout(function(){
          removeLoading($searchList);
          $searchList.empty();
          $searchList.append('<div class="search-tips"><strong>所搜内容为空！</strong></div>');
        }, 500);
      }
    }
    return true;
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
  function watchScrollEvent(){
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
    $main.animate({'margin-left': '-' + $main.css('width')}, 500, function(){
      var $this = $(this);
      $this.hide();
      $this.css('margin-left', '0px');
    });

    $target.css('width', $target.css('width'));
    $target.css('margin-left', $target.css('width'));
    $target.show();
    $target.animate({'margin-left':'0px'}, 500, function(){
      $(this).css('width', '100%');
    });
  }
  function closePage($target, $main){
    if ($target == null || $main == null){
      return false;
    }
    var $backIco = $target.find('#back-index');
    
    $main.css('margin-left', '-' + $main.css('width'));
    $main.show();
    $main.animate({'margin-left':'0px'}, 500, function(){
    });
    $target.css('width', $target.css('width'));
    $target.animate({'margin-left': $target.css('width')}, 500, function(){
      var $this = $(this);
      $this.hide();
      $this.css({'margin-left':'0px', 'width':'100%'});
    });
  }

  // 主菜单列表html生成
  function createGroupItem(options){
    var _item_htmls = '';
    var _item_html = '';
    var item_data = null;
    var $target_dom = null;
    var click_fn = null;
    var datas = [];
    var setting = {
      'datas': [],
      '$target_dom': null,
      'click_fn': null
    };
    $.extend(setting, options);

    datas = setting.datas;
    $target_dom = setting.$target_dom;
    click_fn = setting.click_fn;

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

      // 点击事件添加
      if (click_fn != null){
        // 添加数据
        $target_dom.find('a.list-group-item').each(function(i){
          var $this = $(this);
          var dataObj = datas[i].data;
          $this.data('item-data', dataObj);
          $this.on('click', click_fn);
        });
      }
      return $target_dom;
    }else{
      $target_dom.html('数据异常！');
      return $target_dom;
    }
  }
  
  // 普通列表HTML生成(带点击事件)
  function createListGroup(datas, $target_dom){
    if (datas == null || $target_dom == null){
      return false;
    }
    var _item_htmls = '';
    var _item_html = '';
    var item_data = null;

    $target_dom.empty();
    if(datas && datas.length > 0){
      // 加载 规则菜单 dom
      _item_htmls = '<div class="list-group">';
      for(var i = 0, len = datas.length; i < len; i++){
        item_data = datas[i];
        _item_html = '<a href="##" data-type="'+ item_data.type +'" data-id="'+ item_data.id +'" class="list-group-item list-group-item-warning">' + 
          item_data.key +
        '</a>';
        _item_htmls += _item_html;
      }
      _item_htmls += '</div>';

      $target_dom.append(_item_htmls);
      $target_dom.find('a').on('click', listClickEvent);
      return $target_dom;
    }else{
      $target_dom.html('数据异常！');
      return $target_dom;
    }

    function listClickEvent(){
      var $this = $(this);
      var _type = $this.attr('data-type');
      var _id = $this.attr('data-id');
      //对应处理
      console.log('data-type: ' + _type + '\n' +
        'data-id: ' + _id + '\n'
      );
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
        createGroupItem( {'datas': item_data.array_datas, '$target_dom': $item_list.find('#str_' + item_data.id)} );
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
        case 'country':
          drmenuRightEvent(_id, $ul_parent);
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
      $influDrmenu.find('ul').remove();
      createMenuUl(_datas, $influDrmenu);

      // $package_title.html('全部武将').attr('data-cur-name', item_title);
      drmenuRightEvent(item_title, $target_dom);
    }
    return true;
  }
  // drmenu li点击事件
  function drmenuRightEvent(_id, $target_dom){
    var title = '';
    var current_name = '';
    var pacakge_heros_datas = null;
    var list_dom_datas = null;
    var $package_title = $target_dom.find('#items-type');
    var $heros_list = $target_dom.find('div.heros-list');
    var list_datas = [];
    var herosDatas = [];
    var herosTypes = [];
    var datas_len = 0;

    current_name = $package_title.attr('data-cur-name');
    // 如果点选的为当前类型， 不切换
    if (current_name === _id){
      return false;
    }
    pacakge_heros_datas = getHerosDatasByName(_id);
    if (pacakge_heros_datas == null){
      return false;
    }

    title = pacakge_heros_datas.title;
    herosDatas = pacakge_heros_datas.herosDatas;
    herosTypes = pacakge_heros_datas.herosTypes;
    $package_title.html(title).attr('data-cur-name', _id);

    // 更新列表
    _has_loading = $heros_list.find('div.loading-cont').length > 0?true:false;
    //按需加载变量
    list_dom_datas = {
      'datas': herosDatas,
      'types': herosTypes,
      'allshow':false
    };
    if (!_has_loading){
      $heros_list.empty();
      addLoading($heros_list);
      datas_len = parseInt(herosDatas.length/2);
      list_datas = getHerosGroupDatas(herosDatas.slice(0, datas_len), herosTypes.slice(0, datas_len));
      setTimeout(function(){
        removeLoading($heros_list);
        createToggleBtn({'datas':list_datas, '$target_dom':$heros_list, 'is_empty': true});
        $heros_list.data('dom-datas', list_dom_datas);
      }, 200);
    }
  }

});