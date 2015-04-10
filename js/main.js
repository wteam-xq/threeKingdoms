// 武将包数量
var PACKAGE_AMOUNT = 7;
// 搜索map数据库
var search_array = getSearchMap();

var metro_colors = ['blue', 'green', 'red', 'yellow', 'pink', 'purple', 'lime', 'magenta','teal', 'turquoise', 'green-sea', 'emerald']; 

// 自动生成搜索Map
function getSearchMap(){
  var result = null,
  array_item = null,
  item_obj = null,
  key = '',
  sub_array = [],
  child_sub_array = [];

  result = new Util.Map();
  /**********************    detail 类型页 ***********************************/
  // 规则(rule_datas 全局变量)
  for (var i = 0, len = rule_datas.length; i < len; i++){
    array_item = rule_datas[i];
    if (array_item.title == null || array_item.data == null){
      continue;
    }
    key = array_item.id;
    item_obj = {
      'key': array_item.id,
      'title': array_item.title,
      'type': 'detail',
      'pid': 'rule',
      'data': array_item.data,
    };
    result.put(key, item_obj);
  }
  // 卡牌（非武将 card_datas 全局变量）
  for (var i = 0, len = card_datas.length; i < len; i++){
    sub_array = card_datas[i].data;
    if (sub_array == null || sub_array.length == 0){
      continue;
    }
    for (var j = 0, jLen = sub_array.length; j < jLen; j++){
      array_item = sub_array[j];
      if (array_item.title == null || array_item.data == null){
        continue;
      }
      key = array_item.id;
      item_obj = {
        'key': array_item.id,
        'title': array_item.title,
        'type': 'detail',
        'pid': 'sub-card',
        'data': array_item.data
      };
      result.put(key, item_obj);
    }
  }
  
  /**********************    mult-detail 类型页 ***********************************/
  // 攻略(str_datas 全局变量)
  for (var i = 0, len = str_datas.length; i < len; i++){
    if (str_datas[i].array_datas == null || str_datas[i].array_datas.length == 0){
      continue;
    }
    sub_array = str_datas[i].array_datas;
    for (var j = 0, jLen = sub_array.length; j < jLen; j++){
      array_item = sub_array[j];
      if (array_item.title == null || array_item.data == null){
        continue;
      }
      key = array_item.id;
      item_obj = {
        'key': array_item.id,
        'title': array_item.title,
        'type': 'mult-detail',
        'pid': 'rule',
        'data': array_item.data
      };
      result.put(key, item_obj);
    }
  }
  /**********************   heros 类型页 ***********************************/
  // 武将（heros_array 全局变量）三维数组
  for (var i = 0, len = heros_array.length; i < len; i++){
    sub_array = heros_array[i];
    if (sub_array == null || sub_array.length == 0){
      continue;
    }
    for (var j = 0, jLen = sub_array.length; j < jLen; j++){
      child_sub_array = sub_array[j];
      if (child_sub_array == null || child_sub_array.length == 0){
        continue;
      }
      for (var k = 0, kLen = child_sub_array.length; k < kLen; k++){
        array_item = child_sub_array[k];
        if (array_item.title == null || array_item.data == null){
          continue;
        }
        key = array_item.data;
        item_obj = {
          'key': array_item.data,
          'title': array_item.title,
          'type': 'heros-detail',
          'pid': 'heros',
          'data': array_item.data
        };
        result.put(key, item_obj);
      }
    }
  }
  return result;
}

//页面加载后执行， dom 加载完成
$(document).ready(function(){

  var $window = $(window),
  $body = $('body'),
  $mainmenu = $('#mainmenu'),
  $heros = $('#heros'),
  $rule = $('#rule'),
  $card = $('#card'),
  $strategy = $('#strategy'),
  $searchInfo = $('#search-info');
  $rightDocker = $('#rightDocker');
  
  // pProgressInit();
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
        init();
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
    var navbar_height = 0;
    $('#progress').hide();
    $mainmenu.show();
    navbar_height = $mainmenu.find('div.tkd-navbar').css('height');
    $mainmenu.css({'padding-top': navbar_height});

    /** 界面渲染 **/
    // 加载规则页面, rule_datas : 规则全局数据，../datas/rule.js
    createGroupItem({'datas': rule_datas, '$target_dom': $rule, 'click_fn': showDetail});
    // 加载卡牌页面, card_datas : 规则全局数据，../datas/card.js
    createGroupItem({'datas': card_datas, '$target_dom': $card, 'click_fn': showCardTypes});
    // 加载武将页面, heros_datas : 规则全局数据，../datas/heros.js
    createDropdownMenu(heros_datas, $heros);
    // 加载攻略页面, str_datas : 规则全局数据，../datas/strategy.js
    createToggleBtn({'datas':str_datas, '$target_dom':$strategy, 'click_fn': showMultDetail});
    // 获得 风火山林 包 package_array(全局变量)
    package_array = getPackagesDatas();
    // 默认显示 “三国鼎立” “蜀国”
    createHerosList('country_shu', $heros);

    /** 定义事件 **/
    $mainmenu.find('#to-person-info').on('click',logoEvent);
    // on 实现 live  
    $body.on('focus', 'input.input-search', toSearchEvent);
    $('#backtotop').on('click', toTop);
    // 滚动监听
    $window.scroll(watchScrollEvent);
    //搜索框点击事件
    $searchInfo.find('.search-close').on('click', removeSearchEvent);
    $searchInfo.find('input').on('input', watchInputEvent);
    $searchInfo.find('#search-submit').on('click', searchBtnEvent);
    // 二维码按钮点击
    if ($rightDocker.is(':visible')){
      $rightDocker.find('#rightDockerBtn').on('click', rightDockerEvent);
    }
  }

  // 二维码按钮点击
  function rightDockerEvent(){
    var $this = $(this).parents('#rightDocker'),
    pop_of_left = 0,
    had_event = 'false',
    $dockerPopover = $this.find('#dockerPopover');

    // 计算弹出框位置
    pop_of_left = $this.offset().left - $dockerPopover.width() - 10;
    had_event = $this.attr('data-had-event');

    if (!$dockerPopover.hasClass('in')){
      $dockerPopover.css({'left': pop_of_left+'px'});
      $dockerPopover.addClass('in');
    }else{
      $dockerPopover.removeClass('in');
      return false;
    }

    // 点击任意地方 弹出框消失
    if (had_event != 'true'){
      $this.attr('data-had-event', 'true');
      $('html').on('click', function(event){
        if (!$dockerPopover.hasClass('in') ){
          return true;
        }
        // 判断点击点是否在弹出框内
        var $target = $(event.target);
        if ( !isChildAndSelfOf($target, 'rightDocker') ){
          $dockerPopover.removeClass('in');
          return false;
        }
      });
    }
  }

  // 判断:当前元素是否是被筛选元素的子元素或者本身 
  function isChildAndSelfOf($target_dom, parent_id){
    var _result = false;
    if ($target_dom.attr('id') === parent_id){
      _result = true;
    }else if ($target_dom.parents('#' + parent_id).length > 0){
      _result = true;
    }
    return _result;
  }

  // 武将详情页面
  function showHerosDetail(){
    var $this = $(this),
    $detail_panel = null,
    $main = null,
    _data_item = null,
    _datas = [],
    _data = [],
    _data_types = ['name', 'online', 'power', 'q', 'p'],
    // 当前绘制位置标志位， 例如， 当前绘制到 “online战功”(online)
    _flag_item = '',
    _datas_id = '',
    _parent_id = '',
    _detail_id = '',
    _html = '';

    _datas_id = $this.data('item-data');
    // heros_detail 全局变量
    _datas = heros_detail[_datas_id];
    if (_datas == null || _datas.length == 0){
      return false;
    }
    _parent_id = $this.parents('div.item-list').attr('id');
    _detail_id = _parent_id + '-detail';
    $detail_panel = $('#' + _detail_id);
    $main = $this.parents('div.main-panel');
    createAppHead($detail_panel);

    _html = '<div class="panel panel-warning"><div class="panel-heading content-heading"></div><div class="sub-content panel-body"></div></div>';
    $detail_panel.append(_html);
    $detail_panel.find('div.panel-heading').html('武将牌*' + $this.attr('title') );
    
    _html = '';
    if (_datas.length != _data_types.length){
      _html = '数组长度不统一, 加载页面失败！'
      $detail_panel.find('div.panel-body').append(_html);
      gotoPage($detail_panel, $main);
      return false;
    }
    for (var i = 0, len = _datas.length; i < len; i++){
      _data = _datas[i];
      _flag_item = _data_types[i];
      'name', 'online', 'power', 'q', 'p'
      switch(_flag_item){
        case 'name':
          _html += renderName(_data);
          break;
        case 'online':
          _html += renderOnline(_data);
          break;
        case 'power':
          _html += renderPower(_data);
          break;
        case 'q':
          _html += renderQa(_data);
          break;
        case 'p':
          _html += renderStr(_data);
          break;
        default:
          break;
      }
    }
    $detail_panel.find('div.panel-body').append(_html);
    gotoPage($detail_panel, $main);
    // 返回页面顶部
    toTop();

    function renderName(_data){
      var _html = '';
      for (var j = 0, jLen = _data.length; j < jLen; j++){
        _data_item = _data[j];
        _html += '<div class="thumbnail"><img src="' + _data_item.img + '" alt="..."></div>';
        _html += '<div><span class="blue">武将称号: </span><span>'+ _data_item.nickname +'</span></div>';
      }
      return _html;
    }
    function renderOnline(_data){
      var _html = '';
      if (_data == null || _data.length == 0){
        return _html;
      }
      _html += '<div><span class="blue">Online战功: </span></div>';
      for (var j = 0, jLen = _data.length; j < jLen; j++){
        _data_item = _data[j];
        _html += '<div><span>'+ _data_item.online +'</span><span>——</span><span>'+ _data_item.content +'</span></div>';
      }
      return _html;
    }
    function renderPower(_data){
      var _html = '';
      if (_data == null || _data.length == 0){
        return _html;
      }
      _html += '<div><span class="blue">武将技能: </span></div>';
      for (var j = 0, jLen = _data.length; j < jLen; j++){
        _data_item = _data[j];
        _html += '<div>'+ _data_item.power +'</div>';
      }
      return _html;
    }
    function renderQa(_data){
      var _html = '';
      if (_data == null || _data.length == 0){
        return _html;
      }
      _html += '<div><span class="blue">有问有答: </span></div>';
      for (var j = 0, jLen = _data.length; j < jLen; j++){
        _data_item = _data[j];
        if (_data_item.q){
          _html += '<div><span class="red">[Q]</span> '+ _data_item.q +'</div>';
        }
        if (_data_item.a){
          _html += '<div><span class="red">[A]</span> '+ _data_item.a +'</div>';
        }
        if (_data_item.example){
          _html += '<div><span class="red">例如 </span> '+ _data_item.example +'</div>';
        }
      }
      return _html;
    }
    function renderStr(_data){
      var _html = '';
      if (_data == null || _data.length == 0){
        return _html;
      }
      _html += '<div><span class="blue">身份局攻略: </span></div>';
      for (var j = 0, jLen = _data.length; j < jLen; j++){
        _data_item = _data[j];
        _html += '<div>'+ _data_item.p +'</div>';
      }
      return _html;
    }
  }

  // 卡牌分类页面
  function showCardTypes(){
    var $this = $(this);
    $detail_panel = null,
    $main = null,
    _data_item = null,
    _datas = [],
    _parent_id = '',
    _detail_id = '',
    _html = '',
    // metro 效果实现变量
    _color = '',
    _color_index = 0,
    _block_name = '',
    _colors_len = metro_colors.length,
    _random_colors = Util.getRandomArray(metro_colors);

    _parent_id = $this.parents('div.item-list').attr('id');
    _detail_id = _parent_id + '-types';
    $detail_panel = $('#' + _detail_id);
    $main = $this.parents('div.main-panel');
    // 武将卡 特殊处理
    if ($this.attr('id') === 'card_heros'){
      $main.find('ul.nav-tabs').find('#menu-heros > a').trigger('click')
      return true;
    }
    _datas = $this.data('item-data');
    if (_datas == null || _datas.length == 0){
      return false;
    }
    createAppHead($detail_panel);

    _html = '<div class="row sub-page item-list" id="sub-card">';
    for (var i = 0, len = _datas.length; i < len; i++){
      _data_item = _datas[i];
      
      _color = _random_colors[_color_index];
      _block_name = _color;
      _color_index++;
      if (_color_index > _colors_len - 1){
        _color_index = 0;
      }
      if (_data_item.title){
        _block_name = _data_item.title;
      }
      _html += '<div class="col-sm-6 col-md-3"><div id="'+ _data_item.id +'" class="thumbnail tile tile-medium tile-'+ _color +' col-md-3"><a href="#"><h1>'+ _block_name +'</h1></a></div></div>';
    }
    _html += '</div>';

    $detail_panel.append(_html);
    // 赋予点击事件
    $detail_panel.find('div.sub-page').find('div.tile-medium').each(function(i){
      var $this = $(this);
      var dataObj = _datas[i].data;
      if (dataObj){
        $this.data('item-data', dataObj);
        $this.on('click', showDetail);
      }
    });

    gotoPage($detail_panel, $main);
  }

  //rule 页面点击事件
  function showDetail(){
    var $this = $(this),
    $detail_panel = null,
    $main = null,
    $cur_item = null,
    _datas = [],
    _parent_id = '',
    _detail_id = '',
    _html = '',
    _data_item = null,
    // 显示的内容
    _content = '';

    _datas = $this.data('item-data');
    if (_datas == null || _datas.length == 0){
      return false;
    }
    _parent_id = $this.parents('div.item-list').attr('id');
    _detail_id = _parent_id + '-detail';
    $detail_panel = $('#' + _detail_id);
    $main = $this.parents('div.main-panel');
    createAppHead($detail_panel);

    _html = '<div class="panel panel-warning"><div class="panel-heading content-heading"></div><div class="sub-content panel-body"></div></div>';
    $detail_panel.append(_html);

    _html = '';
    for (var i = 0, len = _datas.length; i < len; i++){
      _data_item = _datas[i];
      _content = _data_item.p;
      if (i == 0){
        $detail_panel.find('div.panel-heading').html(_data_item.p);
        continue;
      }
      if (_data_item.img){
        _html += '<div class="thumbnail"><img src="' + _data_item.img + '" alt="..."></div>';
        continue;
      }
      if (_data_item.id){
        _html += '<div id="'+ _data_item.id +'">' + _data_item.p + '</div>';
        continue;
      }
      if (_content.indexOf('[A]') != -1){
        _content = _content.replace('[A]', '');
        _html += '<div><span class="red">[A]</span> ' + _content +'</div>';
      }else if(_content.indexOf('[Q]') != -1){
        _content = _content.replace('[Q]', '');
        _html += '<div><span class="red">[Q]</span> ' + _content +'</div>';
      }else{
        _html += '<div>' + _content +'</div>';
      }
      
    }
    $detail_panel.find('div.panel-body').append(_html);
    gotoPage($detail_panel, $main);
    // 判断是否滚动页面(身份牌、体力牌)
    $cur_item = $detail_panel.find('#' + $this.attr('id'));
    if ($cur_item.length > 0){
      setTimeout(function(){
        var _offset_top = $cur_item.offset().top;
        _offset_top -= $detail_panel.find('div.sub-navbar').height();
        window.scrollTo(0,_offset_top);
      }, 1000);
    }
  }  
  // 展示多页数据
  function showMultDetail(){
    var $this = $(this),
    $detail_panel = null,
    $main = null,
    $panel_body = null,
    _datas = [],
    _parent_id = '',
    _detail_id = '',
    _html = '',
    _data_item = null,
    _page_index = 0;

    _datas = $this.data('item-data');
    if (_datas == null || _datas.length == 0){
      return false;
    }
    _parent_id = $this.parents('div.item-list').attr('id');
    _detail_id = _parent_id + '-detail';
    $detail_panel = $('#' + _detail_id);
    $main = $this.parents('div.main-panel');
    createAppHead($detail_panel);
    _html = '<div class="panel panel-warning"><div class="panel-heading content-heading"></div><div class="sub-content panel-body"></div></div>';
    $detail_panel.append(_html);

    $panel_body = $detail_panel.find('div.panel-body');
    _html = '<span>' + $this.attr('title') + '</span>';
    _html += '<span class="pager-tips"></span>';
    $detail_panel.find('div.panel-heading').append(_html);
    $panel_body.append(_html);
    // 默认展示第一页
    gotoPageCount(_page_index);
    $panel_body.on('click', panelContentClick);

    gotoPage($detail_panel, $main);
    toTop();
    // 点击翻页按钮
    function pagerBtnClick(){
      var $this = $(this);
      var _type = '';
      if ($this.hasClass('disabled')){
        return false;
      }
      if ( $this.hasClass('previous') ){
        _page_index--;
      }else{
        _page_index++;
      }
      gotoPageCount(_page_index);
      // 返回顶部
      toTop();
      return false;
    }
    // 点击页面内容
    function panelContentClick(){
      var $this = $(this),
      $content_pager = $detail_panel.find('#content-pager');

      if ($content_pager.is(':visible')){
        $content_pager.hide();
      }else{
        $content_pager.show();
      }
    }
    // 跳转至页面
    function gotoPageCount(index){
      var _page_content = [],
      _cont_item = [],
      _cont_html = '',
      _page_count = _datas.length;
      _page_content = _datas[index];
      // 判断传入 页码是否正确
      if (index < 0 ||  _page_count <= index){
        return false;
      }
      $panel_body.empty();
      // detach只删除节点 保留事件 
      // $panel_body.children().detach();

      for (var i = 0, len = _page_content.length; i < len; i++){
        _cont_item = _page_content[i];
        if (_cont_item.img){
          _cont_html += '<div class="thumbnail"><img src="' + _cont_item.img + '" alt="..."></div>';
          continue;
        }
        _cont_html += '<div>' + _cont_item.p +'</div>';
      }
      $panel_body.append(_cont_html);
      // 添加分页控件
      if ($detail_panel.find('#content-pager').length > 0){
        // 分页控件删除（连同事件）
        $detail_panel.find('#content-pager').remove();
      }
      _cont_html = '<ul id="content-pager" class="pager content-pager"><li class="previous"><a href="javascript:void(0);">&laquo;上一页</a></li><li class="next"><a href="javascript:void(0);">下一页&raquo;</a></li></ul> ';
      $detail_panel.append(_cont_html);
      // 添加分页按钮事件
      $detail_panel.find('#content-pager > li').on('click', pagerBtnClick);

      _cont_html = '(第' + (index + 1) + '页  ' + '共' + _page_count + '页)';
      $panel_body.prev('div.panel-heading').find('span.pager-tips').html(_cont_html);

      // 分页控件样式变化
      if (index === 0){
        $detail_panel.find('#content-pager>li.previous').addClass('disabled');
      }
      if (index === _datas.length - 1){
        $detail_panel.find('#content-pager>li.next').addClass('disabled');
      }
      
    }
  }

  //生成 次级页面 头部html
  function createAppHead($target_dom){
    var p_id = '',
    _html = '';

    if ($target_dom == null){
      return false;
    }
    p_id = $target_dom.attr('id');
    _html = '<div class="navbar sub-navbar navbar-default row"role="navigation"><div class="navbar-header col-xs-5 col-md-3 pull-left"><a href="##"class="navbar-brand logo-brand"><span class="glyphicon glyphicon-chevron-left back-ico"data-btntype="cancel"id="back-index"></span></a></div><form class="navbar-form navbar-right col-xs-7 col-md-4 row"role="search"><div class="form-group pull-left col-xs-12"><span class="glyphicon glyphicon-search tkd-search"></span><input type="text"data-parentId="'+ p_id +'"class="form-control pull-right input-search"placeholder="搜索卡牌、攻略、规则"></div></form></div>';
    $target_dom.empty();
    $target_dom.append(_html);

    // 添加内边距(页面渲染完成执行)
    setTimeout(function(){
      $target_dom.css({'padding-top': $target_dom.find('div.sub-navbar').css('height')});
    },10);
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
    var _result = null,
    _herosDatas = [],
    _herosTypes = [],
    _type = '',
    _title = '',
    _index = 0;

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
          _herosDatas = Util.arrayReDimensions(package_array);
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
          _herosDatas = Util.arrayReDimensions(heros_array);
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
    var herosDatas = [],
    herosTypes = [],
    list_datas = [],
    title = '',
    // 按需加载， 只显示一部分数据
    datas_len = 0,
    _html_str = '',
    list_dom_datas = null,
    package_heros_datas = null;

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
    
    // 生成一 group-list 项
    createToggleBtn({'datas':list_datas, '$target_dom':$target.find('.heros-list'), 'click_fn': showHerosDetail});

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
    var _result = [],
    _data_item = null,
    _type_item = null,
    _result_item = null;

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
    var _result = [],
    _three_item = [],
    _package_item = [];

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
    var $this = $(this),
    $searchInput = $this.prev('input'),
    $backIndex = $this.parents('.navbar').find('#back-index'),
    $searchSubmit = $this.parents('.navbar').find('#search-submit');

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
    var $this = $(this),
    $closeBtn = $this.next('.search-close'),
    $backIndex = $this.parents('.navbar').find('#back-index'),
    $searchSubmit = $this.parents('.navbar').find('#search-submit');

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
    var $this = $(this),
    val = '';

    val = $this.prevAll('.form-group').find('input').val();
    searchEvent(val);
  }
  // 点击搜索按钮 事件
  function searchEvent(val){
    var filter_array = [],
    search_item = null,
    $searchList = $('#search-info').find('div.search-list'),
    _has_loading = false,
    _old_key = '';

    if (val == null || val == ''){
      return false;
    }
    _old_key = $searchList.data('old-key');
    if (_old_key == val){
      return false;
    }
    search_array.each(function(key, item_val, i){
      if ( item_val.title.search(new RegExp(val,"i")) != -1){
        filter_array.push(item_val);
      }
    });

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
    var $main = $('#mainmenu'),
    $target = $('#person-info');
    gotoPage($target, $main);
  }
  // 进入搜索页面
  function toSearchEvent(){
    var $target = $('#search-info'),
    $this = $(this),
    parent_id = $this.attr('data-parentId'),
    $main = $('#' + parent_id);
    gotoPage($target, $main);
  }
  // 滚动监听
  function watchScrollEvent(){
    var $body = $('body');
    $toTop = $body.find('#backtotop'),
    $heros_list = null,
    _dom_datas = null,
    // 判断滚动条是否到达底部
    _scroll_bottom = false,    
    _has_loading = false;

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
        
        addLoading($heros_list);
        setTimeout(function(){
          var _list_datas = [],
          _datas_len = 0;

          _datas_len = parseInt(_dom_datas.datas.length/2);
          _list_datas = getHerosGroupDatas(_dom_datas.datas.slice(_datas_len), _dom_datas.types.slice(_datas_len));
          removeLoading($heros_list);
          createToggleBtn({'datas':_list_datas, '$target_dom':$heros_list, 'is_empty': false, 'click_fn': showHerosDetail});
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
    
    // 判断是否为 搜索详情页打开
    if ( $main.hasClass('search-detail') ){
      $main.find('#back-index').trigger('click');
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

  // 打开新页面
  function openPage($target, $main){
    if ($target == null || $main == null){
      return false;
    }

    $main.css({'-webkit-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
    $main.animate({'margin-left': '-' + $main.css('width')}, 500, function(){
      var $this = $(this);
      $this.hide();
      $this.css('margin-left', '0px');
    });

    $target.css({'width': $target.css('width'), 
      'margin-left':$target.css('width')
    });
    $target.show();

    $target.css({'-webkit-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
    $target.animate({'margin-left':'0px'}, 500, function(){
      var $this = $(this);
      // 解决 新页面fixed 无效Bug
      $this.css({'-webkit-transform':'none',
        '-o-transform':'none',
        'transform':'none'
      });
      $this.css({'width':'100%', 'position':'relative'});
    });
  }
  // 关闭打开的页面
  function closePage($target, $main){
    if ($target == null || $main == null){
      return false;
    }
    var $backIco = $target.find('#back-index');
    
    $main.css('margin-left', '-' + $main.css('width'));
    $main.show();
    $main.css({'-webkit-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
    $main.animate({'margin-left':'0px'}, 500, function(){
    });

    $target.css({'-webkit-transform':'translate3d(0,0,0)',
      '-o-transform':'translate3d(0,0,0)',
      'transform':'translate3d(0,0,0)'
    });
    $target.css({'width':$target.css('width'), 'position':'fixed'});
    $target.animate({'margin-left': $target.css('width')}, 500, function(){
      var $this = $(this);
      $this.hide();
      $this.css({'margin-left':'0px', 'width':'100%'});
    });
  }

  // 主菜单列表html生成
  function createGroupItem(options){
    var _item_htmls = '',
    _item_html = '',
    _item_id_html = '',
    item_data = null,
    $target_dom = null,
    click_fn = null,
    datas = [],
    setting = {
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
        if (item_data.id){
          _item_id_html = 'id="' + item_data.id + '"'
        }
        _item_html = '<a href="##" title="'+ item_data.title +'" class="list-group-item list-group-item-warning" ' + _item_id_html + ' >' + 
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
          if (dataObj){
            $this.data('item-data', dataObj);
          }
          $this.on('click', click_fn);
        });
      }
      return $target_dom;
    }else{
      $target_dom.html('数据异常！');
      return $target_dom;
    }
  }
  
  // 普通列表HTML生成(搜索列表)
  function createListGroup(datas, $target_dom){
    if (datas == null || $target_dom == null){
      return false;
    }
    var _item_htmls = '',
    _item_html = '',
    item_datas = [],    item_data = null;

    $target_dom.empty();
    if(datas && datas.length > 0){
      // 加载 规则菜单 dom
      _item_htmls = '<div class="list-group">';
      for(var i = 0, len = datas.length; i < len; i++){
        item_data = datas[i];
        _item_html = '';
        _item_html += '<div class="item-list search-item" id="search-'+ item_data.pid +'">';
        _item_html += '<a href="##" data-type="'+ item_data.type +'" class="list-group-item list-group-item-warning" title="'+ item_data.title +'">' + item_data.title + '</a>';
        _item_html +='</div>';

        item_datas.push(item_data.data);
        _item_htmls += _item_html;
      }
      _item_htmls += '</div>';

      $target_dom.append(_item_htmls);

      $target_dom.find('a').each(function(i){
        var $this = $(this);
        var _type = $this.attr('data-type');
        var _data = item_datas[i];
        // 不为空则 赋予 点击事件
        if (_data){
          $this.data('item-data', _data);
          switch(_type){
            case 'detail':
              $this.on('click', showDetail); 
              break;
            case 'heros-detail':
              $this.on('click', showHerosDetail); 
              break;
            case 'mult-detail':
              $this.on('click', showMultDetail); 
              break;
            default:
              break;
          }
        }
      });
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
      'is_empty': true,
      'click_fn': null
    };
    var _item_html = '',
    $item_list = null,
    item_data = null,
    $app_btn = null;
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
        createGroupItem( {'datas': item_data.array_datas, '$target_dom': $item_list.find('#str_' + item_data.id), 'click_fn': setting.click_fn} );
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
    var $result = null,
    _html = '',
    _data = null;
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
    var data_item = null,
    _item_html = '',
    $item_html = null,
    _item_htmls = '',
    data_item_array = [],
    pull_left_right = 'pull-left',
    $dropdown_menu = null;

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
        _item_html = '<div class="dropdown ' + pull_left_right + ' col-xs-5 col-md-4">' + 
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
      _id = this.id,
      _type = /drmenu/.test(_id)?'drmenu':/country/.test(_id)?'country':'package',
      $ul_parent = $this.parents('div.tab-pane:first');

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
  // drmenu li点击事件(武将 筛选类型)
  function drmenuLeftEvent(_id, $target_dom){
    var drmenu_name = '',
    current_name = '',
    item_title = '',
    $influDrmenu = null,
    $package_title = null,
    _datas = [];

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

      drmenuRightEvent(item_title, $target_dom);
    }
    return true;
  }
  // drmenu li点击事件(武将 筛选)
  function drmenuRightEvent(_id, $target_dom){
    var title = '',
    current_name = '',
    pacakge_heros_datas = null,
    list_dom_datas = null,
    $package_title = $target_dom.find('#items-type'),
    $heros_list = $target_dom.find('div.heros-list'),
    list_datas = [],
    herosDatas = [],
    herosTypes = [],
    datas_len = 0;

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
        createToggleBtn({'datas':list_datas, '$target_dom':$heros_list, 'is_empty': true, 'click_fn': showHerosDetail});
        $heros_list.data('dom-datas', list_dom_datas);
      }, 200);
    }
  }

});