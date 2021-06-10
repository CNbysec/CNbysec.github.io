"use strict";function loadWidget(t,o){var e,a;localStorage.removeItem("waifu-display"),sessionStorage.removeItem("waifu-text"),$("body").append('<div id="waifu">\n\t\t\t<div id="waifu-tips"></div>\n\t\t\t<canvas id="live2d" width="300" height="300"></canvas>\n\t\t\t<div id="waifu-tool">\n\t\t\t\t<span class="fa fa-lg fa-comment"></span>\n\t\t\t\t<span class="fa fa-lg fa-paper-plane"></span>\n\t\t\t\t<span class="fa fa-lg fa-user-circle"></span>\n\t\t\t\t<span class="fa fa-lg fa-street-view"></span>\n\t\t\t\t<span class="fa fa-lg fa-camera-retro"></span>\n\t\t\t\t<span class="fa fa-lg fa-info-circle"></span>\n\t\t\t\t<span class="fa fa-lg fa-times"></span>\n\t\t\t</div>\n\t\t</div>'),$("#waifu").show().animate({bottom:0},3e3),function(){$("#waifu-tool .fa-comment").click(f),$("#waifu-tool .fa-paper-plane").click(function(){window.Asteroids?(window.ASTEROIDSPLAYERS||(window.ASTEROIDSPLAYERS=[]),window.ASTEROIDSPLAYERS.push(new Asteroids)):$.ajax({url:"https://cdn.jsdelivr.net/gh/GalaxyMimi/CDN/asteroids.js",dataType:"script",cache:!0})}),$("#waifu-tool .fa-user-circle").click(g),$("#waifu-tool .fa-street-view").click(m),$("#waifu-tool .fa-camera-retro").click(function(){u("照好了嘛，是不是很可爱呢？",6e3,9),Live2D.captureName="photo.png",Live2D.captureFrame=!0}),$("#waifu-tool .fa-info-circle").click(function(){open("https://github.com/stevenjoezhang/live2d-widget")}),$("#waifu-tool .fa-times").click(function(){localStorage.setItem("waifu-display",(new Date).getTime()),u("愿你有一天能与重要的人重逢。",2e3,11),$("#waifu").animate({bottom:-500},3e3,function(){$("#waifu").hide(),$("#waifu-toggle").show().animate({"margin-left":-50},1e3)})});var t=/x/;console.log(t),t.toString=function(){return u("哈哈，你打开了控制台，是想要看看我的小秘密吗？",6e3,9),""},$(document).on("copy",function(){u("你都复制了些什么呀，转载要记得加上出处哦！",6e3,9)}),$(document).on("visibilitychange",function(){document.hidden||u("哇，你终于回来了～",6e3,9)})}(),a=location.port?"".concat(location.protocol,"//").concat(location.hostname,":").concat(location.port,"/"):"".concat(location.protocol,"//").concat(location.hostname,"/"),u(location.href==a?5<(e=(new Date).getHours())&&e<=7?"早上好！一日之计在于晨，美好的一天就要开始了。":7<e&&e<=11?"上午好！工作顺利嘛，不要久坐，多起来走动走动哦！":11<e&&e<=14?"中午了，工作了一个上午，现在是午餐时间！":14<e&&e<=17?"午后很容易犯困呢，今天的运动目标完成了吗？":17<e&&e<=19?"傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～":19<e&&e<=21?"晚上好，今天过得怎么样？":21<e&&e<=23?["已经这么晚了呀，早点休息吧，晚安～","深夜时要爱护眼睛呀！"]:"你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？":""!==document.referrer?((a=document.createElement("a")).href=document.referrer,e=a.hostname.split(".")[1],location.hostname==a.hostname?'欢迎阅读<span style="color:#0099cc;">『'.concat(document.title.split(" - ")[0],"』</span>"):"baidu"==e?'Hello！来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'.concat(a.search.split("&wd=")[1].split("&")[0],"</span> 找到的我吗？"):"so"==e?'Hello！来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">'.concat(a.search.split("&q=")[1].split("&")[0],"</span> 找到的我吗？"):"google"==e?'Hello！来自 谷歌搜索 的朋友<br>欢迎阅读<span style="color:#0099cc;">『'.concat(document.title.split(" - ")[0],"』</span>"):'Hello！来自 <span style="color:#0099cc;">'.concat(a.hostname,"</span> 的朋友")):'欢迎阅读<span style="color:#0099cc;">『'.concat(document.title.split(" - ")[0],"』</span>"),7e3,8);var n,i,c=!1,l=null,s=null,r=["好久不见，日子过得好快呢……","大坏蛋！你都多久没碰人家了呀，嘤嘤嘤～","嗨～快来逗我玩吧！","拿小拳拳锤你胸口！"];function f(){Math.random()<.6&&0<r.length?u(r[Math.floor(Math.random()*r.length)],6e3,9):$.getJSON("https://v1.hitokoto.cn",function(t){var e='这句一言来自 <span style="color:#0099cc;">『'.concat(t.from,'』</span>，是 <span style="color:#0099cc;">').concat(t.creator,"</span> 在 hitokoto.cn 投稿的。");u(t.hitokoto,6e3,9),setTimeout(function(){u(e,4e3,9)},6e3)})}function u(t,e,a){t&&(!sessionStorage.getItem("waifu-text")||sessionStorage.getItem("waifu-text")<=a)&&(s&&(clearTimeout(s),s=null),Array.isArray(t)&&(t=t[Math.floor(Math.random()*t.length)]),sessionStorage.setItem("waifu-text",a),$("#waifu-tips").stop().html(t).fadeTo(200,1),s=setTimeout(function(){sessionStorage.removeItem("waifu-text"),$("#waifu-tips").fadeTo(1e3,0)},e))}function d(t,e){localStorage.setItem("modelId",t),void 0===e&&(e=0),localStorage.setItem("modelTexturesId",e),loadlive2d("live2d","".concat(o,"/get/?id=").concat(t,"-").concat(e),console.log("Live2D 模型 ".concat(t,"-").concat(e," 加载完成")))}function m(){var e=localStorage.getItem("modelId"),a=localStorage.getItem("modelTexturesId");$.ajax({cache:!1,url:"".concat(o,"/rand_textures/?id=").concat(e,"-").concat(a),dataType:"json",success:function(t){1!=t.textures.id||1!=a&&0!=a?u("我的新衣服好看嘛？",4e3,10):u("我还没有其他衣服呢！",4e3,10),d(e,t.textures.id)}})}function g(){var t=localStorage.getItem("modelId");$.ajax({cache:!1,url:"".concat(o,"/switch/?id=").concat(t),dataType:"json",success:function(t){d(t.model.id),u(t.model.message,4e3,10)}})}$(".fa-share-alt").is(":hidden")&&r.push("记得把小家加入Adblock白名单哦！"),$(document).mousemove(function(){c=!0}).keydown(function(){c=!0}),setInterval(function(){l=c?(c=!1,clearInterval(l),null):l||setInterval(f,25e3)},1e3),n=localStorage.getItem("modelId"),i=localStorage.getItem("modelTexturesId"),null==n&&(n=1,i=53),d(n,i),$.getJSON(t,function(t){$.each(t.mouseover,function(t,e){$(document).on("mouseover",e.selector,function(){u((Array.isArray(e.text)?e.text[Math.floor(Math.random()*e.text.length)]:e.text).replace("{text}",$(this).text()),4e3,8)})}),$.each(t.click,function(t,e){$(document).on("click",e.selector,function(){u((Array.isArray(e.text)?e.text[Math.floor(Math.random()*e.text.length)]:e.text).replace("{text}",$(this).text()),4e3,8)})}),$.each(t.seasons,function(t,e){var a=new Date,o=e.date.split("-")[0],n=e.date.split("-")[1]||o;o.split("/")[0]<=a.getMonth()+1&&a.getMonth()+1<=n.split("/")[0]&&o.split("/")[1]<=a.getDate()&&a.getDate()<=n.split("/")[1]&&(e=(e=Array.isArray(e.text)?e.text[Math.floor(Math.random()*e.text.length)]:e.text).replace("{year}",a.getFullYear()),r.push(e))})})}function initWidget(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"/waifu-tips.json",e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:"";screen.width<=768||($("body").append('<div id="waifu-toggle" style="margin-left: -100px;">\n\t\t\t<span>看板娘</span>\n\t\t</div>'),$("#waifu-toggle").hover(function(){$("#waifu-toggle").animate({"margin-left":-30},500)},function(){$("#waifu-toggle").animate({"margin-left":-50},500)}).click(function(){$("#waifu-toggle").animate({"margin-left":-100},1e3,function(){$("#waifu-toggle").hide()}),$("#waifu-toggle").attr("first-time")?(loadWidget(t,e),$("#waifu-toggle").attr("first-time",!1)):(localStorage.removeItem("waifu-display"),$("#waifu").show().animate({bottom:0},3e3))}),localStorage.getItem("waifu-display")&&(new Date).getTime()-localStorage.getItem("waifu-display")<=864e5?$("#waifu-toggle").attr("first-time",!0).css({"margin-left":-50}):loadWidget(t,e))}