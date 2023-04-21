var isPc = true;
var touchRange = 80;
var isOne = false;
var contentLen = 0;
var agent = navigator.userAgent.toLowerCase();
var isMain = true;
var scrollTopTag = 'html';


if (agent.indexOf("safari")>-1 && agent.indexOf("chrome")==-1) {
    scrollTopTag = 'body';
}
var mainScroll = {
        aTop : 0,
        bTop : 0,
        fTop : 0,
        fsize : 0,
        cnt : 0,
        tmpCnt:0,
        tmpCnt2:0,
        max : 4,
        isMv : false,
        interval : null,
        isInterval : false,
        isFirst: true,
        isLast: false
    }

function conbBtnPcClick(){
    if(!mainScroll.isMv){
        var thisClass = $(this).children("a").attr("class");
        if(thisClass=="life"){
           mainScroll.cnt=1;
        }else if(thisClass=="civil"){
            mainScroll.cnt=2;
        }else{
            mainScroll.cnt=3;
        }
        if($(window).outerWidth(true)>1280){
            mainScroll.isMv = true;
            //conb 화면으로 스크롤 올림
            $('html').animate({'scrollTop':mainScroll.bTop},500,function(){
                mainScroll.isMv = false;
            });
            $('#quick div.con').animate({'top':0},500);

            mainScroll.tmpCnt = $(this).index("#controlTab>ul>li");
            if(mainScroll.tmpCnt>1){
                $("#controlTab>ul>li:first-child").insertAfter("#controlTab>ul>li:last-child");
            }else{
                $("#controlTab>ul>li:last-child").insertBefore("#controlTab>ul>li:first-child");
            }

            $("#"+thisClass).siblings().removeClass("on").addClass("off");
            $("#"+thisClass).removeClass("off").addClass("on");

            $("#controlTab>ul>li").removeClass("on");
            $("#controlTab>ul>li:eq(1)").addClass("on");



            $("#container>div:eq(1)>div.on div[class^=con]>div").animate({left:0},500);
            $("#container>div:eq(1)>div.off div[class^=con]>div").css("left","");
        }else{
            mainScroll.isMv = true;
            mainScroll.tmpCnt = $(this).index("#controlTab>ul>li");
            if(mainScroll.tmpCnt>1){
                    $("#container>div:eq(1)").stop().animate({left:-$("#container>div>div:eq(1)").outerWidth(true)},function(){
                    $(this).css("left",0);
                    $("#container>div:eq(1)>div:first-child").insertAfter("#container>div:eq(1)>div:last-child");
                    $("#controlTab>ul>li:first-child").insertAfter("#controlTab>ul>li:last-child");

                    $("#"+thisClass).siblings().removeClass("on").addClass("off");
                    $("#"+thisClass).removeClass("off").addClass("on");

                    $("#controlTab>ul>li").removeClass("on");
                    $("#controlTab>ul>li:eq(1)").addClass("on");
                    mainScroll.isMv = false;
                });
            }else if(mainScroll.tmpCnt<1){
                $("#container>div:eq(1)>div:last-child").insertBefore("#container>div:eq(1)>div:first-child");
                $("#container>div:eq(1)").css("left",(-$("#container>div>div:eq(1)").outerWidth(true)));
                $("#container>div:eq(1)").stop().animate({left:0},function(){
                    $("#controlTab>ul>li:last-child").insertBefore("#controlTab>ul>li:first-child");
                    $("#"+thisClass).siblings().removeClass("on").addClass("off");
                    $("#"+thisClass).removeClass("off").addClass("on");

                    $("#controlTab>ul>li").removeClass("on");
                    $("#controlTab>ul>li:eq(1)").addClass("on");
                    mainScroll.isMv = false;
                });
            }
        }
    }
}

function conbScroll(isScrolllDown){
	$('#relationSelect>div>div>ul').slideUp();
    $(scrollTopTag).animate({'scrollTop':mainScroll.bTop},500);
    var thisClass = "";
    if(mainScroll.cnt==1){
        thisClass="admin";
    }else if(mainScroll.cnt==2){
        thisClass="civil"; 
    }else{
        thisClass="life";
    }
    //if($(window).outerWidth(true)>1280){
        $("#controlTab>ul>li:first-child").insertAfter("#controlTab>ul>li:last-child");

        $("#"+thisClass).siblings().removeClass("on").addClass("off");
        $("#"+thisClass).removeClass("off").addClass("on");

        $("#controlTab>ul>li").removeClass("on");
        $("#controlTab>ul>li:eq(1)").addClass("on");



        $("#container>div:eq(1)>div.on div[class^=con]>div").animate({left:0},500,function(){
            mainScroll.isMv = false;
        });
        $("#container>div:eq(1)>div.off div[class^=con]>div").css("left","");
        
}

function mainScrollFnc(e){
	VKI_close();
    if(isPc){
        var UpDown = e.wheelDelta?e.wheelDelta:-e.detail;
        
        e.preventDefault ? e.preventDefault() : (e.returnValue = false);
        
        if(!mainScroll.isMv && !$('#quick>div.con>div').hasClass('on')){
            if(UpDown<0){ // 스크롤 내림
                mainScroll.isMv = true;
                if(mainScroll.cnt===mainScroll.max){
                    mainScroll.isMv = false;
                }else{ 
                    mainScroll.isMv = true;
                    mainScroll.cnt++;

                    if(mainScroll.cnt>(mainScroll.max-1)){
                        mainScroll.cnt = 1//mainScroll.max;
                    }
                    if(mainScroll.cnt===1 && mainScroll.isFirst){
                        $(scrollTopTag).animate({'scrollTop':mainScroll.bTop},800,function(){
                            mainScroll.isFirst = false;
                            mainScroll.isMv = false;
                            $('#skipnav>a[href="#contents"]').focus();
                        });
                    }else if(mainScroll.cnt<mainScroll.max){    // conb 콘텐츠 스크롤
                        conbScroll(UpDown<0);
                    }else{  // 하단 푸터
                       var sTop = $(document).scrollTop();
                       if(!mainScroll.isInterval){
                            mainScroll.isInterval = true;
                            mainScroll.interval = setInterval(function(){
                                var tmpTop = $(document).scrollTop()-sTop;
                                if(tmpTop>mainScroll.fsize){
                                    tmpTop=mainScroll.fsize;
                                }
                                $('#quick div.con').css("top",-tmpTop);
                            },1);
                        }

                        $(scrollTopTag).animate({'scrollTop':mainScroll.fTop},1200,function(){
                            clearInterval(mainScroll.interval);
                            mainScroll.isInterval = false;
                            mainScroll.isMv = false;
                        });  
                    }
                }
            }else{  // 스크롤 올림
                if(!mainScroll.isMv){
                    mainScroll.isMv = true;
                    mainScroll.cnt--;

                    if(mainScroll.cnt<0){
                        mainScroll.cnt = 3;
                    }
                    if(mainScroll.isLast){
						$('#relationSelect>div>div>ul').slideUp();
                        mainScroll.cnt = mainScroll.tmpCnt2;
                        mainScroll.isLast = false;

                        var sTop = $(document).scrollTop();

                        $('#quick div.con').animate({'top':0},500);

                        $(scrollTopTag).animate({'scrollTop':mainScroll.bTop},600,function(){
                            clearInterval(mainScroll.interval);
                            mainScroll.isInterval = false;
                            mainScroll.isMv = false;
                        });
                    }else if(mainScroll.cnt>0){ 
                         conbScroll(UpDown<0);
                    }else if(mainScroll.cnt===0){
                        mainScroll.cnt=0;
                        mainScroll.isMv = false;
                        return false;

                    }
                }
            }
        }
    }
    return false;
}


$(function(){
    mainScroll.aTop = $('#conA').offset().top;
    mainScroll.bTop = $('#conB').offset().top;
    mainScroll.fTop = $('footer').offset().top;
    mainScroll.fsize = $('footer').outerHeight(true);
    contentLen = $("#conB>#container>div>div").length;
    
    
    
   
  
    
    
    if($(window).outerWidth(true)>1280){   // pc
        $("#container>div:eq(1)>div.on div[class^=con]>div").css("left",0);
        
        isPc = true;
        $("#controlTab>ul>li").on("click",conbBtnPcClick);
        
        var doc_conA = document.getElementById('conA');
        var doc_conB = document.getElementById('conB');
        // 파이어폭스 브라우저 예외처리
        if (agent.indexOf("firefox")>-1) {
            document.addEventListener('DOMMouseScroll',mainScrollFnc,false);
        }else{
            document.addEventListener('mousewheel',mainScrollFnc,{passive:false});
        }
    }else{  // mobile
        isPc = false;
        
        $("#civil>div.box>div.pZone>div>div>div.linkp").css("display","");
        $("#life>div.box>div.pZone>div>div>div.linkp").css("display","");
        
        // control
        conbSlide({
            location: "#controlTab>ul>li",	
            position: "left",
            touch: [false , 120],
            control: true,
            contentLen:contentLen
        });
        
    }
    
     $(window).resize(function(){
        if($(window).outerWidth(true)>1280){   // pc
            isPc = true;
            isOne = true;
            mainScroll.cnt = 0;
            mainScroll.isMv = false;
            $(window).scrollTop(0);
            
            try{
                $('#civil>div.box>div.pZone>div>div>div').css("display","none");
                $('#civil>div.box>div.pZone>div>div:eq(0)>div').css("display","block");
                $('#civil>div.box>div.pZone>div>div:eq(1)>div').css("display","block");

                $('#admin>div.box>div.pZone>div>div>div').css("display","none");
                $('#admin>div.box>div.pZone>div>div:eq(0)>div').css("display","block");
                $('#admin>div.box>div.pZone>div>div:eq(1)>div').css("display","block");
            }catch(e){}
            
            $('#controlTab>ul>li').off('click');
            $("#controlTab>ul>li").on("click",conbBtnPcClick);
            $("#admin_btn").insertAfter("#life_btn");
            $("#civil_btn").insertAfter("#admin_btn");
            
             if($(window).outerWidth(true)>1280){
                $("#admin").insertAfter("#life");
                $("#civil").insertAfter("#admin");

                $("#container>div:eq(1)>div").removeClass("on").addClass("off");
                $("#container>div:eq(1)>div:eq(1)").removeClass("off").addClass("on");

                $("#controlTab>ul>li").removeClass("on");
                $("#controlTab>ul>li:eq(1)").addClass("on");
                $("#container>div:eq(1)>div.on div[class^=con]>div").css("left",0);
            }else{
                $("#life").insertAfter("#civil");
                $("#civil").insertAfter("#admin");
            }

        }else{  // mobile
            isPc = false;
            conCount = 1;
            $("#civil>div.box>div.pZone>div>div>div.linkp").css("display","");
            $("#life>div.box>div.pZone>div>div>div.linkp").css("display","");
            if(isOne){
                $("#admin").insertAfter("#life");
                $("#life").insertAfter("#admin");
                
                $("#container>div:eq(1)>div").removeClass("on").addClass("off");
                $("#container>div:eq(1)>div:eq(0)").removeClass("off").addClass("on");

                $("#admin_btn").insertAfter("#life_btn");
                $("#civil_btn").insertAfter("#admin_btn");
                
                $("#controlTab>ul>li").removeClass("on");
                $("#controlTab>ul>li:eq(1)").addClass("on");

                isOne = false;
                $('#controlTab>ul>li').off('click');
                // control
                conbSlide({
                    location: "#controlTab>ul>li",	
                    position: "left",
                    touch: [false , 120],
                    control: true,
                    contentLen:contentLen
                });
                

            }
        }
        
        mainScroll.aTop = $('#conA').offset().top;
        mainScroll.bTop = $('#conB').offset().top;
        mainScroll.fTop = $('footer').offset().top;
        mainScroll.fsize = $('footer').outerHeight(true);
    });
    
    // 바로가기 슬라이드
    goListCnt = 0;
    goListSlide("#goList",(touchRange-20));
    
    // content
    conbSlide({
        location: "#conB>#container>div>div",	
        position: "left",
        touch: [true , touchRange],
        contentLen:contentLen
    });
    
    // 행정 팝업존
    visualSlideUtil({
        location: "#admin>div.box>div.con1>div.pZone>div.list>ul>li",		
        position: "left",			
        touch: [true , touchRange],			
        auto: [isPc , 5000,650],
        next: ["#admin>div.box>div.con1>div.pZone>ul.control>li>a.topPzoneNext", 400],	
        prev: ["#admin>div.box>div.con1>div.pZone>ul.control>li>a.topPzonePrev", 400],
        stop: "#admin>div.box>div.con1>div.pZone>ul.control>li>a.topPzoneStop",
        clone: true
    });

	// 민원 팝업존
    visualSlideUtil({
        location: "#civil>div.box>div.con1>div.pZone>div.list>ul>li",		
        position: "left",			
        touch: [true , touchRange],			
        auto: [isPc , 5000,650],
        next: ["#civil>div.box>div.con1>div.pZone>ul.control>li>a.topPzoneNext", 400],	
        prev: ["#civil>div.box>div.con1>div.pZone>ul.control>li>a.topPzonePrev", 400],
        stop: "#civil>div.box>div.con1>div.pZone>ul.control>li>a.topPzoneStop",
        clone: true
    });

	// 생활 팝업존
    visualSlideUtil({
        location: "#life>div.box>div.con1>div.pZone>div.list>ul>li",		
        position: "left",			
        touch: [true , touchRange],			
        auto: [isPc , 5000,650],
        next: ["#life>div.box>div.con1>div.pZone>ul.control>li>a.topPzoneNext", 400],	
        prev: ["#life>div.box>div.con1>div.pZone>ul.control>li>a.topPzonePrev", 400],
        stop: "#life>div.box>div.con1>div.pZone>ul.control>li>a.topPzoneStop",
        clone: true
    });






    
    
});