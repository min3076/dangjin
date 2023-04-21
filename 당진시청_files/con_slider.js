var conCount = 1;

function conbXSlide(Obj,standard,isCount,evt){
	standard.moveTemp = standard.moveCntX-standard.startX;

	if(standard.isY && standard.isX){
		standard.moveCnt = conbgetMoveType(standard.startX ,standard.startY ,standard.moveCntX , standard.moveCntY );
	}
	standard.resultCnt = Math.abs(standard.moveTemp);
	if(standard.fingerCnt<2 && standard.moveCnt > -1){
		if(standard.moveCnt > 0 && standard.isX){
			if(standard.isY){
				standard.isX = false;
			}
		}else if(standard.moveCnt === 0){
            evt.preventDefault();
            evt.stopPropagation();
			standard.ismove2 = false;
			if(standard.isY){
				standard.isY = false;
			}
			if(standard.moveTemp>0 && !standard.isleft){
				standard.isleft = true;
				$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
			}
			if(standard.isleft){
				if(standard.moveTemp<0){
					standard.isleft = false;
					$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
					$(Obj.location).parent().css('left',0);
				}else{
					if(standard.resultCnt>standard.size){
						$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
						$(Obj.location).parent().css('left',-standard.size);
						standard.startX = standard.moveCntX;
						 conCount--;
                        if(conCount<0){
                            conCount = Obj.contentLen-1;
                        }
					}else{
						$(Obj.location).parent().css('left',standard.moveTemp-standard.size);
					}
				}
			}else{
				if(standard.resultCnt>standard.size){
					$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
					$(Obj.location).parent().css('left',0);
					standard.startX = standard.moveCntX;
					conCount++;
                    if(conCount>=Obj.contentLen){
                        conCount = 0;
                    }
				}else{
					$(Obj.location).parent().css('left',standard.moveTemp);
				}
			}
		}
	}
	return standard;
}

function conbXSlideEnd(Obj,standard,isCount){
	if(standard.ismove2){
		standard.moveTemp = 0;
	}
	if(Math.abs(standard.moveTemp)>standard.touchRec){
		if(standard.isleft){
			$(Obj.location).parent().stop().animate({'left':0},function(){
				standard.isleft = false;
				standard.ismove = true;
                
                conCount--;
                if(conCount<0){
                    conCount = Obj.contentLen-1;
                }
                $('#controlTab>ul>li').removeClass('on');
                $('#controlTab>ul>li:eq('+conCount+')').addClass('on');
                $('#conB>#container>div>div').removeClass('on');
                $('#conB>#container>div>div:first-child').addClass('on');
			});
		}else{
			$(Obj.location).parent().stop().animate({'left':-standard.size},function(){
				$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
				$(this).css('left',0);
				standard.ismove = true;
                
                conCount++;
                if(conCount>=Obj.contentLen){
                    conCount = 0;
                }
                $('#controlTab>ul>li').removeClass('on');
                $('#controlTab>ul>li:eq('+conCount+')').addClass('on');
                $('#conB>#container>div>div').removeClass('on');
                $('#conB>#container>div>div:first-child').addClass('on');
			});
		}
	}else{
		if(standard.isleft){
			standard.isleft = false;
			$(Obj.location).parent().stop().animate({'left':-standard.size},function(){
				$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
				$(this).css('left',0);
				standard.ismove = true;
                
                $('#controlTab>ul>li').removeClass('on');
                $('#controlTab>ul>li:eq('+conCount+')').addClass('on');
                $('#conB>#container>div>div').removeClass('on');
                $('#conB>#container>div>div:first-child').addClass('on');
			});
		}else{
			$(Obj.location).parent().stop().animate({'left':0},function(){
				standard.ismove = true;
                
                $('#controlTab>ul>li').removeClass('on');
                $('#controlTab>ul>li:eq('+conCount+')').addClass('on');
                $('#conB>#container>div>div').removeClass('on');
                $('#conB>#container>div>div:first-child').addClass('on');
			});
		}
	}
	return standard;
}

function conbXSlideCont(Obj,standard,isCount,evt){
	standard.moveTemp = standard.moveCntX-standard.startX;

	if(standard.isY && standard.isX){
		standard.moveCnt = conbgetMoveType(standard.startX ,standard.startY ,standard.moveCntX , standard.moveCntY );
	}
	standard.resultCnt = Math.abs(standard.moveTemp);
	if(standard.fingerCnt<2 && standard.moveCnt > -1){
		if(standard.moveCnt > 0 && standard.isX){
			if(standard.isY){
				standard.isX = false;
			}
		}else if(standard.moveCnt === 0){
            evt.preventDefault();
            evt.stopPropagation();
			standard.ismove2 = false;
			if(standard.isY){
				standard.isY = false;
			}
			if(standard.moveTemp>0){
				standard.isleft = true;
                if(standard.size<Math.abs(standard.moveTemp)){
                    $(Obj.location).parent().css('left',standard.size);
                }else{
				    $(Obj.location).parent().css('left',standard.moveTemp);
                }
			}else{
                standard.isleft = false;
                if(standard.size<Math.abs(standard.moveTemp)){
                    $(Obj.location).parent().css('left',-standard.size);
                }else{
				    $(Obj.location).parent().css('left',standard.moveTemp);
                }
            }
        }
	}
	return standard;
}

function conbXSlideEndCont(Obj,standard,isCount){
	if(standard.ismove2){
		standard.moveTemp = 0;
	}
	if(Math.abs(standard.moveTemp)>standard.touchRec){
		if(standard.isleft){
            $(Obj.location).removeClass('on');
            $(Obj.location+':first-child').addClass('on');
            $(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
            conCount--;
            if(conCount<1){
                conCount=Obj.contentLen;
            }
			$(Obj.location).parent().stop().animate({'left':0},function(){
				standard.isleft = false;
				standard.ismove = true;
			});
		}else{
            $(Obj.location).removeClass('on');
            $(Obj.location+':last-child').addClass('on');
            $(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
            $(this).css('left',-standard.size);
            conCount++;
            if(Obj.contentLen<conCount){
                conCount=1;
            }
			$(Obj.location).parent().stop().animate({'left':0},function(){
				standard.ismove = true;
			});
		}
	}else{
        standard.isleft = false;
        $(Obj.location).parent().stop().animate({'left':0},function(){
            $(this).css('left',0);
            standard.ismove = true;
        });
	}
	return standard;
}


function getIdx(sName){
    var nowIdx = 0;
    if(sName==='life'){
        nowIdx = 0;
    }else if(sName==='admin'){
        nowIdx = 1;
    }else if(sName==='civil'){
        nowIdx = 2;
    }
    return nowIdx;
}

function conbgetMoveType(sx,sy,x,y) {
	var nHSlope = ((window.innerHeight / 2) / window.innerWidth).toFixed(2) * 1;
    var nMoveType = -1;

    var nX = Math.abs(sx- x);
    var nY = Math.abs(sy- y);
    var nDis = nX + nY;
    if(nDis < 15) { return nMoveType }

    var nSlope = parseFloat((nY / nX).toFixed(2), 10);

    if(nSlope > nHSlope) {
        nMoveType = 1;
    } else {
        nMoveType = 0;
    }
    return nMoveType;
}

/* ���� �����̵� */
function conbSlide(Obj){
	var isTouch = false;
	var isTouchRec = false;
	var isAuto = false;
	var isNext = false;
	var isPrev = false;
	var isStop = false;
	var isCount = false;
	var isNextSpeed = false;
	var isPrevSpeed = false;
    
    var isControl = false;
	/* Validation  start------------------------------------------------------ */

	/* location */
	if(Obj.location!=undefined){
		if(typeof(Obj.location)!=typeof('')){
			console.log('location�� ���� String���θ� �Է��� �ּ���.');
		}
	}else{
		console.log('location�� �ʼ� �Է°� �Դϴ�. �ݵ�� �Է��� �ּ���');
	}

	/* position */
	if(Obj.position!=undefined){
		if(typeof(Obj.position)!=typeof('')){
			console.log('position�� ���� String���θ� �Է��� �ּ���.');
		}
	}else{
		console.log('position�� �ʼ� �Է°� �Դϴ�. �ݵ�� �Է��� �ּ���');
	}

	/* touch */
	if(Obj.touch!=undefined){
		if(Obj.touch[1] != undefined){
			if(typeof(Obj.touch[0])!=typeof(false)){
				console.log('touch�� ���� Boolean���θ� �Է��� �ּ���.');
			}else if(isNaN(Obj.touch[1])){
				console.log('touch�� �ν� ���� Number�θ� �Է��� �ּ���.');
			}else{
				isTouch = Obj.touch[0];	
				isTouchRec = true;
			}
		}else{
			if(typeof(Obj.touch)!=typeof(false)){
				console.log('touch�� ���� Boolean���θ� �Է��� �ּ���.');
			}else if(Obj.touch===true){
				isTouch = true;
			}	
		}
		
	}

	/* next */
	if(Obj.next!=undefined){
		if(typeof(Obj.next) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('next�� ���� String���θ� �Է��� �ּ���.');
			}else if(isNaN(Obj.next[1])){
				console.log('next�� speed ���� Number�θ� �Է��� �ּ���.');
			}else{
				isNext = true;
				isNextSpeed = true;
			}
		}else{
			if(typeof(Obj.next)!=typeof('')){
				console.log('next�� ���� String���θ� �Է��� �ּ���.');
			}else{
				isNext = true;
			}
		}
	}

	/* prev */
	if(Obj.prev!=undefined){
		if(typeof(Obj.prev) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('prev�� ���� String���θ� �Է��� �ּ���.');
			}else if(isNaN(Obj.prev[1])){
				console.log('prev�� speed ���� Number�θ� �Է��� �ּ���.');
			}else{
				isPrev = true;
				isPrevSpeed = true;
			}
		}else{
			if(typeof(Obj.prev)!=typeof('')){
				console.log('prev�� ���� String���θ� �Է��� �ּ���.');
			}else{
				isPrev = true;
			}
		}
	}

    if(Obj.control != undefined){
        if(typeof(Obj.control)!=typeof(true)){
            console.log('control�� ���� Boolean���� �Է��� �ּ���');
        }else{
            isControl = Obj.control;
        }
    }
	/* Validation  end------------------------------------------------------ */

	
	var standard = {
		parent:  $(Obj.location).parent(),
		listLen : $(Obj.location).length,
		size : 0,
		isMv : true,
		autoSet: null,
		autoTime: 3500,
		mvSpeed: 300,
		interval: null,
		isInterval: false,
		count: 1,
		fingerCnt: 0,
		ismove: true,
		ismove2: true,
		isleft: false,
		moveCntX: 0,
		moveCntY: 0,
		moveCnt: -1,
		moveTemp: 0,
		resultCnt: 0,
		startX: 0,
		startY: 0,
		isX: true,
		isY: true,
		touchRec: 80,
		nextSpeed: 300,
		prevSpeed: 300,
	}
	if(isTouchRec){
		standard.touchRec = Obj.touch[1];
	}
	if(isNextSpeed){
		standard.nextSpeed = Obj.next[1];
		Obj.next = Obj.next[0];
	}
	if(isPrevSpeed){
		standard.prevSpeed = Obj.prev[1];
		Obj.prev = Obj.prev[0];
	}
	/* Click Slide start---------------------------------------------------- */
	if(Obj.position=='top'){
		standard.size = $(Obj.location).outerHeight(true);
	}else if(Obj.position=='left'){
		standard.size = $(Obj.location).outerWidth(true);
	}
	$(window).resize(function(){
		if(Obj.position=='top'){
			standard.size = $(Obj.location).outerHeight(true);
		}else if(Obj.position=='left'){
			standard.size = $(Obj.location).outerWidth(true);
		}
	});

	if(isNext){
		$(Obj.next).on('click',function(){
			if(!standard.isInterval){
				clearInterval(standard.interval);
			}
			standard.isInterval = true;
			if(standard.isMv && standard.listLen>1){
				standard.isMv = false;
				if(Obj.position === 'left'){
					$(standard.parent).stop().animate({'left':(-standard.size)},standard.nextSpeed,function(){
						$(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
						$(this).css('left',0);
						standard.isMv = true;
						if(isCount){
							standard.count++;
							if(standard.count>standard.listLen){
								standard.count = 1;
							}
							$(Obj.count).html(standard.count);
						}
					});
				}else{
					$(standard.parent).stop().animate({'top':(-standard.size)},standard.nextSpeed,function(){
						$(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
						$(this).css('top',0);
						standard.isMv = true;
						if(isCount){
							standard.count++;
							if(standard.count>standard.listLen){
								standard.count = 1;
							}
							$(Obj.count).html(standard.count);
						}
					});

				}
			}
			return false;
		});
	}
	if(isPrev){
		$(Obj.prev).on('click',function(){
			if(!standard.isInterval){
				clearInterval(standard.interval);
			}
			standard.isInterval= true;
			if(standard.isMv && standard.listLen>1){
				standard.isMv = false;
				$(Obj.location+':last-child').insertBefore($(Obj.location+':first-child'));
				if(Obj.position === 'left'){
				$(standard.parent).css('left',(-standard.size));
				$(standard.parent).stop().animate({'left':0},standard.prevSpeed ,function(){
					standard.isMv = true;
					if(isCount){
						standard.count--;
						if(standard.count<1){
							standard.count = standard.listLen;
						}
						$(Obj.count).html(standard.count);
					}
				});
				}else{
					$(standard.parent).css('top',(-standard.size));
					$(standard.parent).stop().animate({'top':0},standard.prevSpeed ,function(){
						standard.isMv = true;
						if(isCount){
							standard.count--;
							if(standard.count<1){
								standard.count = standard.listLen;
							}
							$(Obj.count).html(standard.count);
						}
					});
				}
			}
			return false;
		});
	}
	/* Click Slide end---------------------------------------------------- */

	/* touch Slide start-------------------------------------------------- */
	if(standard.listLen>1 && isTouch){
		if(Obj.position === 'top'){
			$(standard.parent).css('touch-action','none');
		}
		$(standard.parent).on('touchstart',function(starteven){
            if(Obj.position=='top'){
                standard.size = $(Obj.location).outerHeight(true);
            }else if(Obj.position=='left'){
                standard.size = $(Obj.location).outerWidth(true);
            }
			if(!standard.isInterval){
				clearInterval(standard.interval);
				standard.isInterval = true;
			}
			var se = starteven.originalEvent; 
			standard.fingerCnt = se.touches.length;
			standard.startX = se.touches[0].clientX; 
			standard.startY = se.touches[0].clientY;
		});
		$(standard.parent).on('touchmove', function(moveeven) {
			var me = moveeven.originalEvent;
            
			standard.moveCntX = me.touches[0].clientX;
			standard.moveCntY = me.touches[0].clientY;
			if(standard.ismove){
                if(isControl){
                    standard = conbXSlideCont(Obj,standard,isCount,me);        
                }else{
                    standard = conbXSlide(Obj,standard,isCount,me);        
                }
                
			}
		});
		$(standard.parent).on('touchend',function(){
			if(standard.fingerCnt<2 && standard.ismove){
				standard.ismove = false;
                if(isControl){
                    standard = conbXSlideEndCont(Obj,standard,isCount);
                }else{
                    standard = conbXSlideEnd(Obj,standard,isCount);    
                }
			}
			standard.startX = 0;
			standard.startY = 0;
			standard.moveCntX = 0;
			standard.moveCntY = 0;
			standard.moveTemp = 0;
			standard.ismove2 = true;
			standard.isX = true;
			standard.isY = true;
			standard.mvCnt = -1;
		});
	}
	/* touch Slide end-------------------------------------------------- */
    
    if(isControl){
        $(Obj.location).on('click',function(){
            var nowNm = $(this).children('a').attr('class');
            var nowIdx = getIdx(nowNm);
            //var nowIdx = $(this).index(Obj.location);
            if(conCount!=nowIdx && standard.isMv){
                $(Obj.location).removeClass('on');
                $(Obj.location+':eq('+nowIdx+')').addClass('on');
                var mvLeft = $('#conB>#container>div>#'+nowNm).offset().left;
                var mvIdx = nowIdx-conCount;
                standard.isMv = false;
                if((nowIdx-conCount)>0){
                    conCount = nowIdx;
                    $('#conB>#container>div:eq(1)').animate({left:-mvLeft},500,function(){
                        $('#conB>#container>div>div').slice(0,Math.abs(mvIdx)).insertAfter('#conB>#container>div>div:last-child');
                        $(this).css('left',0);
                        $('#conB>#container>div>div').removeClass('on');
                        $('#conB>#container>div>div:first-child').addClass('on');
                        standard.isMv = true;
                    });
                }else{
                    conCount = nowIdx;
                    mvLeft = $('#conB>#container>div>div:eq('+Math.abs(mvIdx)+')').offset().left;
                    mvIdx = Obj.contentLen-Math.abs(mvIdx);
                    var tmpObj = $('#conB>#container>div>div').slice(mvIdx);
                    $('#conB>#container>div>div').slice(mvIdx).insertBefore('#conB>#container>div>div:first-child');
                    $('#conB>#container>div:eq(1)').css('left',-mvLeft);
                    $('#conB>#container>div:eq(1)').animate({left:0},500,function(){
                        $('#conB>#container>div>div').removeClass('on');
                        $('#conB>#container>div>div:first-child').addClass('on');
                        standard.isMv = true;
                    });
                }
            }
        });
    }
}