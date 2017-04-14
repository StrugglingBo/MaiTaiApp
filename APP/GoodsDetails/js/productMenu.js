/**
 * Created by Administrator on 2017/4/10.
 */

(function () {
    //点击显示产品参数遮罩层
    //productParameterText:$('.productParameterText').on('tap' ,function(){
    //    $('.productMenus').show();
    //    //禁止遮罩层以下屏幕滑动
    //    $("body").css('overflow','hidden');
    //})

    //产品参数弹出层动画
    // console.log($)
    //   tap封装了移动端的touch事件,如果想要用touch相关的事件,还需要引入touch.js
    var mnenuTop;
    $('.productParameter').on('tap',function () {


        $('.productMenus').css({'display':'block'});

        // 算出距底部的距离
        var bottom = -$('.productMenus').height();

        $('.productMenus').css({
            transition:'all 0.6s ease 0s',
            transform: 'translateY('+bottom+'px)'
        })


        mnenuTop = $(this).find('.productParameter');

        //设置让.menu_top遮罩层延迟300毫秒显示
        setTimeout("$('.menu_top').show()",300);
        //禁止遮罩层以下屏幕滑动
        //$("body").css('overflow','hidden');
    })
    //关闭产品参数遮罩层
    close_button:$('.close_buttonS').on('tap',function(){
        $('.productMenus').hide();
        $('.menu_top').hide()
        //console.log(1111)
    })



    //产品服务弹出层动画
    // console.log($)
    //   tap封装了移动端的touch事件,如果想要用touch相关的事件,还需要引入touch.js
    var mnenuTop;
    $('.hint').on('tap',function () {

        $('.ProductService').css({'display':'block'});

        // 算出距底部的距离
        var bottom = -$('.ProductService').height();

        $('.ProductService').css({
            transition:'all 0.6s ease 0s',
            transform: 'translateY('+bottom+'px)'
        })

        mnenuTop = $(this).find('.hint');

        //设置让.menu_top遮罩层延迟300毫秒显示
        setTimeout("$('.ProductService_menu').show()",300);

        //禁止遮罩层以下屏幕滑动
        //$("body").css('overflow','hidden');
    })

    //关闭产品参数遮罩层
    close_button_finish:$('.Oil_card').on('tap',function(){
        $('.ProductService').hide();
        $('.ProductService_menu').hide();
        //console.log(1111)
    })

})();


//购买数量
$(document).ready(function(){
    //加的效果
    $(".li3").click(function(){
        //当数量大于1时为减号设置样式
        $('.li1 img').attr("src","images/dp_bottombar_minus_bg1.png");
        var num=parseInt($('.subtract').text())+1;
        if(num==12){
            $('.li3 img').attr("src","images/dp_bottombar_minus_bg2.png");
            return;
        }
        $('.subtract').text(num);
    });
    //减的效果
    $(".li1").click(function(){
        $('.li3 img').attr("src","images/dp_bottombar_minus_bg3.png");
        var num=parseInt($('.subtract').text())-1;
        if(num==0){
            $('.li1 img').attr("src","images/dp_bottombar_minus_bg.png");
            return;
        }
        $('.subtract').text(num);
    });
})




//li1:$('.li1').on('tap', function () {
//    //将取出的字符串转为数值类型并做加减运算
//    var txt = parseInt($('.subtract').text());
//    txts = txt - 1;
//    //console.log(txts);
//    $('.subtract').text(txts);
//    //alert('22')
//});
//li3:$('.li3').on('tap', function () {
//    //将取出的字符串转为数值类型并做加减运算
//    var txt = parseInt($('.subtract').text());
//    txts = txt + 1;
//    //console.log(txts);
//    $('.subtract').text(txts);
//    //alert('22')
//});