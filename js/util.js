/*
 *  written by wteam_xq time 20141125
 *  Distributed under the MIT License
 *  项目工具类
 */
var Util = {
  /**
   * 获得数组的随机顺序
   * @returns {Array}
   */
  'getRandomArray': function (array){
    var _result = new Array();
    var _old_array = new Array();
    var rnd = 0;
    if (array == null || array.length == 0){
      return _result;
    }
    // 不影响原数组
    _old_array = array.slice(0);
    for(var i = 0, len = _old_array.length; i < len; i++){
      rnd = Math.floor(Math.random() * _old_array.length); 
      _result[i] = _old_array[rnd]; 
      _old_array.splice(rnd,1) 
    } 
    return _result; 
  },
  /**
   * 数组降维(只适用于维度3+以上的数组)
   * @returns {Array}
   */
  'arrayReDimensions': function(array){
    var _result = [];
    var _array_item = [];
    var _old_array = [];

    if (array == null || array.length == 0){
      return _result;
    }
    // 不影响原数组
    _result = array[0].slice(0);
    for (var i = 1, len = array.length; i < len; i++){
      _array_item = array[i];
      for (var j = 0, jLen = _array_item.length; j < jLen; j++){
        _result[j] = _result[j].concat(_array_item[j]);
      }
    }
    return _result;
  },
  /**
   * js Map 实现
   * @returns {Map}
   */
  'Map': function (){
    this.keys = [];
    this.data = {};

    /**
     * 放入一个键值对
     * @param {String} key
     * @param {Object} value
     */
    this.put = function(key, value) {
      if (this.data[key] == null) {
        this.keys.push(key);
      }
      this.data[key] = value;
    };

    /**
     * 获取某键对应的值
     * @param {String}  key
     * @return {Object} value
     */
    this.get = function(key) {
      return this.data[key];
    };

    /**
     * 是否包含该键
     */
    this.contain = function(key) {
      var value = this.data[key];
      if (value)
        return true;
      else
        return false;
    };

    /**
     * 删除一个键值对
     * @param {String} key
     */
    this.remove = function(key) {
      for (var index = 0; index < this.keys.length; index++) {
        if (this.keys[index] == key) {
          this.keys.splice(index, 1);
          break;
        }
      }
      //this.keys.remove(key);
      this.data[key] = null;
    };

    /**
     * 删除所有
     * @param {String}
     */
    this.removeAll = function() {
      var obj = this;
      obj.each(function(key, value, index) {
        obj.remove(key);
      });
    };

    /**
     * 遍历Map,执行处理函数
     * @param {Function} 回调函数 function(key,value,index){..}
     */
    this.each = function(fn) {
      if ( typeof fn != 'function') {
        return;
      }
      var len = this.keys.length;
      for (var i = 0; i < len; i++) {
        var k = this.keys[i];
        fn(k, this.data[k], i);
      }
    };

    /**
     * 遍历Map,执行排序
     * @param {filed} 排序字段 、desc{排序规则 :默认降序}
     */
    this.sort = function(key, filed, desc) {
      var tmpArr = SortUtils.sortByField(this.getDataArr(), filed, desc);
      this.data = {};
      this.keys = [];
      for (var i = 0; i < tmpArr.length; i++) {
        this.put(tmpArr[i][key], tmpArr[i]);
      }
    };

    /**
     * 获取键值数组(类似Java的entrySet())
     * @return 键值对象{key,value}的数组
     */
    this.entrys = function() {
      var len = this.keys.length;
      var entrys = new Array(len);
      for (var i = 0; i < len; i++) {
        entrys[i] = {
          key : this.keys[i],
          value : this.data[this.keys[i]]
        };
      }
      return entrys;
    };

    this.getDataArr = function() {
      var dataArr = [];
      this.each(function(key, value, index) {
        dataArr.push(value);
      });
      return dataArr;
    };

    /**
     * 判断Map是否为空
     */
    this.isEmpty = function() {
      return this.keys.length == 0;
    };

    /**
     * 获取键值对数量
     */
    this.size = function() {
      return this.keys.length;
    };
    
    /**
     * 根据关键字模糊匹配键值，并返回结果
     */
    this.findByAppId = function(appId){
      var len = this.keys.length;
      var result = new Array();
      for (var i = 0; i < len; i++) {
        var k = this.keys[i];
        if(k.indexOf(appId) != -1){
          result.push(this.data[k]);
        }
      }
      return result;
    },
    /**
     * 根据关键字模糊匹配键值，并返回结果
     */
    this.findByMsgId = function(msgId){
      var len = this.keys.length;
      for (var i = 0; i < len; i++) {
        var k = this.keys[i];
        if(k.indexOf(msgId) != -1){
          return this.data[k];
        }
      }
    },

    /**
     * 重写toString
     */
    this.toString = function() {
      var s = "{";
      for (var i = 0; i < this.keys.length; i++, s += ',') {
        var k = this.keys[i];
        s += k + "=" + this.data[k];
      }
      s += "}";
      return s;
    };
  }
};//end util

