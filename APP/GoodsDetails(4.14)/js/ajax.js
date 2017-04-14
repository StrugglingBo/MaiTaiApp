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
            id:18,
        },
        success: function(data) {
            //alert('请求成功');
            //console.log(data.data.product.id);

            //banner
            var banner=data.data.product.list_img;
            console.log(banner);
            var bannerS = banner.split(",");
            for(var i = 0 ;i<bannerS.length;i++)
            {
                if(bannerS[i] == "" || typeof(bannerS[i]) == "undefined")
                {
                    bannerS.splice(i,1);
                    i= i-1;
                }

            }
            //alert(bannerS);
            console.log(bannerS);
            var banner_img=bannerS.length;
            console.log(banner_img);
            //动态追加li节点
            for(var i=0;i<banner_img;i++){
                var bannerImg="list_img"+(i+1);
                var pro_bannerS=
                    '<li><a href="#"><img id="'+bannerImg+ '" src= "'+'http://onlzmxmxz.bkt.clouddn.com/'+bannerS[i]+'" /></a></li>';
                $(pro_bannerS).appendTo('#pro_banner');

            }
            //轮播图下面的小圆点
            for(var i=1; i<=banner_img;i++){
                var raduirs =
                    '<span></span>';
                $(raduirs).appendTo('.dot');
            }




            //产品描述
            $('#description').html(data.data.product.description);

            //判断是否为3060产品，分别加上￥或“麦豆”
            if(data.data.product.product_type==3){
                var price_text = "<span style='font-size: 10px;'>麦豆</span>";
            }else{
                var price_text = "￥";
            }
            price_text += data.data.product.sell_price;
            $('#promotional_price').html(price_text);

            //市场价
            var cost_price = "<span style='font-size: 0.9rem;'>市场价</span>"
            cost_price += data.data.product.cost_price;
            $('#cost_price').html(cost_price);

            //产品所属类型
            if(data.data.product.is_new == 0){
                $("#is_new").remove();
            }
            if(data.data.product.is_high == 0){
                $("#is_high").remove();
            }
            if(data.data.product.is_sales == 0){
                $("#is_sales").remove();
            };

            //产品详情
            //console.log(data.data.product.content);
            $('#product_content').html(data.data.product.content);
            //console.log(product_content);
            $("#product_content").find("img").each(function () {
                var height = $(this).height();
                var width = $(this).width();
                if (height != width) {
                    $(this).css('height', '100vw');//如果高度不等于宽度给高度赋值100vw
                    $(this).css('width', '100vw');
                }
            });


            //卖家承诺(服务)弹出层
            //console.log(data.data.product.product_serve);
            if(!data.data.product.product_serve){
                //判断如果product_serv没有值，则删除 .center  节点
                $(".center").remove();
            }else {

                var dat=data.data.product.product_serve;
                var leng=dat.length;
                //动态追加li节点 并替换值
                for(var i=0;i<leng;i++){
                    var linameid='#'+"name"+(i+1);
                    var licontentid='#'+"content"+(i+1);
                    var htl=
                        ' <li id="li">'+
                        '<div class="li_text">'+
                        ' <div class="li_img"><img src="images/ok.png" alt=""></div>'+
                        ' <div class="li_txt"><p id='+linameid+""+'>'+dat[i].name+'</p></div>'+
                        '  </div>'+
                        '<div class="small_text">'+
                        '<ul>'+
                        '<li><p id='+licontentid+""+'>'+dat[i].content+'</p></li>'+
                        ' </ul>'+
                        '</div>'+
                        '</li>';
                    $(htl).appendTo('#ul');
                }
            }


            //产品参数弹出层
            //缩略图
            path = data.data.product.list_img;
            $("#imgId").attr('src',path);

            //销售价----判断是否为3060产品，分别加上￥或“麦豆”
            if(data.data.product.product_type==3){
                var price_text = "<span style='font-size: 10px;'>麦豆</span>";
            }else{
                var price_text = "￥";
            }
            price_text += data.data.product.sell_price;
            $('#money_now').html(price_text);

            //库存
            stock = '库存' + data.data.product.stock + '件';
            $('#Stock').html(stock);

            //颜色分类
            if(data.data.product.stock==0){
                $(".ul_color").find("li").each(function () {
                    //alert(data.data.product.visit);
                    //当库存为0时为其设置样式及移除绑定点击事件的类
                    $(".li_btn").unbind();
                    $(".ul_color li").addClass("another_visit");
                });
            }


            //评论部分
            //console.log(data.data.product_comment[0].ok_num);
            var pro=data.data.product_comment;
            //console.log(pro);
            var pro_leng=pro.length;
            //动态追加li节点 并替换值
            for(var i=0;i<pro_leng;i++) {
                var pro_usrlogo ="usrlogo" + (i + 1);
                var pro_phone = "phone" + (i + 1);
                var pro_ctime = "ctime" + (i + 1);
                var pro_comment = "comment" + (i + 1);
                var pro_centent = "centent" + (i + 1);
                var pro_img1 = "img" + 1;
                var pro_img2 = "img" + 2;
                var pro_img3 = "img" + 3;
                var pro_name = "pro_name" + (i + 1);
                var pro_otime = "pro_otime" + (i + 1);
                var product_all = '<div class="product_top">' +
                    '<div class="product_userinfo">' +
                    '<div class="product_userinfo_left">' +
                    '<div class="userinfo_leftOne"><img id="'+pro_usrlogo+ '" src= "'+pro[i].usrlogo+'" ></div>' +
                    '<div class="userinfo_leftTwo"><p id="product_comment_phone">'+pro[i].phone+'</p></div>' +
                    '<div class="userinfo_leftThree">' +
                    '<img src="images/dp_evaluate_vip@2x.png" alt="">' +
                    '</div>' +
                    '</div>' +
                    '<div class="product_userinfo_right"><p id="product_comment_ctime">'+pro[i].ctime+'</p></div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="product_bottom">' +
                    '<ul>' +
                    '<li>' +
                    '<div class="evaluateStar">' +
                    '<ul class="evaluateStarS" id="appendLi">' +
                    '</ul>' +
                    '</div>' +
                    '</li>' +
                    '<li>' +
                    '<div class="evaluateContent">' +
                    '<div class="evaluateText">' +
                    '<p id="product_comment_centent">' +pro[i].centent +
                    '</p>' +
                    '</div>' +
                    '<div class="evaluateImg">' +
                    '<ul id="product_comment_img">' +
                    '<li><img id="'+pro_img1+ '" src= "'+pro[i].img1+'" ></li>' +
                    '<li><img id="'+pro_img2+ '" src= "'+pro[i].img2+'" ></li>' +
                    '<li><img id="'+pro_img3+ '" src= "'+pro[i].img3+'" ></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="commodityParameters">' +
                    '<div class="commodityParameters_text"><p id="product_name">'+pro[i].product_name +'</p></div>' +
                    '<div class="commodityParameters_time">' +
                    '<p id="product_update_time"> '+'购买日期：'+ pro[i].otime +'</p>'+
                    '<div class="commodityParameters_imgText"><img src="images/dp_evaluate_like@2x.png" alt=""><p id="number">77</p></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</li>' +
                    '</ul>' +
                    '</div>';
                $(product_all).appendTo('.product_box');
            }

            ////买家头像
            //console.log(data.data.product_comment[0].usrlogo);
            //$("#usrlogo").attr('src',data.data.product_comment[0].usrlogo);
            //
            ////买家手机号
            //$('#product_comment_phone').html( data.data.product_comment[0].phone);
            ////买家评论时间
            //$('#product_comment_ctime').html( data.data.product_comment[0].ctime);
            ////好评等级
            //if(data.data.product_comment[0].comment==1){
            //    var appendLi = '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
            //        '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
            //        '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
            //        '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
            //        '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>';
            //    $(appendLi).appendTo('#appendLi');
            //
            //}else {
            //    //if(data.data.product_comment[1].ok_num==5){
            //    //    var appendLi = '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
            //    //        '<li><img src="images/evaluate_star_h@2x.png" alt=""></li>' +
            //    //        '<li><img src="images/evaluate_star_h2@2x.png" alt=""></li>' +
            //    //        '<li><img src="images/evaluate_star@2x.png" alt=""></li>' +
            //    //        '<li><img src="images/evaluate_star@2x.png" alt=""></li>';
            //    //    $(appendLi).appendTo('#appendLi');
            //    //};
            //};
            ////评论内容部分
            //$('#product_comment_centent').html( data.data.product_comment[0].centent);
            ////评论部分买家上传的图片
            ////$('#product_comment_img li img').html( data.data.product_comment[0].img1);
            //$("#product_comment_img li:nth-child(1) img").attr ("src", data.data.product_comment[0].img1);
            //$("#product_comment_img li:nth-child(2) img").attr ("src", data.data.product_comment[0].img2);
            //$("#product_comment_img li:nth-child(3) img").attr ("src", data.data.product_comment[0].img3);
            //
            ////商品名称
            //$('#product_name').html(data.data.product_comment[0].product_name);
            //
            ////评价时间
            //var update_time = '购买日期：' + data.data.product_comment[0].otime;
            //$('#product_update_time').html(update_time);


        },
        error: function () {
            //alert("请求失败");
        }
    });

})();