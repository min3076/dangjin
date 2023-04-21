


//쿠키저장
function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + expiredays);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
}

function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            var end = document.cookie.indexOf(";", j);
            if (end == -1) end = document.cookie.length;
            return unescape(document.cookie.substring(j, end));
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}


/*********팝업관련 자바스크립트 소스****************/
function close_layer(num) {
    document.getElementById(num).style.display = 'none';

    //쿠키굽기
    setCookie(num, 'done', 1);
}

function close_layer2(num) {
    document.getElementById(num).style.display = 'none';

}

function link_target(url, target) {
    if (target == '_blank') {
        window.open(url);
    } else if (target == '_self') {
        location.href = url;
    } else {
        opener.location.href = url;
    }
}

function admissionFormCheck() {
    var f = document.admissionForm;
    if (f.n_name.value.length < 1) {
        alert("이름을 입력해 주세요");
        f.n_name.focus();
        return false;
    }

    if (f.jumin_num.value.length != 13) {
        alert("주민번호는 숫자만 입력해 주세요");
        f.jumin_num.focus();
        return false;
    }
    return true;
}

function message() {
    alert("서비스준비중입니다.");
    return false;


}



// 탭메뉴
function document_tab(param, btn, obj) {
    var param = $(param);
    var btn = param.find(btn);
    var obj = param.find(obj);
    var elem = 0;

    var lcv = location.href;
    lcv = lcv.split("?ttab=");

    if (lcv[1]) {
        elem = lcv[1];
    }

    obj.css("opacity", 0);
    obj.eq(elem).css("opacity", 1);

    obj.hide().eq(elem).show();
    btn.removeClass("on");
    btn.eq(elem).addClass("on");


    btn.bind('click', function() {
        var t = $(this);
        btn.removeClass("on");
        t.addClass("on");
        elem = t.index();
        obj.delay(50).hide().animate({ "opacity": 0 }, 150, 'swing')
        obj.eq(elem).delay(50).show().animate({ "opacity": 1 }, 150, 'swing')

        return false;
    });
}
//
// function targetOpener(btn, option) {
//     var btn = $(btn);
//
//     function _in(event) {
//         var t = $(this);
//         var href = t.attr("href");
//
//         if (t.children().is('img')) {
//             var btnIMG = btn.find('img');
//             var thisIMG = t.children();
//             var thisSRC = thisIMG.attr('src');
//             thisSRC = thisSRC.substr(thisSRC.lastIndexOf('_')).split(".");
//
//             if (thisSRC[0] != "_ov") {
//                 $.each(btnIMG, function() {
//                     $(this).attr("src", $(this).attr('src').replace('_ov.' + thisSRC[1], '.' + thisSRC[1]));
//                 });
//
//                 thisIMG.attr("src", thisIMG.attr('src').replace('.' + thisSRC[1], '_ov.' + thisSRC[1]));
//
//             }
//         }
//
//         if (option.lv == 0) {
//             if ($(href).css("display") == "none") {
//                 $(href).show();
//                 t.addClass("ov");
//             } else {
//                 $(href).hide();
//                 t.removeClass("ov");
//             }
//         }
//
//         if (option.lv == 1) {
//             $(option.obj).hide();
//             $(href).show();
//             btn.removeClass("ov");
//             t.addClass("ov");
//         }
//         event.preventDefault();
//     }
//
//     btn.on("click", _in);
// }


$(function() {

    linklst();
});



/* link list */
function linklst() {



    var dep1 = $("#link_list > ul > li > button");
    var linkList = $("#link_list > ul > li article");
    var dep2 = $("#link_list .dep2");
    var close = $("#link_list .close button");
    var close2 = $("#link_list article .close button");

    linkList.hide();
    dep2.show();

    dep1.click(function() {
        if ($(this).parent().index() == 4) {
            $(this).toggleClass("on");
            dep1.not(this).removeClass("on");
            dep2.stop().slideToggle();
            linkList.slideUp();
        } else {
            $(this).addClass("on").next().slideDown();
            dep1.not(this).removeClass("on").next().slideUp();
            dep2.stop().slideUp();
        }
    });

    close.click(function() {
        dep1.removeClass("on");
        dep2.stop().slideUp();
    });

    close2.click(function() {
        var val = $(this).val();
        if (val == 1) {
            $("#sitemap2").focus();
        }
        if (val == 2) {
            $("#sitemap3").focus();
        }
        if (val == 3) {
            $("#sitemap4").focus();
            dep2.stop().slideUp();
        }
        if (val == 4) {
            $("#sitemap5").focus();
            dep2.stop().slideUp();
        }
        dep1.removeClass("on");
        linkList.stop().slideUp();
    });
}



function footersitelink(param,btn,obj){
    var param = $(param);
    var btn = param.find(btn);
    var obj = param.find(obj);

    btn.bind("click",function(event){
        var t = $(this);

        if(t.next().css('display') == 'none'){
            obj.hide();
            t.next().show();
            btn.removeClass("ov");
            $(this).addClass("ov");
        }else{
            obj.hide();
            btn.removeClass("ov");
        }

        event.preventDefault();
    });

    param.find("a").last().bind("focusout",function(){
        obj.hide();
        btn.removeClass("ov");
    });
}



