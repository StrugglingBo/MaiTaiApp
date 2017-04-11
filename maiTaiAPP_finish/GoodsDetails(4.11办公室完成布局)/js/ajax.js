/**
 * Created by Administrator on 2017/4/11.
 */
(function () {

    $.ajax({
        url: "http://192.168.10.100/index.php/api/Product/getProduct/?",
        type: "get",
        async: true,
        dataType:"json",    //跨域json请求一定是jsonp
        //跨域请求的参数名，默认是callback
        data: {
            id:3,
        },
        success: function(data) {
            //alert('请求成功');
            //console.log(data.data[0].id);

            //banner
            //var bannerImg =[];
            //bannerImg[0] =  data.data[0].list_img;
            //console.log(bannerImg);
            //$('#bannerImg').html(bannerImg);

            //判断是否为3060产品，分别加上￥或“麦豆”
            if(data.data[0].product_type==3){
                var price_text = "<span style='font-size: 10px;'>麦豆</span>";
            }else{
                var price_text = "￥";
            }
            price_text += data.data[0].sell_price;
            $('#promotional_price').html(price_text);

            //市场价
            var cost_price = "<span style='font-size: 0.9rem;'>市场价</span>"
            cost_price += data.data[0].cost_price;
            $('#cost_price').html(cost_price);

            //产品所属类型
            if(data.data[0].is_new == 0){
                $("#is_new").remove();
            }
            if(data.data[0].is_high == 0){
                $("#is_high").remove();
            }
            if(data.data[0].is_sales == 0){
                $("#is_sales").remove();
            }
        },
        error: function () {
            //alert("请求失败");
        }
    });

})();