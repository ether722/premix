// @ts-nocheck

import { useEffect } from 'react'
import './index.scss'

export default (props: {
    src: string
}) => {
    useEffect(() => {
        setTimeout(() => {
            //鼠标在消息上时
            $(document).ready(function ($) {
                $("#message").hover(function () {
                    $("#message").fadeTo(100, 1);
                });
            });

            let msgs;
            let isindex: boolean;
            let visitor: string;
            let title: string;
            let s;

            //鼠标在上方时
            $(document).ready(function ($) {
                //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
                $(".mumu").mouseover(function () {
                    $(".mumu").fadeTo(300, 0.3);
                    msgs = ["我隐身了，你看不到我", "我会隐身哦！嘿嘿！", "别动手动脚的，把手拿开！", "把手拿开我才出来！", "告诉你个秘密：xxx", "https://pooook.cn"];
                    let i = Math.floor(Math.random() * msgs.length);
                    showMessage(msgs[i], 0);
                });
                $(".mumu").mouseout(function () {
                    $(".mumu").fadeTo(300, 1);
                });
            });

            //开始
            $(document).ready(function ($) {
                if (isindex) { //如果是主页
                    let now = (new Date()).getHours();
                    if (now > 0 && now <= 6) {
                        showMessage(visitor + ' 你是夜猫子呀？还不睡觉，明天起的来么你？', 6000);
                    } else if (now > 6 && now <= 11) {
                        showMessage(visitor + ' 早上好，早起的鸟儿有虫吃噢！早起的虫儿被鸟吃，你是鸟儿还是虫儿？嘻嘻！', 6000);
                    } else if (now > 11 && now <= 14) {
                        showMessage(visitor + ' 中午了，吃饭了么？不要饿着了，饿死了谁来挺我呀！', 6000);
                    } else if (now > 14 && now <= 18) {
                        showMessage(visitor + ' 中午的时光真难熬！还好有你在！', 6000);
                    } else {
                        showMessage(visitor + ' 快来逗我玩吧！', 6000);
                    }
                } else {
                    showMessage('欢迎' + visitor + '来到《' + title + '》', 6000);
                }
                $(".spig").animate({
                    top: $(".spig").offset()!.top + 300,
                    left: document.body.offsetWidth - 160
                }, {
                    queue: false,
                    duration: 1000
                });
            });

            //鼠标在某些元素上方时
            $(document).ready(function ($) {
                $('h2 a').click(function () { //标题被点击时
                    showMessage('正在用吃奶的劲加载《<span style="color:#0099cc;">' + $(this).text() + '</span>》请稍候', 0);
                });
                $('h2 a').mouseover(function () {
                    showMessage('要看看《<span style="color:#0099cc;">' + $(this).text() + '</span>》这篇文章么？', 0);
                });
                $('#prev-page').mouseover(function () {
                    showMessage('要翻到上一页吗?', 0);
                });
                $('#next-page').mouseover(function () {
                    showMessage('要翻到下一页吗?', 0);
                });
                $('#index-links li a').mouseover(function () {
                    showMessage('去 <span style="color:#0099cc;">' + $(this).text() + '</span> 逛逛', 0);
                });
                $('.comments').mouseover(function () {
                    showMessage('<span style="color:#0099cc;">' + visitor + '</span> 向评论栏出发吧！', 0);
                });
                $('#submit').mouseover(function () {
                    showMessage('确认提交了么？', 0);
                });
                $('input[name="keyword"]').mouseover(function () {
                    showMessage('输入你想搜索的关键词再按Enter(回车)键就可以搜索啦!', 0);
                });
                $('#go-prev').mouseover(function () {
                    showMessage('点它可以后退哦！', 0);
                });
                $('#go-next').mouseover(function () {
                    showMessage('点它可以前进哦！', 0);
                });
                $('#refresh').mouseover(function () {
                    showMessage('点它可以重新载入此页哦！', 0);
                });
                $('#go-home').mouseover(function () {
                    showMessage('点它就可以回到首页啦！', 0);
                });
                $('#addfav').mouseover(function () {
                    showMessage('点它可以把此页加入书签哦！', 0);
                });
                $('#nav-two a').mouseover(function () {
                    showMessage('嘘，从这里可以进入控制面板的哦！', 0);
                });
                $('.post-category a').mouseover(function () {
                    showMessage('点击查看此分类下得所有文章', 0);
                });
                $('.post-heat a').mouseover(function () {
                    showMessage('点它可以直接跳到评论列表处.', 0);
                });
                $('#tho-shareto span a').mouseover(function () {
                    showMessage('你知道吗?点它可以分享本文到' + $(this).attr('title'), 0);
                });
                $('#switch-to-wap').mouseover(function () {
                    showMessage('点击可以切换到手机版博客版面', 0);
                });
            });

            //无聊讲点什么
            $(document).ready(function ($) {
                window.setInterval(function () {
                    msgs = ["好无聊啊！", "好想做爱吖", "陪我聊天吧！", "你在干什么哦！", "好无聊哦，你都不陪我玩！", "…@……!………", "^%#&*!@*(&#)(!)(", "我可爱吧！嘻嘻!~^_^!~~", "谁淫荡呀?~谁淫荡?，你淫荡呀!~~你淫荡！~~", "从前有座山，山上有座庙，庙里有个老和尚给小和尚讲故事，讲：“从前有座……”"];
                    let i = Math.floor(Math.random() * msgs.length);
                    showMessage(msgs[i], 10000);
                }, 35000);
            });

            //无聊动动
            $(document).ready(function ($) {
                window.setInterval(function () {
                    msgs = ["别过来！再过来我就脱衣服了！", "好无聊啊！", "陪我聊天吧！", "你在干什么哦！", "乾坤大挪移！", "我飘过来了！~", "我飘过去了", "我得意地飘！~飘！~"];
                    let i = Math.floor(Math.random() * msgs.length);
                    s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
                    let i1 = Math.floor(Math.random() * s.length);
                    let i2 = Math.floor(Math.random() * s.length);
                    $(".spig").animate({
                        left: document.body.offsetWidth / 2 * (1 + s[i1]),
                        top: document.body.offsetHeight / 2 * (1 + s[i1])
                    }, {
                        duration: 2000,
                        complete: showMessage(msgs[i], 0)
                    });
                }, 45000);
            });

            //评论资料
            $(document).ready(function ($) {
                $('input[name="comname"]').click(function () {
                    showMessage("请问阁下的尊姓大名！", 0);
                    $(".spig").animate({
                        top: $('input[name="comname"]').offset()!.top - 70,
                        left: $('input[name="comname"]').offset()!.left - 170
                    }, {
                        queue: false,
                        duration: 1000
                    });
                });
                $('input[name="commail"]').click(function () {
                    showMessage("阁下邮箱是必不可少的哦，不然就是无头像人士了！", 0);
                    $(".spig").animate({
                        top: $('input[name="commail"]').offset()!.top - 70,
                        left: $('input[name="commail"]').offset()!.left - 170
                    }, {
                        queue: false,
                        duration: 1000
                    });
                });
                $('input[name="comurl"]').click(function () {
                    showMessage("阁下的家在哪里，在下想去参观呢！", 0);
                    $(".spig").animate({
                        top: $('input[name="comurl"]').offset()!.top - 70,
                        left: $('input[name="comurl"]').offset()!.left - 170
                    }, {
                        queue: false,
                        duration: 1000
                    });
                });
                $("#comment").click(function () {
                    showMessage("阁下请认真填写哦！不然会被陛下处以死刑", 0);
                    $(".spig").animate({
                        top: $("#comment").offset()!.top - 70,
                        left: $("#comment").offset()!.left - 170
                    }, {
                        queue: false,
                        duration: 1000
                    });
                });
            });

            let spig_top = 50;
            //滚动条移动
            $(document).ready(function ($) {
                let f = $(".spig").offset()!.top;
                $(window).scroll(function () {
                    $(".spig").animate({
                        top: $(window).scrollTop()! + f + 300
                    }, {
                        queue: false,
                        duration: 1000
                    });
                });
            });

            //鼠标点击时
            $(document).ready(function ($) {
                let stat_click = 0;
                $(".mumu").click(function () {
                    if (!ismove) {
                        stat_click++;
                        if (stat_click > 4) {
                            msgs = ["你有完没完呀？", "你已经摸我" + stat_click + "次了", "非礼呀！救命！OH，My ladygaga"];
                            let i = Math.floor(Math.random() * msgs.length);
                            //showMessage(msgs[i]);
                        } else {
                            msgs = ["筋斗云！~我飞！", "我跑呀跑呀跑！~~", "别摸我，都是男人有什么好摸的！", "惹不起你，我还躲不起你么？", "不要摸我了，我会告诉老婆来打你的！", "干嘛动我呀！小心我咬你！"];
                            let i = Math.floor(Math.random() * msgs.length);
                            //showMessage(msgs[i]);
                        }
                        s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
                        let i1 = Math.floor(Math.random() * s.length);
                        let i2 = Math.floor(Math.random() * s.length);
                        // @ts-nocheck
                        $(".spig").animate({
                            left: document.body.offsetWidth / 2 * (1 + s[i1]),
                            top: document.body.offsetHeight / 2 * (1 + s[i1])
                        }, {
                            duration: 500,
                            complete: showMessage(msgs[i], 0)
                        });
                    } else {
                        ismove = false;
                    }
                });
            });

            //显示消息函数 
            function showMessage(a: string | Element | Document | DocumentFragment | Comment | ((this: HTMLElement, index: number, oldhtml: string) => string | JQuery.Node), b: string | number | ((this: HTMLElement) => void) | JQuery.EffectsOptions<HTMLElement> | null | undefined) {
                if (b == null) b = 10000;
                $("#message").hide().stop();
                $("#message").html(a);
                $("#message").fadeIn();
                $("#message").fadeTo(1, 1);
                $("#message").fadeOut(b);
            };

            //拖动
            let _move = false;
            let ismove = false; //移动标记
            let _x: number, _y: number; //鼠标离控件左上角的相对位置
            $(document).ready(function ($) {
                $("#spig").mousedown(function (e) {
                    _move = true;
                    _x = e.pageX - parseInt($("#spig").css("left"));
                    _y = e.pageY - parseInt($("#spig").css("top"));
                });
                $(document).mousemove(function (e) {
                    if (_move) {
                        let x = e.pageX - _x;
                        let y = e.pageY - _y;
                        let wx = $(window).width()! - $('#spig').width()!;
                        let dy = $(document).height()! - $('#spig').height()!;
                        if (x >= 0 && x <= wx && y > 0 && y <= dy) {
                            $("#spig").css({
                                top: y,
                                left: x
                            }); //控件新位置
                            ismove = true;
                        }
                    }
                }).mouseup(function () {
                    _move = false;
                });
            });
        })
    })

    return (
        <div id="spig" className="spig">
            <div id="message">hhh</div>
            <div id="mumu" className="mumu">
                <img src={`${props.src || ''}`} />
            </div>
        </div>
    )
}
