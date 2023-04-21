function XSlide(Obj,standard,isCount,evt){
	standard.moveTemp = standard.moveCntX-standard.startX;

	if(standard.isY && standard.isX){
		standard.moveCnt = getMoveType(standard.startX ,standard.startY ,standard.moveCntX , standard.moveCntY );
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
						if(isCount){
							standard.count--;
							if(standard.count<1){
								standard.count = standard.listLen;
							}
							$(Obj.count).html(standard.count);
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
					if(isCount){
						standard.count++;
						if(standard.count>standard.listLen){
							standard.count = 1;
						}
						$(Obj.count).html(standard.count);
					}
				}else{
					$(Obj.location).parent().css('left',standard.moveTemp);
				}
			}
		}
	}
	return standard;
}

// 남동구청 전용========================================
function XSlideClone(Obj,standard,isCount,evt){
	standard.moveTemp = standard.moveCntX-standard.startX;

	if(standard.isY && standard.isX){
		standard.moveCnt = getMoveType(standard.startX ,standard.startY ,standard.moveCntX , standard.moveCntY );
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
			if(standard.moveTemp>0 && !standard.isleft){ //  첫 움직임이 왼쪽일경우
				standard.isleft = true;
                //standard.isClone = true;
				//$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
                if(standard.isClone){
                    standard.isClone = false;
                    $(Obj.location+':last-child').remove();
                }
                if(!standard.isClone){
                    standard.isClone = true;
                    var ObjTmp = $(Obj.location+':last-child').clone(true);
                    ObjTmp.insertBefore(Obj.location+':first-child');
                }
			}
			if(standard.isleft){
				if(standard.moveTemp<0){
					standard.isleft = false;
					//$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
                    if(standard.isClone){
                        standard.isClone = false;
                        $(Obj.location+':first-child').remove();
                    }
					$(Obj.location).parent().css('left',0);
				}else{
					if(standard.resultCnt>standard.size){
                        if(standard.isClone){
                           standard.isClone = false;
                           $(Obj.location+':last-child').remove();
                        }
                       
                        //$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
                        $(Obj.location).parent().css('left',0);
                        //standard.startX = standard.moveCntX;
						if(isCount){
							standard.count--;
							if(standard.count<1){
								standard.count = standard.listLen;
							}
							$(Obj.count).html(standard.count);
						}
					}else{
						$(Obj.location).parent().css('left',standard.moveTemp-standard.size);
					}
				}
			}else{
				if(standard.resultCnt>standard.size){
					//$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
                    if(standard.isClone){
                        standard.isClone = false;
                        $(Obj.location+':first-child').remove();
                    }

					$(Obj.location).parent().css('left',0);
					standard.startX = standard.moveCntX;
					if(isCount){
						standard.count++;
						if(standard.count>standard.listLen){
							standard.count = 1;
						}
						$(Obj.count).html(standard.count);
					}
				}else{
					$(Obj.location).parent().css('left',standard.moveTemp);
                    if(!standard.isClone){
                        standard.isClone = true;
                        var ObjTmp = $(Obj.location+':first-child').clone(true);
                        ObjTmp.insertAfter(Obj.location+':last-child');
                    }
				}
			}
		}
	}
	return standard;
}

function XSlideEndClone(Obj,standard,isCount){
	if(standard.ismove2){
		standard.moveTemp = 0;
	}
	if(Math.abs(standard.moveTemp)>standard.touchRec){
		if(standard.isleft){
			$(Obj.location).parent().stop().animate({'left':0},function(){
				standard.isleft = false;
				standard.ismove = true;
                if(standard.isClone){
                    standard.isClone = false;
                    $(Obj.location+':last-child').remove();
                }
                
				if(isCount){
					standard.count--;
					if(standard.count<1){
						standard.count = standard.listLen;
					}
					$(Obj.count).html(standard.count);
				}
			});
		}else{
			$(Obj.location).parent().stop().animate({'left':-standard.size},function(){
                if(standard.isClone){
                    standard.isClone = false;
                    $(Obj.location+':first-child').remove();
                }else{
                  $(Obj.location+':first-child').insertAfter(Obj.location+':last-child');  
                }
                
				$(this).css('left',0);
				standard.ismove = true;
				if(isCount){
					standard.count++;
					if(standard.count>standard.listLen){
						standard.count = 1;
					}
					$(Obj.count).html(standard.count);
				}
			});
		}
	}else{
		if(standard.isleft){
			standard.isleft = false;
			$(Obj.location).parent().stop().animate({'left':-standard.size},function(){
				//$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
                if(standard.isClone){
                    standard.isClone = false;
                    $(Obj.location+':first-child').remove();
                }
				$(this).css('left',0);
				standard.ismove = true;
			});
		}else{
			$(Obj.location).parent().stop().animate({'left':0},function(){
                standard.isleft = false;
				standard.ismove = true;
			});
		}
	}
	return standard;
}

//========================================

function YSlide(Obj,standard,isCount,evt){
	standard.moveTemp = standard.moveCntY-standard.startY;
	if(standard.isY && standard.isX){
		standard.moveCnt = getMoveType(standard.startX ,standard.startY ,standard.moveCntX , standard.moveCntY );
	}
	standard.resultCnt = Math.abs(standard.moveTemp);
	if(standard.fingerCnt<2 && standard.moveCnt > -1){
		if(standard.moveCnt < 1 && standard.isY){
			if(standard.isX){
				standard.isY = false;
			}
		}else if(standard.moveCnt === 1){
            evt.preventDefault();
            evt.stopPropagation();
			standard.ismove2 = false;
			if(standard.isX){
				standard.isX = false;
			}
			if(standard.moveTemp>0 && !standard.isleft){
				standard.isleft = true;
				$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
			}
			if(standard.isleft){
				if(standard.moveTemp<0){
					standard.isleft = false;
					$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
					$(Obj.location).parent().css('top',0);
				}else{
					if(standard.resultCnt>standard.size){
						$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
						$(Obj.location).parent().css('top',-standard.size);
						standard.startY = standard.moveCntY;
						if(isCount){
							standard.count--;
							if(standard.count<1){
								standard.count = standard.listLen;
							}
							$(Obj.count).html(standard.count);
						}
					}else{
						$(Obj.location).parent().css('top',standard.moveTemp-standard.size);
					}
				}
			}else{
				if(standard.resultCnt>standard.size){
					$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
					$(Obj.location).parent().css('top',0);
					standard.startY = standard.moveCntY;
					if(isCount){
						standard.count++;
						if(standard.count>standard.listLen){
							standard.count = 1;
						}
						$(Obj.count).html(standard.count);
					}
				}else{
					$(Obj.location).parent().css('top',standard.moveTemp);
				}
			}
		}
	}
	return standard;
}

function XSlideEnd(Obj,standard,isCount){
	if(standard.ismove2){
		standard.moveTemp = 0;
	}
	if(Math.abs(standard.moveTemp)>standard.touchRec){
		if(standard.isleft){
			$(Obj.location).parent().stop().animate({'left':0},function(){
				standard.isleft = false;
				standard.ismove = true;
				if(isCount){
					standard.count--;
					if(standard.count<1){
						standard.count = standard.listLen;
					}
					$(Obj.count).html(standard.count);
				}
			});
		}else{
			$(Obj.location).parent().stop().animate({'left':-standard.size},function(){
				$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
				$(this).css('left',0);
				standard.ismove = true;
				if(isCount){
					standard.count++;
					if(standard.count>standard.listLen){
						standard.count = 1;
					}
					$(Obj.count).html(standard.count);
				}
			});
		}
	}else{
		if(standard.isleft){
			standard.isleft = false;
			$(Obj.location).parent().stop().animate({'left':-standard.size},function(){
				$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
				$(this).css('left',0);
				standard.ismove = true;
			});
		}else{
			$(Obj.location).parent().stop().animate({'left':0},function(){
				standard.ismove = true;
			});
		}
	}
	return standard;
}

function YSlideEnd(Obj,standard,isCount){
	if(standard.ismove2){
		standard.moveTemp = 0;
	}
	if(Math.abs(standard.moveTemp)>standard.touchRec){
		if(standard.isleft){
			$(Obj.location).parent().stop().animate({'top':0},function(){
				standard.isleft = false;
				standard.ismove = true;
				if(isCount){
					standard.count--;
					if(standard.count<1){
						standard.count = standard.listLen;
					}
					$(Obj.count).html(standard.count);
				}
			});
		}else{
			$(Obj.location).parent().stop().animate({'top':-standard.size},function(){
				$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
				$(this).css('top',0);
				standard.ismove = true;
				if(isCount){
					standard.count++;
					if(standard.count>standard.listLen){
						standard.count = 1;
					}
					$(Obj.count).html(standard.count);
				}
			});
		}
	}else{
		if(standard.isleft){
			standard.isleft = false;
			$(Obj.location).parent().stop().animate({'top':-standard.size},function(){
				$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
				$(this).css('top',0);
				standard.ismove = true;
			});
		}else{
			$(Obj.location).parent().stop().animate({'top':0},function(){
				standard.ismove = true;
			});
		}
	}
	return standard;
}

function getMoveType(sx,sy,x,y) {
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

/* 통합 슬라이드 */
function visualSlideUtil(Obj){
	var isTouch = false;
	var isTouchRec = false;
	var isAuto = false;
	var isNext = false;
	var isPrev = false;
	var isStop = false;
	var isCount = false;
	var isNextSpeed = false;
	var isPrevSpeed = false;
    var isTwo = false;
    //var isClone = false;
    
    // 남동구청 전용
    var isClone = false;  // 하단 콘텐츠 여부
	/* Validation  start------------------------------------------------------ */

	/* location */
	if(Obj.location!=undefined){
		if(typeof(Obj.location)!=typeof('')){
			console.log('location의 값은 String으로만 입력해 주세요.');
		}
	}else{
		console.log('location은 필수 입력값 입니다. 반드시 입력해 주세요');
	}

	/* position */
	if(Obj.position!=undefined){
		if(typeof(Obj.position)!=typeof('')){
			console.log('position의 값은 String으로만 입력해 주세요.');
		}
	}else{
		console.log('position은 필수 입력값 입니다. 반드시 입력해 주세요');
	}

	/* auto */
	if(Obj.auto!=undefined){
		if(Obj.auto===false){
			isAuto = false;
		}else{
			isAuto = true;
		}
	}

	/* touch */
	if(Obj.touch!=undefined){
		if(Obj.touch[1] != undefined){
			if(typeof(Obj.touch[0])!=typeof(false)){
				console.log('touch의 값은 Boolean으로만 입력해 주세요.');
			}else if(isNaN(Obj.touch[1])){
				console.log('touch의 인식 값은 Number로만 입력해 주세요.');
			}else{
				isTouch = Obj.touch[0];	
				isTouchRec = true;
			}
		}else{
			if(typeof(Obj.touch)!=typeof(false)){
				console.log('touch의 값은 Boolean으로만 입력해 주세요.');
			}else if(Obj.touch===true){
				isTouch = true;
			}	
		}
		
	}

	/* next */
	if(Obj.next!=undefined){
		if(typeof(Obj.next) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('next의 값은 String으로만 입력해 주세요.');
			}else if(isNaN(Obj.next[1])){
				console.log('next의 speed 값은 Number로만 입력해 주세요.');
			}else{
				isNext = true;
				isNextSpeed = true;
			}
		}else{
			if(typeof(Obj.next)!=typeof('')){
				console.log('next의 값은 String으로만 입력해 주세요.');
			}else{
				isNext = true;
			}
		}
	}

	/* prev */
	if(Obj.prev!=undefined){
		if(typeof(Obj.prev) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('prev의 값은 String으로만 입력해 주세요.');
			}else if(isNaN(Obj.prev[1])){
				console.log('prev의 speed 값은 Number로만 입력해 주세요.');
			}else{
				isPrev = true;
				isPrevSpeed = true;
			}
		}else{
			if(typeof(Obj.prev)!=typeof('')){
				console.log('prev의 값은 String으로만 입력해 주세요.');
			}else{
				isPrev = true;
			}
		}
	}

	/* stop */
	if(Obj.stop!=undefined){
		isStop = true;
	}
	

	/* count */
	if(Obj.count !=undefined){
		if(typeof(Obj.count) === typeof([])){
			if(!isNaN(Obj.count[0])){
				console.log('count의 값은 String으로만 입력해 주세요.');
			}else if(!isNaN(Obj.count[1])){
				console.log('count Length의 값은 String으로만 입력해 주세요.');
			}else{
				isCount = true;
				$(Obj.count[1]).html($(Obj.location).length);
				Obj.count = Obj.count[0];
			}
		}else{
			if(typeof(Obj.count)!=typeof('')){
				console.log('count의 값은 String으로만 입력해 주세요.');
			}else{
				isCount = true;
			}		
		}
	}
  
    
    //남동구청 전용
      
    if(Obj.clone != undefined){
        if(typeof(Obj.clone)!=typeof(true)){
            console.log('clone의 값은 Boolean으로 입력해 주세요');
        }else{
            isClone = Obj.clone;
        }
    }
    if(Obj.isTwo != undefined){
        if(typeof(Obj.isTwo)!=typeof(true)){
            console.log('isTwo의 값은 Boolean으로 입력해 주세요');
        }else{
            isTwo = Obj.isTwo;
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
        isClone: false,
        twoCnt: 0,
        twoMax: 0
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
    if(isTwo){
        standard.twoMax = Math.round(standard.listLen/2);
    }
	/* Click Slide start---------------------------------------------------- */
	if(isAuto){
		if(typeof(Obj.auto)!=typeof(true)){
			standard.isInterval  = Obj.auto[0];
			standard.autoTime = Obj.auto[1];
			if(Obj.auto.length>2){
				standard.mvSpeed = Obj.auto[2];
			}
		}else{
			standard.isInterval = Obj.auto;
		}
	}
	if(Obj.position=='top'){
		standard.size = $(Obj.location+':eq(0)').outerHeight(true);
	}else if(Obj.position=='left'){
		standard.size = $(Obj.location+':eq(0)').outerWidth(true);
	}
	$(window).resize(function(){
		if(Obj.position=='top'){
			standard.size = $(Obj.location+':eq(0)').outerHeight(true);
		}else if(Obj.position=='left'){
			standard.size = $(Obj.location+':eq(0)').outerWidth(true);
		}
	});
	
	standard.autoSet = function(){
		if(standard.isMv && standard.listLen>1){
            if(isTwo){
                if(standard.twoMax>1){
                    $(Obj.location+'>div').css("display","none");
                    $(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
                    $(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
                    $(Obj.location+':eq(0)>div').css("display","block");
                    $(Obj.location+':eq(1)>div').css("display","block");
                }
            }else{
                standard.isMv = false;
                if(Obj.position === 'left'){
                    $(standard.parent).stop().animate({'left':(-standard.size)},standard.mvSpeed ,function(){
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
                    $(standard.parent).stop().animate({'top':(-standard.size)},standard.mvSpeed ,function(){
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
		}
	}

	if(isNext){
		$(Obj.next).on('click',function(){
			if(!standard.isInterval){
				clearInterval(standard.interval);
			}
			standard.isInterval = true;
			if(standard.isMv && standard.listLen>1){
                if(isTwo){
                    if(standard.twoMax>1){
                        $(Obj.location+'>div').css("display","none");
                        $(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
                        $(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
                        $(Obj.location+':eq(0)>div').css("display","block");
                        $(Obj.location+':eq(1)>div').css("display","block");
                    }
                }else{
                    if(Obj.position=='top'){
                        standard.size = $(Obj.location+':eq(0)').outerHeight(true);
                    }else if(Obj.position=='left'){
                        standard.size = $(Obj.location+':eq(0)').outerWidth(true);
                    }
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
                if(isTwo){
                     if(standard.twoMax>1){
                        $(Obj.location+'>div').css("display","none");
                        $(Obj.location+':last-child').insertBefore($(Obj.location+':first-child'));
                        $(Obj.location+':last-child').insertBefore($(Obj.location+':first-child'));
                        $(Obj.location+':eq(0)>div').css("display","block");
                        $(Obj.location+':eq(1)>div').css("display","block");
                    }
                }else{
                    if(Obj.position=='top'){
                        standard.size = $(Obj.location+':eq(0)').outerHeight(true);
                    }else if(Obj.position=='left'){
                        standard.size = $(Obj.location+':eq(0)').outerWidth(true);
                    }
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
			}
			return false;
		});
	}
	if(isStop){
		var thisStop = '';
		var thisPlay = '';
		
		if(typeof(Obj.stop)==typeof('')){
			thisStop = Obj.stop;
		}else{
            thisStop = Obj.stop[0];
			thisPlay = Obj.stop[1];
			
		}
		if(thisPlay!=''){
			$(thisStop).on('click',function(){
				if(!standard.isInterval){
					clearInterval(standard.interval);
				}
				standard.isInterval= true;
				return false;
			});
			$(thisPlay).on('click',function(){
				if(standard.isInterval){
					standard.interval = setInterval(standard.autoSet,standard.autoTime);
					standard.isInterval= false;
				}

				return false;
			});
		}else{
			$(thisStop).on('click',function(){
				if(standard.isInterval){
					standard.interval = setInterval(standard.autoSet,standard.autoTime);
					standard.isInterval= false;
				}else{
					clearInterval(standard.interval);
					standard.isInterval= true;
					
				}
				return false;
			});
		}
	}

	const btnStopPlay = [document.querySelector('#btnCon1'),document.querySelector('#btnCon2'),document.querySelector('#btnCon3')]
	for(let i = 0;i < 3; i++){
		btnStopPlay[i].addEventListener('click', function(){
			this.classList.toggle('play')
		})
	}

	if(standard.isInterval){
		standard.interval = setInterval(standard.autoSet,standard.autoTime);
		standard.isInterval= false;
	}
	/* Click Slide end---------------------------------------------------- */

	/* touch Slide start-------------------------------------------------- */
	
	if(standard.listLen>1 && isTouch){
		if(Obj.position === 'top'){
			$(standard.parent).css('touch-action','none');
		}
		$(standard.parent).on('touchstart',function(starteven){
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
				if(Obj.position === 'left'){
                    if(isClone){
                        standard = XSlideClone(Obj,standard,isCount,me);    
                    }else{
                        standard = XSlide(Obj,standard,isCount,me);    
                    }
				}else{
					standard = YSlide(Obj,standard,isCount,me);
				}
			}
		});
		$(standard.parent).on('touchend',function(){
			if(standard.fingerCnt<2 && standard.ismove){
				standard.ismove = false;
				if(Obj.position === 'left'){
                    if(isClone){
                        standard = XSlideEndClone(Obj,standard,isCount);
                    }else{
                        standard = XSlideEnd(Obj,standard,isCount);
                    }
				}else{
					standard = YSlideEnd(Obj,standard,isCount);
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
}


function goListSlide(Obj,slideRange){
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
        maxCnt:1,
		ismove: true,
		isleft: false,
		moveCntX: 0,
		moveCntY: 0,
		moveCnt: -1,
		moveTemp: 0,
		resultCnt: 0,
		startX: 0,
		startY: 0,
	}
    standard.maxCnt = $(Obj).children().length;
    $(Obj).on('touchstart',function(starteven){
        var se = starteven.originalEvent; 
        standard.fingerCnt = se.touches.length;
        standard.startX = se.touches[0].clientX; 
        standard.startY = se.touches[0].clientY;
    });
    $(Obj).on('touchmove', function(moveeven) {
        var me = moveeven.originalEvent;

        standard.moveCntX = me.touches[0].clientX;
        standard.moveCntY = me.touches[0].clientY;
        standard.moveCnt =  getMoveType(standard.startX ,standard.startY ,standard.moveCntX , standard.moveCntY );
        //standard = XSlide(Obj,standard,isCount,me);    
    });
    $(Obj).on('touchend',function(){
        //standard = XSlideEnd(Obj,standard,isCount);
        if(standard.moveCnt==0){
            standard.isleft = (standard.startX - standard.moveCntX)<0;
            if(Math.abs(standard.startX - standard.moveCntX)>slideRange){
                if(standard.isleft){
                    goListCnt--;
                    if(goListCnt<0){
                        goListCnt = standard.maxCnt;
                    }
                    $(Obj).children(':eq('+goListCnt+')').addClass('on').siblings().removeClass('on');
                }else{
                    goListCnt++;
                    if(goListCnt>=standard.maxCnt){
                        goListCnt = 0;
                    }
                    $(Obj).children(':eq('+goListCnt+')').addClass('on').siblings().removeClass('on');
                }
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
        standard.isleft = false;
        standard.mvCnt = -1;
    });
}


function visualFadeUtil(Obj){
	var isTouch = false;
	var isTouchRec = false;
	var isAuto = false;
	var isNext = false;
	var isPrev = false;
	var isStop = false;
	var isCount = false;
	var isNextSpeed = false;
	var isPrevSpeed = false;
	/* Validation  start------------------------------------------------------ */

	/* location */
	if(Obj.location!=undefined){
		if(typeof(Obj.location)!=typeof('')){
			console.log('location의 값은 String으로만 입력해 주세요.');
		}
	}else{
		console.log('location은 필수 입력값 입니다. 반드시 입력해 주세요');
	}

	/* auto */
	if(Obj.auto!=undefined){
		if(Obj.auto===false){
			isAuto = false;
		}else{
			isAuto = true;
		}
	}

	/* touch */
	if(Obj.touch!=undefined){
		if(Obj.touch[1] != undefined){
			if(typeof(Obj.touch[0])!=typeof(false)){
				console.log('touch의 값은 Boolean으로만 입력해 주세요.');
			}else if(isNaN(Obj.touch[1])){
				console.log('touch의 인식 값은 Number로만 입력해 주세요.');
			}else{
				isTouch = true;	
				isTouchRec = true;
			}
		}else{
			if(typeof(Obj.touch)!=typeof(false)){
				console.log('touch의 값은 Boolean으로만 입력해 주세요.');
			}else if(Obj.touch===true){
				isTouch = true;
			}	
		}
		
	}

	/* next */
	if(Obj.next!=undefined){
		if(typeof(Obj.next) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('next의 값은 String으로만 입력해 주세요.');
			}else if(isNaN(Obj.next[1])){
				console.log('next의 speed 값은 Number로만 입력해 주세요.');
			}else{
				isNext = true;
				isNextSpeed = true;
			}
		}else{
			if(typeof(Obj.next)!=typeof('')){
				console.log('next의 값은 String으로만 입력해 주세요.');
			}else{
				isNext = true;
			}
		}
	}

	/* prev */
	if(Obj.prev!=undefined){
		if(typeof(Obj.prev) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('prev의 값은 String으로만 입력해 주세요.');
			}else if(isNaN(Obj.prev[1])){
				console.log('prev의 speed 값은 Number로만 입력해 주세요.');
			}else{
				isPrev = true;
				isPrevSpeed = true;
			}
		}else{
			if(typeof(Obj.prev)!=typeof('')){
				console.log('prev의 값은 String으로만 입력해 주세요.');
			}else{
				isPrev = true;
			}
		}
	}

	/* stop */
	if(Obj.stop!=undefined){
		isStop = true;
	}
	

	/* count */
	if(Obj.count !=undefined){
		if(typeof(Obj.count) === typeof([])){
			if(!isNaN(Obj.count[0])){
				console.log('count의 값은 String으로만 입력해 주세요.');
			}else if(!isNaN(Obj.count[1])){
				console.log('count Length의 값은 String으로만 입력해 주세요.');
			}else{
				isCount = true;
				$(Obj.count[1]).html($(Obj.location).length);
				Obj.count = Obj.count[0];
			}
		}else{
			if(typeof(Obj.count)!=typeof('')){
				console.log('count의 값은 String으로만 입력해 주세요.');
			}else{
				isCount = true;
			}		
		}
	}
	/* Validation  end------------------------------------------------------ */

	
	var standard = {
		parent:  $(Obj.location).parent(),
		listLen : $(Obj.location).length,
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
		prevSpeed: 300
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
	if(isAuto){
		if(typeof(Obj.auto)!=typeof(true)){
			standard.isInterval  = Obj.auto[0];
			standard.autoTime = Obj.auto[1];
			if(Obj.auto.length>2){
				standard.mvSpeed = Obj.auto[2];
			}
		}else{
			standard.isInterval = Obj.auto;
		}
	}
	
	standard.autoSet = function(){
		if(standard.isMv && standard.listLen>1){
			standard.isMv = false;
			$(Obj.location+':first-child').siblings().css('opacity',0.2);
			$(Obj.location+':first-child').stop().animate({'opacity':0.2},(standard.mvSpeed/2) ,function(){
				$(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
				if(isCount){
					standard.count++;
					if(standard.count>standard.listLen){
						standard.count = 1;
					}
					$(Obj.count).html(standard.count);
				}
				$(Obj.location+':first-child').stop().animate({'opacity':1},(standard.mvSpeed/2) ,function(){
					$(Obj.location).css('opacity',1);
					standard.isMv = true;
				});
			});
		}
	}

	if(isNext){
		$(Obj.next).on('click',function(){
			if(!standard.isInterval){
				clearInterval(standard.interval);
			}
			standard.isInterval = true;
			if(standard.isMv && standard.listLen>1){
				standard.isMv = false;
				$(Obj.location+':first-child').siblings().css('opacity',0.2);
				$(Obj.location+':first-child').stop().animate({'opacity':0.2},(standard.nextSpeed/2) ,function(){
					$(Obj.location+':first-child').insertAfter($(Obj.location+':last-child'));
					if(isCount){
						standard.count++;
						if(standard.count>standard.listLen){
							standard.count = 1;
						}
						$(Obj.count).html(standard.count);
					}
					$(Obj.location+':first-child').stop().animate({'opacity':1},(standard.nextSpeed/2) ,function(){
						$(Obj.location).css('opacity',1);
						standard.isMv = true;
					});
				});
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
				$(Obj.location+':first-child').siblings().css('opacity',0.2);
				$(Obj.location+':first-child').stop().animate({'opacity':0.2},(standard.prevSpeed/2) ,function(){
					$(Obj.location+':last-child').insertBefore($(Obj.location+':first-child'));
					if(isCount){
						standard.count--;
						if(standard.count<1){
							standard.count = standard.listLen;
						}
						$(Obj.count).html(standard.count);
					}
					$(Obj.location+':first-child').stop().animate({'opacity':1},(standard.prevSpeed/2) ,function(){
						$(Obj.location).css('opacity',1);
						standard.isMv = true;
					});
				});
			}
			return false;
		});
	}
	if(isStop){
		var thisStop = '';
		var thisPlay = '';
		if(typeof(Obj.stop)==typeof('')){
			thisStop = Obj.stop;
		}else{
            thisStop = Obj.stop[0];
			thisPlay = Obj.stop[1];
		}
		if(thisPlay!=''){
			$(thisStop).on('click',function(){
				if(!standard.isInterval){
					clearInterval(standard.interval);
				}
				standard.isInterval= true;
				return false;
			});
			$(thisPlay).on('click',function(){
				if(standard.isInterval){
					standard.interval = setInterval(standard.autoSet,standard.autoTime);
					standard.isInterval= false;
				}
				return false;
			});
		}else{
			$(thisStop).on('click',function(){
				if(standard.isInterval){
					standard.interval = setInterval(standard.autoSet,standard.autoTime);
					standard.isInterval= false;
				}else{
					clearInterval(standard.interval);
					standard.isInterval= true;
				}
				return false;
			});
		}
		
	}

	if(standard.isInterval){
		standard.interval = setInterval(standard.autoSet,standard.autoTime);
		standard.isInterval= false;
	}
	/* Click Slide end---------------------------------------------------- */

	/* touch Slide start-------------------------------------------------- */
	
	if(standard.listLen>1 && isTouch){
		$(standard.parent).css('touch-action','pan-y');
		$(standard.parent).on('touchstart',function(starteven){
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
				standard.moveTemp = standard.moveCntX-standard.startX;

				if(standard.isY && standard.isX){
					standard.moveCnt = getMoveType(standard.startX ,standard.startY ,standard.moveCntX , standard.moveCntY );
				}
				standard.resultCnt = Math.abs(standard.moveTemp);
				if(standard.fingerCnt<2 && standard.moveCnt > -1){
					if(standard.moveCnt > 0 && standard.isX){
						if(standard.isY){
							standard.isX = false;
						}
					}else if(standard.moveCnt === 0){
						standard.ismove2 = false;
						var reTemp = Math.abs(standard.moveTemp*0.0025)
						$(Obj.location).css('opacity',(1-reTemp));
						
					}
				}
			}
		});
		$(standard.parent).on('touchend',function(){
			if(standard.fingerCnt<2 && standard.ismove){
				standard.ismove = false;
				if(standard.ismove2){
					standard.moveTemp = 0;
				}
				if(Math.abs(standard.moveTemp)>standard.touchRec){
					if(standard.moveTemp>0){
						$(Obj.location+':first-child').siblings().css('opacity',0.2);
						$(Obj.location+':first-child').stop().animate({'opacity':0},'fast',function(){
							if(isCount){
								standard.count--;
								if(standard.count<1){
									standard.count = standard.listLen;
								}
								$(Obj.count).html(standard.count);
							}
							$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
							$(Obj.location+':first-child').stop().animate({'opacity':1},function(){
								standard.ismove = true;
							});
						});
					}else{
						$(Obj.location+':first-child').siblings().css('opacity',0.2);
						$(Obj.location+':first-child').stop().animate({'opacity':0},'fast',function(){
							if(isCount){
								standard.count++;
								if(standard.count>standard.listLen){
									standard.count = 1;
								}
								$(Obj.count).html(standard.count);
							}
							$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
							$(Obj.location+':first-child').stop().animate({'opacity':1},function(){
								standard.ismove = true;
							});
						});
					}
				
				}else{
					$(Obj.location).stop().animate({'opacity':1},function(){standard.ismove = true;});
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
}


/* 배너 */
function bannerUtil(Obj){
	var isAuto = true;
	var isNext = false;
	var isPrev = false;
	var isStop = false;
	var isNextSpeed = false;
	var isPrevSpeed = false;
	/* Validation  start------------------------------------------------------ */

	/* location */
	if(Obj.location!=undefined){
		if(typeof(Obj.location)!=typeof('')){
			console.log('location의 값은 String으로만 입력해 주세요.');
		}
	}else{
		console.log('location은 필수 입력값 입니다. 반드시 입력해 주세요');
	}

	/* auto */
	if(Obj.auto!=undefined){
		if(typeof(Obj.auto) === typeof([])){
			if(Obj.auto[0]){
                isAuto = true;
			}else{
                isAuto = false;
			}
		}else{
			if(Obj.auto){
				isAuto = true;
			}else{
				isAuto = false;
			}
		}
	}

	/* next */
	if(Obj.next!=undefined){
		if(typeof(Obj.next) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('next의 값은 String으로만 입력해 주세요.');
			}else if(isNaN(Obj.next[1])){
				console.log('next의 speed 값은 Number로만 입력해 주세요.');
			}else{
				isNext = true;
				isNextSpeed = true;
			}
		}else{
			if(typeof(Obj.next)!=typeof('')){
				console.log('next의 값은 String으로만 입력해 주세요.');
			}else{
				isNext = true;
			}
		}
	}

	/* prev */
	if(Obj.prev!=undefined){
		if(typeof(Obj.prev) === typeof([])){
			if(!isNaN(Obj.next[0])){
				console.log('prev의 값은 String으로만 입력해 주세요.');
			}else if(isNaN(Obj.prev[1])){
				console.log('prev의 speed 값은 Number로만 입력해 주세요.');
			}else{
				isPrev = true;
				isPrevSpeed = true;
			}
		}else{
			if(typeof(Obj.prev)!=typeof('')){
				console.log('prev의 값은 String으로만 입력해 주세요.');
			}else{
				isPrev = true;
			}
		}
	}

	/* stop */
	if(Obj.stop!=undefined){
		isStop = true;
	}
	
	/* Validation  end------------------------------------------------------ */

	var standard = {
		parent:  $(Obj.location).parent(),
		listLen : $(Obj.location).length,
		size : $(Obj.location+':first-child').outerWidth(true),
		autoSet: null,
		mvSpeed: 15,
		interval: null,
		isInterval: false,
		ismove: true,
		nextSpeed: 300,
		prevSpeed: 300,
		moveCnt: 0,
        isFirst: true
	}
	$(window).resize(function(){
		standard.size = $(Obj.location+':first-child').outerWidth(true);
	});

	standard.autoSet = function (){
        var firstObj = $(Obj.location+':first-child');
        if(standard.isFirst){
            standard.parent.append(firstObj.clone());    
            standard.isFirst = false;
        }
        
		if(standard.moveCnt >= standard.size){
			$(Obj.location+':first-child').remove();
			standard.size = $(Obj.location+':first-child').outerWidth(true);
            standard.isFirst = true;
			standard.moveCnt = 0;
		}
		$(standard.parent).css('left',-(standard.moveCnt++));
	}
	if(isNextSpeed){
		standard.nextSpeed = Obj.next[1];
		Obj.next = Obj.next[0];
	}
	if(isPrevSpeed){
		standard.prevSpeed = Obj.prev[1];
		Obj.prev = Obj.prev[0];
	}
	if(isAuto){
		if(typeof(Obj.auto) === typeof([])){
			if(typeof(Obj.auto[0])!=typeof(true)){
				console.log('auto의 첫번째 값은 Boolean으로만 입력해 주세요.');
				standard.isInterval = false;
			}else{
				standard.isInterval  = Obj.auto[0];
				if(!isNaN(Obj.auto[1])){
					standard.mvSpeed = Obj.auto[1];
					standard.interval = setInterval(standard.autoSet ,standard.mvSpeed);
				}else{
					console.log('auto의 두번째 값은 Number로만 입력해 주세요.');
				}
			}
		}else{
            if(typeof(Obj.auto)==typeof(true)){
                if(Obj.auto){
                    standard.isInterval  = Obj.auto;
                    standard.interval = setInterval(standard.autoSet ,standard.mvSpeed);
                }else{
                    standard.isInterval = false;
                }	
            }else{
                console.log('auto 값은 Boolean만 입력해 주세요.')
            }
		}
		
	}
	$(standard.parent).on('mouseover focusin',function(){
		clearInterval(standard.interval);
		standard.isInterval = false;
	});
	$(standard.parent).on('mouseleave focusout',function(){
		if(!standard.isInterval && standard.ismove){
			standard.interval = setInterval(standard.autoSet ,standard.mvSpeed);
			standard.isInterval = true;
		}
	});
	
	if(isNext){
		$(Obj.next).on('click',function(){
			clearInterval(standard.interval);
			standard.isInterval = false;
			if(standard.ismove){
				standard.ismove = false;
				$(standard.parent).animate({'left':-(standard.size)},standard.nextSpeed,function(){
					$(Obj.location+':first-child').insertAfter(Obj.location+':last-child');
					standard.size = $(Obj.location+':first-child').outerWidth(true);
					$(standard.parent).css('left',0);
					standard.moveCnt = 0;
					standard.ismove = true;
				});
			}
			return false;
		});
	}

	if(isPrev){
		$(Obj.prev).on('click',function(){
			clearInterval(standard.interval);
			standard.isInterval = false;
			if(standard.ismove){
				standard.ismove = false;
				if(Math.abs(parseInt($(standard.parent).css('left')))>0){
					$(standard.parent).animate({'left':0},standard.nextSpeed,function(){
						standard.moveCnt = 0;
						standard.ismove = true;
					});
				}else{
					$(Obj.location+':last-child').insertBefore(Obj.location+':first-child');
					standard.size = $(Obj.location+':first-child').outerWidth(true);
					$(standard.parent).css('left',-(standard.size));
					$(standard.parent).animate({'left':0},standard.nextSpeed,function(){
						standard.moveCnt = 0;
						standard.ismove = true;
					});
				}
			}
			return false;
		});
	}
	if(isStop){
		var thisStop = '';
		var thisPlay = '';
		if(typeof(Obj.stop)===typeof([])){
			thisStop = Obj.stop[0];
			thisPlay = Obj.stop[1];
		}else{
			thisStop = Obj.stop;
		}
		if(thisPlay!=''){
			$(thisStop).on('click',function(){
				clearInterval(standard.interval);
				standard.isInterval= false;
				return false;
			});
			$(thisPlay).on('click',function(){
				if(!standard.isInterval){
					standard.interval = setInterval(standard.autoSet,standard.mvSpeed);
					standard.isInterval= true;
				}
				return false;
			});
		}else{
			$(thisStop).on('click',function(){
				if(!standard.isInterval){
					standard.interval = setInterval(standard.autoSet,standard.mvSpeed);
					standard.isInterval= true;
				}else{
					clearInterval(standard.interval);
					standard.isInterval= false;
				}
				return false;
			});
		}
	}
}