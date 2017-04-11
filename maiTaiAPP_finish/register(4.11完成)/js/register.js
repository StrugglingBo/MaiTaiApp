/**
 * Created by Administrator on 2017/3/28.
 */
//window.onLoad = function () {}

//获取url后面的参数的方法
//var text = window.location.search;
//alert(text);

//表单验证
$(function(){
    $.mvalidateExtend({
            phone:{
                required : true,
                pattern : /^0?1[3|4|5|8][0-9]\d{8}$/,

                each:function(){

                },

                descriptions:{
                    valid : '<div class="field-validmsg">正确</div>'
                }
            },
            password:{
                required : true,
                pattern : /^[a-zA-Z0-9]{6,22}$/,

                each:function(){

                },

                descriptions:{
                    //required : '<div class="field-invalidmsg">密码输入格式错误</div>',
                    //pattern : '<div class="field-invalidmsg">您输入的手机号码格式不正确</div>',
                    valid : '<div class="field-validmsg">正确</div>'
                }
            },
            tuiphone:{
            required : true,
            pattern : /^0?1[3|4|5|8][0-9]\d{8}$/,

            each:function(){

            },

            descriptions:{
                required : '<div class="field-invalidmsg">请输入推荐人手机号码</div>',
                pattern : '<div class="field-invalidmsg">您输入的手机号码格式不正确</div>',
                valid : '<div class="field-validmsg">正确</div>'
            }
        },

        });

    //判断手机号输入
    var phoneYZM;
    var Code1;
    var code1;
    $("#btn-3").on("tap", function() {
        var phone = $.trim($("#telphone").val());
        if (!phone) {
            $.mvalidateTip("请输入手机号码！");
            return;
        } else if (!/^0?1[3|4|5|8]\d{9}$/.test(phone)) {
            $.mvalidateTip("你输入的手机号码不正确！");
            return;
        } else if(/^0?1[3|4|5|8]\d{9}$/.test(phone)){
            $('#btn-3').on('tap',function () {

                $('#zeZhao').show();

                //在此处调用changeImg()方法，实现当遮罩层加载时，图片随机验证码也同时加载
                changeImg();
                //alert(code);
                //当第一次点击获取验证码时向服务器发送图片验证码请求
                $.ajax({
                    url: "http://192.168.10.100/index.php/Api/User/mobineImgCode",
                    type: "post",
                    async: true,
                    dataType:"json",    //跨域json请求一定是jsonp
                    jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
                    data: {
                        imgCode: code,
                        phone:phone
                    },
                    success: function(data) {
                       //data.code;获取服务器返回的状态
                        //alert('请求成功!');
                        if(data.code = 1000){
                            //本地生成手机随机短信验证码
                            verify();
                            //alert(code1)

                        }else {
                            console.log("服务器返回参数出错");
                        }

                    },
                    error: function () {
                      alert("请求失败");
                    }
                });

                //当点击刷新图片验证码时再次请求图片验证码接口
                //var Code1;
                $('#code').on('tap',function () {

                    $.ajax({
                        url: "http://192.168.10.100/index.php/Api/User/mobineImgCode",
                        type: "post",
                        async: true,
                        dataType:"json",    //跨域json请求一定是jsonp
                        jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
                        data: {
                            imgCode: code,
                            phone:phone
                        },
                        success: function(data) {
                            //data.code;获取服务器返回的状态
                            //alert('请求成功!');
                            if(data.code = 1000){
                                //本地生成手机随机短信验证码
                                verify();
                                //alert(code1)

                            }else {
                                console.log("服务器返回参数出错");
                            }

                        },
                        error: function () {
                            alert("请求失败");
                        }
                    });
                    changeImg();
                    //移除on方法绑定的事件
                    //$('#code').off('tap');

                });



                //点击遮罩层的确定按钮触发的事件
                $('#verify').on('tap',function () {
                    var ulmgCode1=$('#vcode').val();

                    //当输入的图片验证码不对时调用
                    if(ulmgCode1!=code)
                    {
                        //alert("请输入正确的验证码!");
                        $('#errorWarning').show();
                        return;
                    }

                    var uImgCode = ulmgCode1;
                    //console.log(uImgCode);
                    Code1 = code1;
                    var verifyCode = Code1;
                    //console.log(verifyCode)
                    //表单序列化
                    var jsontext={}
                    var jsonDatas=$('#Dform form').serializeArray();
                    $.each(jsonDatas,function(index,item){
                        jsontext[item['name']]=item['value'];
                    });
                    //发送短信验证码
                    $.ajax({
                        type:"post",    //请求方式
                        async:true,    //是否异步
                        url :"http://192.168.10.100/index.php/Api/User/sms",
                        dataType:"json",    //跨域json请求一定是jsonp
                        jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
                        //jsonpCallback:"successCallback",    //自定义跨域参数值，回调函数名也是一样，默认为jQuery自动生成的字符串
                        data:"uImgCode="+uImgCode + "&phone="+jsontext.phone + "&verifyCode="+verifyCode,    //请求参数
                        success: function(data) {
                            //遮罩层消失
                            $('#zeZhao').hide();
                            //当图片验证码验证通过时删除#zeZhao节点，避免点击发送手机验证码时又触发该事件

                            $('#zeZhao').remove();
                            //在此处调用发送手机验证码的方法
                            clickButton();
                            console.log('发送短信验证码成功');
                        },
                        error : function () {

                            console.log("抱歉，发送短信验证码失败");
                        }
                    });

                });

            });

            //遮罩层随机验证码
            var code;//声明一个变量用于存储生成的验证码
            $("#code").touch=changeImg;
            function changeImg(){
                //alert("换图片");
                var arrays=new Array(
                    '1','2','3','4','5','6','7','8','9','0',
                    'a','b','c','d','e','f','g','h','i','j',
                    'k','l','m','n','o','p','q','r','s','t',
                    'u','v','w','x','y','z',
                    'A','B','C','D','E','F','G','H','I','J',
                    'K','L','M','N','O','P','Q','R','S','T',
                    'U','V','W','X','Y','Z'
                );
                code='';//重新初始化验证码
                //alert(arrays.length);
                //随机从数组中获取四个元素组成验证码
                for(var i=0;i<4;i++){
                    //随机获取一个数组的下标
                    var r=parseInt(Math.random()*arrays.length);
                    code+=arrays[r];
                    //alert(arrays[r]);
                }
                //alert(code);
                document.getElementById('code1').innerHTML=code;//将验证码写入指定区域
                //alert(code);
                return code;
            }

            $("#btn-3").touch=clickButton;
            //发送手机验证码
            function clickButton(obj){

                var val = $("#btn-3").val();
                var time = 60;
                var set=setInterval(function(){
                    $("#btn-3").val("重新发送"+ --time+"(s)");

                        //当点击获取验证码按钮时，给它一个不可点击的状态
                        $('#btn-3').attr('disabled',true);


                }, 1000);/*等待时间*/

                setTimeout(function(){
                    //当点击获取验证码按钮时，给它一个可点击的状态

                    $('#btn-3').attr('disabled',false);

                    $("#btn-3").val("重新获取验证码");/*倒计时*/
                    clearInterval(set);

                }, 60000);

                //var code1;
                //设置一个定时器，并在5秒后关闭该定时器，同时将手机验证码放入input框中
                var verifyCode = setInterval(function () {

                },5000);
                setTimeout(function () {
                    clearInterval(verifyCode);

                    if(Code1 == null){
                        verify();
                        alert(Code1);
                    }
                    alert(code1);

                    return;

                },5000);

            }

            function verify(){
                //alert("换图片");
                var arrays=new Array(
                    '1','2','3','4','5','6','7','8','9','0'
                );
                code1='';//重新初始化验证码
                //alert(arrays.length);
                //随机从数组中获取四个元素组成验证码
                for(var i=0;i<4;i++){
                    //随机获取一个数组的下标
                    var r=parseInt(Math.random()*arrays.length);
                    code1+=arrays[r];
                    //alert(arrays[r]);
                }
                //alert(code1);
                //var verifyCode = code1;
                return code1;
               //$('#phoneyzm').val(code1);//将验证码写入指定区域

            }

            //点击遮罩层的取消按钮触发的事件
            $('#cancel').on('tap',function () {
                //遮罩层消失
                $('#zeZhao').hide();
            });

        }

    });

    $("#form1").mvalidate({
            type:1,
            onKeyup:true,
            sendForm:false,
            firstInvalidFocus:false,
            valid:function(event,options){
                //点击提交按钮时,表单通过验证触发函数
//                alert("验证通过！接下来可以做你想做的事情啦！");

                //通过ajax实现提交表单数据到后台
                $('#Dform').on('tap',function () {
                    console.log(1111)

                    //表单序列化
                    var jsonObj={}
                    var jsonData=$('#Dform form').serializeArray();
                    $.each(jsonData,function(index,item){
                        jsonObj[item['name']]=item['value'];
                    });
//                    console.log(data);  //name=zhangsan&sex=1&age=20
                    console.log(jsonData);  //[Object, Object, Object]
                    console.log(jsonObj);

                    $.ajax({
                        type:"post",    //请求方式
                        async:true,    //是否异步
                        url :"http://192.168.10.100/index.php/Api/User/register",
                        dataType:"json",    //跨域json请求一定是jsonp
                        jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
                        //jsonpCallback:"successCallback",    //自定义跨域参数值，回调函数名也是一样，默认为jQuery自动生成的字符串
                        data:"phone="+jsonObj.phone+"&password="+jsonObj.password+"&tuiphone="+jsonObj.tuiphone,    //请求参数
                        success: function(data) {
                            //如果数据库中已经存在该用户，则注册失败
                            if(data.code == 1001){
                            $('.field-validmsg').innerHTML = '该号码已被注册过';
                                alert('该号码已被注册过');


                                //判断随机生成的手机短信验证码与用户输入的是否一致
                                //if($('#phoneyzm').val!=verifyCode){
                                //    console.log('你输入的短信验证码不对！请重新输入');
                                //}

                                return;
                            }
                                //alert('注册成功');
                            console.log('恭喜您注册成功');
                        },
                        error : function () {

                            console.log("抱歉，注册失败");
                        }
                    });
                    $('#Dform').off('tap');
                    return false;
                    event.preventDefault();
                });

                event.preventDefault();
            },
            invalid:function(event, status, options){
                //点击提交按钮时,表单未通过验证触发函数
            },
            eachField:function(event,status,options){
                //点击提交按钮时,表单每个输入域触发这个函数 this 执向当前表单输入域，是jquery对象
            },
            eachValidField:function(val){},
            eachInvalidField:function(event, status, options){},
            conditional:{
                phoneyzm: function() {
                    return $('#phoneyzm').val() == code1;
                }
            },
            descriptions:{
                telphone: {
                    required: '请输入手机号码',
                    pattern: '你输入的手机号码格式不正确'
                },
                phoneyzm: {
                    required: '请输入短信验证码',
                    conditional: '您输入的手机短信验证码不正确',
                    valid : '<div class="field-validmsg">正确</div>'
                },
                passwords:{
                    required : '请输入密码',
                    pattern : '你输入的密码格式不正确',
                },
                confirmpassword:{
                    required : '请再次输入密码',
                    conditional : '两次密码不一样'
                }

            }
        });

    });


//遮罩层验证码
//$(function () {
//
//    var code;//声明一个变量用于存储生成的验证码
//    document.getElementById("code").onclick=changeImg;
//    function changeImg(){
//        //alert("换图片");
//        var arrays=new Array(
//            '1','2','3','4','5','6','7','8','9','0',
//            'a','b','c','d','e','f','g','h','i','j',
//            'k','l','m','n','o','p','q','r','s','t',
//            'u','v','w','x','y','z',
//            'A','B','C','D','E','F','G','H','I','J',
//            'K','L','M','N','O','P','Q','R','S','T',
//            'U','V','W','X','Y','Z'
//        );
//        code='';//重新初始化验证码
//        //alert(arrays.length);
//        //随机从数组中获取四个元素组成验证码
//        for(var i=0;i<4;i++){
//            //随机获取一个数组的下标
//            var r=parseInt(Math.random()*arrays.length);
//            code+=arrays[r];
//            //alert(arrays[r]);
//        }
//        //alert(code);
//        document.getElementById('code1').innerHTML=code;//将验证码写入指定区域
//    }
//
////效验验证码(表单被提交时触发)
//    function check(){
//        //获取用户输入的验证码
//        var input_code=document.getElementById('vcode').value;
//        //alert(input_code+"----"+code);
//        if(input_code.toLowerCase()==code.toLowerCase())
//        {
//            //验证码正确(表单提交)
//            return true;
//        }
//        alert("请输入正确的验证码!");
//        //验证码不正确,表单不允许提交
//        return false;
//    }
//
//});


//发送手机验证码
//function clickButton(obj){
//    var obj = $(obj);
//    alert('nihao');
//    obj.attr("disabled","disabled");/*按钮倒计时*/
//    var time = 60;
//    var set=setInterval(function(){
//        obj.val("重新发送"+ --time+"(s)");
//    }, 1000);/*等待时间*/
//    setTimeout(function(){
//        obj.attr("disabled",false).val("重新获取验证码");/*倒计时*/
//        clearInterval(set);
//    }, 60000);
//}


//ajax跨域问题
//var ulmgCode=document.getElementById('vcode').value;
//var jsontext={}
//var jsonDatas=$('#Dform form').serializeArray();
//$.each(jsonDatas,function(index,item){
//    jsontext[item['name']]=item['value'];
//});
//var verifyCode = code1;
//$.ajax({
//    type:"post",    //请求方式
//    async:true,    //是否异步
//    url :"http://192.168.10.100/index.php/Api/User/sms",
//    dataType:"json",    //跨域json请求一定是jsonp
//    jsonp: "callbackparam",    //跨域请求的参数名，默认是callback
//    //jsonpCallback:"successCallback",    //自定义跨域参数值，回调函数名也是一样，默认为jQuery自动生成的字符串
//    data:"&uImgCode="+jsontext.ulmgCode + "phone="+jsontext.phone + "&verifyCode	="+jsontext.verifyCode,    //请求参数
//    success: function(data) {
//        //请求成功处理，和本地回调完全一样
//        //alert("注册成功");
//
//        //如果数据库中已经存在该用户，则注册失败-------------------------------------此功能未解决
//        //if (!ulmgCode == imgCode){
//        //    alert('注册成功');
//        //}
//        //alert('注册失败')
//
//        console.log('发送短信验证码成功');
//    },
//    error : function () {
//
//        console.log("抱歉，发送短信验证码失败");
//    }
//});