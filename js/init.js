// 加入时间戳(手机调试无缓存加载)
var time_stamp = new Date().getTime();

document.writeln('<script type="text/javascript" src="datas/heros.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/rule.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/card.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="datas/strategy.js?v=' + time_stamp + '"></script>');
document.writeln('<script type="text/javascript" src="js/mainmenu.js?v=' + time_stamp + '"></script>');
document.writeln('<link rel="stylesheet" type="text/css" href="css/mainmenu.css?v=' + time_stamp + '">');