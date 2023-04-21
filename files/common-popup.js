function popzone(param,btn,obj,auto,f,s,p,h){
	var param = $(param);
	var btn = param.find(btn);
	var obj = param.find(obj);

	var stop = btn.find("[data-type=stop]");
	var play = btn.find("[data-type=play]");

	var returnNodes; // 버튼 이벤트를 위해 반복 명령 받아두기
	var elem = 0;
	var fade = f;
	var speed = s;
	var data = "";

	// setup
	obj.hide().eq(0).show();

	//페이징
	if(p.use==true){
		var target = param.find(p.path);
		target.html("");

		if(p.type == null){
			$.each(obj,function(e){
				target.append('<button class="ir" type="button">'+(e+1)+'</button>\n');
			});
			var pbtn = target.find("button");

			pbtn.not(elem).removeClass("ov").eq(elem).addClass("ov");
			pbtn.on("click",function(event){
				clearInterval(returnNodes);
				var t = $(this);
				elem = t.index();
				pbtn.not(elem).removeClass("ov").eq(elem).addClass("ov");
				obj.not(elem).stop(false,true).fadeOut(f/2).eq(elem).stop(false,true).fadeIn(f/2);
				stop.css({'display':'none'});
				play.css({'display':'inline-block'});
				event.preventDefault();
			});
		}

		if(p.type == 1){
			target.html("<i>"+(elem+1)+"</i>/"+obj.length);
		}
	}

	function init(n){
		if(data == "prev"){
			if(elem != 0) elem--; else elem = obj.length-1;	 
		}else{
			if(elem<obj.length-1) elem++; else elem = 0;
		}		

		if(p.use==true){
			if(p.type == null) pbtn.not(elem).removeClass("ov").eq(elem).addClass("ov");
			if(p.type == 1) target.children().text(elem+1);
		}

		obj.not(elem).stop(true,true).fadeOut(n).eq(elem).stop(true,true).fadeIn(n);
	}

	function rotate(){ returnNodes = setInterval(function(){ init(f); },speed); } // 초단위 반복

	if(h==true) play.hide();
	if(obj.length <= 1 ){
		// 팝업 갯수가 하나면 컨트롤을 지우고 실행하지않습니다.
		btn.hide();
		return false;
	}

	if(auto != false) rotate();
	
	// 포커스 들어오면 멈춤
	obj.children().on("focusin",function(){
		clearInterval(returnNodes);
	});

	// 멈춤
	btn.find("[data-type=stop]").on("click",function(event){
		clearInterval(returnNodes);
		if(h==true){
			stop.css({'display':'none'});
			play.css({'display':'inline-block'});
		}
		event.preventDefault();
	});
	
	// 시작
	btn.find("[data-type=play]").on("click",function(event){
		clearInterval(returnNodes);
		if(h==true){
			play.css({'display':'none'});
			stop.css({'display':'inline-block'});
		}
		rotate();
		event.preventDefault();
	});
	
	// 이전
	btn.find("[data-type=prev]").on("click",function(event){
		clearInterval(returnNodes);
		data = "prev";
		init(f/2);
		if(h==true){
			stop.css({'display':'none'});
			play.css({'display':'inline-block'});
		}
		event.preventDefault();
	});
	
	// 다음
	btn.find("[data-type=next]").on("click",function(event){
		clearInterval(returnNodes);
		data = "next";
		init(f/2);
		if(h==true){
			stop.css({'display':'none'});
			play.css({'display':'inline-block'});
		}
		event.preventDefault();
	});


	// 터치 이벤트  플리킹 구현
	var xStartpoint,xEndpoint;

	function docSTART(event){
		if(event.originalEvent.changedTouches != undefined){
			xStartpoint = Math.floor(event.originalEvent.changedTouches[0].clientX - $(this).offset().left);
		}
	}

	function docEND(event){
		if(event.originalEvent.changedTouches != undefined){
			xEndpoint = Math.floor(event.originalEvent.changedTouches[0].clientX - $(this).offset().left) - xStartpoint;
		
			if(xEndpoint < -50){ 
				data = "next";
			}else if(xEndpoint > 50){
				data = "prev";
			}else{
				return true;
			} 

			clearInterval(returnNodes);
			init(f/2);
			if(h==true){
			stop.css({'display':'none'});
			play.css({'display':'inline-block'});
			}

			event.preventDefault();
		}
	}

	param.on("touchstart",docSTART);
	param.on("touchend",docEND);
}