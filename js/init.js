// 加入时间戳(手机调试无缓存加载)
// var time_stamp = new Date().getTime();
// PC代码debug 则固定时间戳
var time_stamp = '2';

document.writeln('<script type="text/javascript" src="js/util.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/heros.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/heros_detail.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/rule.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/card.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/strategy.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="js/main.js?v=' + time_stamp + '"></script>');
document.writeln('<link rel="stylesheet" type="text/css" href="css/main.css?v=' + time_stamp + '">');