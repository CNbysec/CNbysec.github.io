"use strict";window.onload=function(){var t,e=document.title;document.addEventListener("visibilitychange",function(){document.hidden?($('[rel="icon"]').attr("href","../../images/failure.png"),$('[rel="shortcut icon"]').attr("href","../../images/failure.png"),document.title="(●—●)喔哟，崩溃啦！",clearTimeout(t)):($('[rel="icon"]').attr("href","../../images/favicon-32x32-next.png"),$('[rel="shortcut icon"]').attr("href","../../images/favicon-32x32.png"),document.title="(/≧▽≦/)咦！页面又好了！",t=setTimeout(function(){document.title=e},2e3))})};