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
    $('.productParameterText').on('tap',function () {

        $('.productMenus').css({'display':'block'});

        // 算出距底部的距离
        var bottom = -$('.productMenus').height();

        $('.productMenus').css({
            transition:'all 0.6s ease 0s',
            transform: 'translateY('+bottom+'px)'
        })


        mnenuTop = $(this).find('.productParameterText');

        //禁止遮罩层以下屏幕滑动
        //$("body").css('overflow','hidden');
    })

    //关闭产品参数遮罩层
    close_button:$('.close_buttonS').on('tap',function(){
        $('.productMenus').hide();
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

        //禁止遮罩层以下屏幕滑动
        //$("body").css('overflow','hidden');
    })

    //关闭产品参数遮罩层
    close_button_finish:$('.Oil_card').on('tap',function(){
        $('.ProductService').hide();
        //console.log(1111)
    })


})();

//购买数量
li1:$('.li1').on('tap', function () {
    //将取出的字符串转为数值类型并做加减运算
    var txt = parseInt($('.subtract').text());
    txts = txt - 1;
    //console.log(txts);
    $('.subtract').text(txts);
    //alert('22')
});
li3:$('.li3').on('tap', function () {
    //将取出的字符串转为数值类型并做加减运算
    var txt = parseInt($('.subtract').text());
    txts = txt + 1;
    //console.log(txts);
    $('.subtract').text(txts);
    //alert('22')
});