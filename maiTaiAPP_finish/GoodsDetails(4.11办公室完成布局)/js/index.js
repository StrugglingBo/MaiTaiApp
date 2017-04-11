(function() {
    //轮播图
    $('#slide3').swipeSlide({
        continuousScroll:true,
        speed : 3000,
        transitionType : 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        firstCallback : function(i,sum,me){
            me.find('.dot').children().first().addClass('cur');
        },
        callback : function(i,sum,me){
            me.find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur');
        }
    });

})();

//点击显示导航栏遮罩层
headerNavigation:$('.right').on('tap', function () {
    $('.menu').show();
});

//评论部分
var lag = 1;
commodityParameters_imgText:$('.commodityParameters_imgText').on('tap', function () {
    //替换样式
    $("img",$(this)).attr("src", "images/dp_evaluate_like_h@2x.png");

    //将取出的字符串转为数值类型并做加减运算
    var txt = parseInt($('#number').text());
    txts = txt + 1;
    //console.log(txts);
    $('#number').text(txts);
    lag = 0;
    if(lag==0){
        //移除on绑定的tap事件
        $('.commodityParameters_imgText').off('tap');
    }
});

//替换收藏按钮的样式
collect:$('#collect').on('tap', function () {
    $("img",$('#collectImg')).attr("src", "images/dp_tab_collect_star_h@2x.png");
});


//轮播图
//window.mySwipe = new Swipe(document.getElementById('slider'), {
//     //startSlide: 2,
//    // speed: 400,
//    auto: 1000,
//
//    // continuous: true,
//    // disableScroll: false,
//    // stopPropagation: false,
//    // callback: function(index, elem) {},
//    // transitionEnd: function(index, elem) {}
//});


//倒计时
//var seckill_time = document.getElementsByClassName('seckill_time')[0];
//var nums = seckill_time.getElementsByClassName('num');
//
////倒计时的时间
//var times = 9 * 60 * 60;
//
//setInterval(function() {
//    times--;
//
//    var h = Math.floor(times / 60 / 60);
//    var m = Math.floor(times / 60 % 60);
//    var s = times % 60;
//
//    nums[0].innerHTML = h > 10 ? Math.floor(h / 10) : 0;
//    nums[1].innerHTML = h % 10;
//
//    nums[2].innerHTML = m > 10 ? Math.floor(m / 10) : 0;
//    nums[3].innerHTML = m % 10;
//
//    nums[4].innerHTML = s > 10 ? Math.floor(s / 10) : 0;
//    nums[5].innerHTML = s % 10;
//
//}, 1000);