
function flowerbar(param,obj,btn,elem){
	var param = $(param);
	var obj = param.find(obj);
	var btn = param.find(btn);
	var elem = Number(elem.substr(3,2))-1;
	var n = elem;

	function _current(t,e){
		if(e == "mouseleave" || e == "focusout"){
			if(!isNaN(elem) && elem !== -1){
				elem = n;
				t = btn.eq(elem);

			}else{
				obj.stop(true,false).animate({opacity:0},300,"easeInOutCubic",function(){
					$(this).removeAttr("style");

				});

				return false;

			}
		}

		var twidth = (e === undefined ? btn.eq(elem).outerWidth() : t.outerWidth());

		var xpos = (e === undefined ? btn.eq(elem).offset().left : t.offset().left);

		xpos = xpos-param.offset().left;

		obj.stop(true,false).animate({left:xpos,width:twidth},300,"easeInOutCubic");

		return true;
	}

	btn.on("click focusin",function(event){
		_current($(this),event.type);
		event.preventDefault();

	});

	$("#header").on("mouseleave focusout",function(event){
		_current($(this),event.type);

	});


	if(elem !== -1 && !isNaN(elem)){
		$(document).ready(function(){
			_current();

		});
	}

}

// 풀다운
function gnb(param,obj,btn,wrap,elem,dur,meth,mno){
	var param = $(param);
	var btn = param.find(btn);
	var obj = param.find(obj);
	var wrap = $(wrap);
	var elem = elem-1; // jsp 메뉴 코드가 1부터 시작하기 때문에
	var old_h = 90;
	var n = elem;

	var data = false;


	obj.hide();

	var th2 = obj.find("> li");
	$.each(th2,function(k){
		$(this).addClass("no"+(k+1));
	});

	var viewHeight = function viewHeight(){
		var openHeight = [];

		$.each(obj,function(e){
			openHeight[e] = $(this).parent().find(".th2").outerHeight(true)+btn.outerHeight() + 80;
		});

		//alert(openHeight);

		return openHeight;
	};

	function _current(s){
		if(!isNaN(s)){
			btn.eq(s).addClass("current");
			//obj.eq(s).addClass("current");
		}
	}

	wrap.white = wrap.find(".style");

	var fixedheight = viewHeight();


	function _open(){
		btn.parent().find(".th2").removeAttr("style");

		fixedheight = viewHeight();
		//obj.not(elem).removeClass("current").eq(elem).addClass("current");
		btn.not(elem).removeClass("current").eq(elem).addClass("current");
		wrap.stop(true,false).animate({"height":fixedheight[elem]},dur,meth);

		if(btn.not(elem).next().attr("id").match("summary")){
			btn.not(elem).next().hide().eq(elem).show();
		}

		obj.not(elem).hide().eq(elem).show();

		wrap.addClass("action");
		wrap.white.addClass("action");

		data = true;

		return true;
	}

	function _close(){
		btn.removeClass("current");
		obj.removeClass("current");
		wrap.stop(true,false).animate({"height":old_h},dur,meth);

		wrap.removeClass("action");
		wrap.white.removeClass("action");

		data = false;

		return true;
	}

	// -----

	btn.on("mouseenter focusin",function(){
		elem = $(this).parent().index();
		obj.not(elem).removeClass("current").eq(elem).addClass("current");
		_open();
		event.preventDefault();

	});


	obj.btn = obj.find(">li>a");
	obj.find("a").last().on("focusout",function(){
		_close();
		_current(n);
		obj.removeClass("current");

	});

	obj.btn.parent().on("mouseenter",function(){
		/*$(this).find(".th3").hide();*/
		$(this).addClass("ov");

	});

	obj.btn.parent().on("mouseleave",function(){
		/*$(this).find(".th3").hide();*/
		$(this).removeClass("ov");
		obj.removeClass("current");

	});

	param.on("mouseleave",function(){
		if(data === false){ return false; }
		_close();
		_current(n);
		obj.removeClass("current");

	});

	_current(n);

}

// 모바일
function gnb_open(param,obj,btn,index1,index2,index3,dur,meth,mno){
	var param = $(param);
	var obj = $(obj);
	var btn = $(btn);
	var index1 = index1-1;
	var index2 = index2;
	var index3 = index3;
	var n = index1;
	var w = param.outerWidth(true);
	var data = false;
	var str = location.href;

	param.find(".th2").hide();


	var _open = function(){
		$("#mo_sitelink").attr("onclick","return false;");

		obj.css({'overflow':'visible'}).animate({right:w},dur,meth,function(){
			clearTimeout(data.timeout);
			data.timeout = setTimeout(function(){
				$("#mo_sitelink").removeAttr("onclick");


			},1000);

		});

		$("#shadow_device").stop(true,true).fadeIn(dur/2);
		$("html,body").css({"overflow":"hidden","height":$(window).height()});
		param.show().css({opacity:1,height:$(window).height()});
		param.find(".th3").hide();

		if(!isNaN(index1)){
			param.stop(true,true).delay(dur/2)
				.animate({scrollTop:param.find(".th1_lnk").eq(index1).offset().top},dur,meth);

			var tobj2 = param.find(".th1_lnk").eq(index1).next().find(">li").eq(index2);
			tobj2.children().addClass("ov");

			var tobj3 = tobj2.find(".th3");
			if(tobj3.is($(".th3"))){
				tobj3.find("a").eq(index3).addClass("ov");
				param.stop(true,true).delay(dur).animate({scrollTop:tobj3.parent().offset().top},dur,meth,function(){
					tobj3.slideDown(150);
				});
			}
		}

		data = true;

	};

	var _close = function(){
		if($("#mo_sitelink").attr("onclick")){ $("#mo_sitelink").removeAttr("onclick"); }

		obj.stop(true,true).animate({right:0},dur,meth,function(){
			if(!isNaN(index1)){
				param.find(".th1_lnk").not(n).removeClass("ov").eq(n).addClass("ov").next().show();
			}else{
				param.find(".th1_lnk").removeClass("ov").next().hide();
			}

			param.hide();
		});

		$("#shadow_device").stop(true,true).fadeOut(dur/2,function(){
			$("html,body").removeAttr("style");
			obj.removeAttr("style");
			data = false;
		});

		param.stop(true,true).delay(dur).animate({opacity:0,scrollTop:0},0,meth);

	};

	btn.on("touchend click",function(event){
		if(data == false){
			_open();
		}else{
			_close();
		}

		$(window).resize(function(){
			_close();
		});

		event.preventDefault();
	});

	param.find("a").on("click",function(event){
		if(param.is(":animated") && param.find(":animated").size()){ return false; }
	});

	// 터치 아웃 영역
	$("#shadow_device").on("touchend click",function(event){
		_close();
	});

	// 트리메뉴 컨트롤
	if(!isNaN(index1)){
		param.find(".th1_lnk").not(index1).next().hide().eq(index1).show().prev().addClass("ov");
	}

	param.find(".th1_lnk").on("click",function(event){
		n = $(this).parent().index();

		if($(this).next().css("display") == "none"){
			param.find(".th1_lnk").not(n).removeClass("ov").next().stop(true,true).delay(150).slideUp(150);
			param.find(".th1_lnk").eq(n).addClass("ov").next().stop(true,true).slideDown(150);
		}

		event.preventDefault();
	});

	param.find(".th2>li>a").on("click",function(event){
		var t = $(this);

		if(t.next().attr("class").match("th3")){
			if(t.next().css("display") != "block"){
				t.addClass("ov");
				t.next().slideDown(150);
			}else{
				t.removeClass("ov");
				t.next().slideUp(150);
			}

			event.preventDefault();
		}
	});

}