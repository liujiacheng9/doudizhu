var audioBGM;


$(() => {

    
    $("#cutscence-video").get(0).volume = .1
    setTimeout(() => {
        $(".cutscenes-container").html('')
        if (!audioBGM) {
            audioBGM = new Audio('../Sound/bgm/game/01.mp3')
            audioBGM.play()
            audioBGM.autoplay = true
            audioBGM.volume = .4
            audioBGM.loop = true
        }
    }, 10000)

    again()



})

window.onresize = function () {
    let clientHeight = document.body.clientHeight
    let screenHeight = window.screen.height
    if (clientHeight === screenHeight) {
        $(".container").css('height', `${screenHeight}px`)

    } else {

        $(".container").css('height', `${clientHeight}px`)
    }
}



var audioBGM
var click = 0
var canShuffle = true

function again() {



    // let poker_html = '';

    // for (let i = 0; i < 54; i++) {
    //     poker_html += '<li class="back" style="top:' + i + 'px"></li>';
    // }

    // $(".mid-cards").empty()

    // $(".mid-cards").html(poker_html); // 把牌组的HTML代码放入页面对应的元素中
    $(".mid-cards").remove()

    hypocrisyCards()
    // hypocrisyCards()
    $(".cards").off("click")
    $(".cards").on("click", ".back", debounceMash(() => {
        console.log(canShuffle)
        if (canShuffle) {
            shufflePoker()
            canShuffle = false

        } else {
            if (player[0].poker.length === 0) {
                // 发牌动画 
                poker()
            }

        }
    }, 500))



}

function hypocrisyCards() {
    for (var j = 0; j < 6; j++) {
        var ul = '<ul class="mid-cards" style="top:' + (9 * j * 0.5) + 'px">';
        for (var i = 0; i < 9; i++) {
            ul += `<li class='back' style='top:${(j+1)*i*0.5}px'></li>`
            // ul += "<li class='back' style='top:0px'></li>"
        }
        ul += '</ul>'
        $('.cards').append(ul)
    }

}

function debounceMash(callback, time) {
    let timerID = null,
        flag = true
    return () => {
        clearTimeout(timerID)
        if (flag) {
            callback()
            flag = false
        } else {
            setTimeout(() => {
                flag = true
            }, time)
        }
    }
}



// 洗牌动画函数
function shufflePoker() {
    // 先保存原牌组的HTML代码
    // var poker_html = $('.cards').html()







    $('.mid-cards li').each(function () {
        $(this).css('top', '0')
    })

    // setTimeout(() => {
    //     $('.mid-cards').remove();
    // }, 500)
    // 1、删除原牌组

    setTimeout(() => {
        // 2、生成新的6组牌
        // for (var j = 0; j < 6; j++) {
        //     // var ul = '<ul class="mid-cards" style="top:' + (-275 * j) + 'px"+>';
        //     var ul = "<ul class='mid-cards' style='top:0px>";
        //     for (var i = 0; i < 9; i++) {
        //         ul += "<li class='back' style='top:0px'></li>"
        //         // ul+=htmlLI
        //     }
        //     ul += '</ul>'
        //     $('.cards').append(ul)
        // }


        var i = 0;
        //outs()    生成6个牌堆的函数
        //1.第一步：生成每9张牌一个牌堆的动画
        setTimeout(function outs() {
            $('.mid-cards').eq(0).find('li').eq(i).animate({
                top: '550px'
            }, 100); //下中牌堆 
            $('.mid-cards').eq(1).find('li').eq(i).animate({
                top: '550px',
                left: '650px'
            }, 100); //下右牌堆
            $('.mid-cards').eq(2).find('li').eq(i).animate({
                top: '550px',
                right: '650px'
            }, 100); //下左牌堆 
            $('.mid-cards').eq(3).find('li').eq(i).animate({
                top: '-50px'
            }, 100); //上中牌堆 
            $('.mid-cards').eq(4).find('li').eq(i).animate({
                top: '-50px',
                left: '650px'
            }, 100); //上右牌堆
            $('.mid-cards').eq(5).find('li').eq(i).animate({
                top: '-50px',
                right: '650px'
            }, 100); //上左牌堆
            i++;
            //调用outs()函数
            if (i < 9) {
                setTimeout(function () {
                    outs();
                }, 50)
            }
        }, 100)
        one()    // 6个牌堆经动画到下中位置变成一个牌堆的函数


        // //2.第二步：6个位置牌堆合成一个牌堆的动画
        setTimeout(function one() {
            //下中牌堆到下左牌堆到上左到上中到上右到下右到下中的动画过程
            $('.mid-cards').eq(0).find('li').eq(i).animate({
                top: '550px',
                right: '650px'
            }, 100).animate({
                top: '-50px',
                right: '650px'
            }, 100).animate({
                top: '-50px',
                right: '0px'
            }, 100).animate({
                top: '-50px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '0px'
            }, 100);
            //下右牌堆移动到下中位置的动画过程
            $('.mid-cards').eq(1).find('li').eq(i).animate({
                top: '550px',
                left: '0px'
            }, 100)


        //     //下左牌堆移动到上左到上中到上右到下右到下中的动画过程
            $('.mid-cards').eq(2).find('li').eq(i).animate({
                top: '-50px',
                right: '650px'
            }, 100).animate({
                top: '-50px',
                right: '0px'
            }, 100).animate({
                top: '-50px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '0px'
            }, 100);
            //上中牌堆移动到上右到下右到下中的动画过程
            $('.mid-cards').eq(3).find('li').eq(i).animate({
                top: '-50px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '0px'
            }, 100);
            //上右牌堆移动到下右到下中的动画过程
            $('.mid-cards').eq(4).find('li').eq(i).animate({
                top: '550px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '0px'
            }, 100);
            //上左牌堆移动到上中到上右到下右到下中的动画过程
            $('.mid-cards').eq(5).find('li').eq(i).animate({
                top: '-50px',
                right: '0px'
            }, 100).animate({
                top: '-50px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '650px'
            }, 100).animate({
                top: '550px',
                left: '0px'
            }, 100);
            i--;
            if (i >= 0) {
                setTimeout(function () {
                    one();
                }, 50)
            }
        }, 700)

        setTimeout(function comeup() {
            $('.mid-cards li').eq(i).css({
                'top': '0px',
                'transform': ' rotateY(90deg) translateX(527px) translateY(136px) translateZ(77px)',
                'transition-duration': '0.5s',
                'transition-timing-function': 'ease-in-out'
            });
            $('.mid-cards li').eq(i).css({
                'top': '0px',
                'transform': 'rotateY(180deg) translateX(0px) translateY(-117px) translateZ(-444px)',
                'transition-duration': '0.5s',
                'transition-timing-function': 'ease-in-out'
            });
            $('.mid-cards li').eq(i).css({
                'top': '0px',
                'transform': 'rotateY(270deg) translateX(-527px) translateY(136px) translateZ(77px)',
                'transition-duration': '0.5s',
                'transition-timing-function': 'ease-in-out'
            });
            $('.mid-cards li').eq(i).css({
                'top': '0px',
                'transform': ' rotateY(360deg) translateX(0px) translateY(-50px) translateZ(176px)',
                'transition-duration': '0.5s',
                'transition-timing-function': 'ease-in-out'
            });
            i++;
            if (i < 54) {
                setTimeout(function () {
                    comeup();
                }, 10)
            }
        }, 2000)


        //牌堆全部炸开的动画效果
        setTimeout(function () {
            for (var i = 0; i < 54; i++) {
                var x = Math.random() * 10;
                var y = Math.random() * 10 - 5;
                $('.mid-cards').find('li').eq(i).animate({
                    top: x * 50 - 50 + 'px',
                    left: y * 150 + 'px',
                }, 100);
            }
        }, 2500)


        //牌堆归为一堆的动画效果
        setTimeout(function back() {

            $('.mid-cards').find('li').eq(i).animate({
                top: '25%',
                left: '0px',
                transform: 'translateY(-50%)'
            }, 50);


            i--;
            if (i >= 0) {
                setTimeout(function () {
                    back();
                }, 10)
            }
        }, 3200)




    }, 500)





}