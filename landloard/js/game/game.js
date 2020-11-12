let container = document.querySelector('.container');
container.style.height = window.innerHeight + 'px';
var BASE_URL = "http://116.62.112.239:8080/landloard-0.0.1-SNAPSHOT"
let color = ['a', 'b', 'c', 'd'];
let point = ['3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', '2', 'joker1', 'joker2'];
let map1 = new Map();
let map2 = new Map();
point.map((item, index) => {
    map1.set(item, index)
});
color.map((item, index) => {
    map2.set(item, index)
});
console.log(map1);
console.log(map2);
console.log(typeof map1.get(point[0]));
console.log(point);
let arr = [];
let remain = [];




// 用于保存当局游戏的数据
let gameData = {
    lord: null, // 当前哪位玩家是地主
    play: null, // 当前到哪位玩家出牌
    // selectPoker:[]      // 当前玩家选择中的牌的数据
    select: {
        type: 0, // 选中牌的牌型
        poker: [], // 选中牌的数据
        max: 0 // 选中牌的牌型中用于判断大小的值
    },
    // 当前桌面牌组数据
    desktop: {
        type: 0, // 选中牌的牌型
        poker: [], // 选中牌的数据
        max: 0 // 选中牌的牌型中用于判断大小的值
    },
    multiple: 1, // 本局游戏结算的倍数

}

function getDOMLI(item) {
    let liHtml = `<li data-point='${item.point}' data-color='${item.color}'><img  src='../images/${''+item.point+item.color}.png' draggable='false'></li>` 
    return liHtml
}

// 生成牌组
function poker() {

    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 4; j++) {
            let temp = {
                point: point[i],
                color: color[j]
            }
            arr.push(temp);
        }
    }
    arr.push({
        point: point[13],
        color: 'b'
    })
    arr.push({
        point: point[14],
        color: 'a'
    })



    // 打乱牌组
    for (let k = 0; k < 1000; k++) {
        let random01 = Math.floor(Math.random() * arr.length);
        let random02 = Math.floor(Math.random() * arr.length);
        let temp = arr[random02]
        // console.log(arr[random02])
        arr[random02] = arr[random01];
        arr[random01] = temp;
    }

    let plays = arr.slice(3, arr.length)
    let length = plays.length + 2
    
    console.log(plays)
    plays.map((item, index) => {
        if (index % 3 == 0) {
            player[0].poker.push(item)
        } else if (index % 3 == 1) {
            player[1].poker.push(item)
        } else {
            player[2].poker.push(item)
        }
    })

    pokerSort()


    for (let i = 0; i < player[0].poker.length; i++) {
      
        setTimeout(() => {
            $('.left_poker').append(getDOMLI(player[0].poker[i]));
            $('.middle_poker').append(getDOMLI(player[1].poker[i]));
            $('.right_poker').append(getDOMLI(player[02].poker[i]));
    
            $(".mid-cards .back").eq(length - i * 3).css({
                'opacity': "0",
                'transform': 'translateX(-800px)'
            })
            $(".mid-cards .back").eq(length - (i * 3 + 1)).css({
                'opacity': "0",
                'transform': 'translateY(400px)'
            })
            $(".mid-cards .back").eq(length - (i * 3 + 2)).css({
                'opacity': "0",
                'transform': 'translateX(800px)'
            })
        }, i * 200)
    }






    setTimeout(() => {
        remain = arr.slice(0, 3);
        $(".mid-cards .back").eq(0).css({
            'opacity': "0",
            'transform': 'translateY(-300px)'
        })

        $(".mid-cards .back").eq(1).css({
            'opacity': "0",
            'transform': 'translate(-50px,-300px)'
        })


        $(".mid-cards .back").eq(2).css({
            'opacity': "0",
            'transform': 'translate(50px,-300px)'
        })






        setTimeout(() => {
            $(".mid-cards").empty()
            pokerSort();
            // 生成剩余三张牌
            $('.remain_poker').empty();
            for (let i = 0; i < remain.length; i++) {
                let li = document.createElement('li');
                li.innerHTML = '<img src="../images/' + remain[i].point + remain[i].color + '.png">';
                $('.remain_poker').append(li);
            }
            robLandlord();
        }, 500)

    }, 200* 12)




}


// 玩家
let player = [{
    name: '拉菲',
    gold: 2000,
    img: '',
    poker: [],
    tuo: false
}, {
    name: 'player2',
    gold: 2000,
    img: '',
    poker: [],
    tuo: false
}, {
    name: 'HENTA',
    gold: 2000,
    img: '',
    poker: [],
    tuo: false
}];


// 生成玩家牌组



//玩家牌组排序
function pokerSort() {
    for (let i = 0; i < player.length; i++) {
        player[i].poker.sort(function (a, b) {
            if (a.point == b.point) {
                return map2.get(a.color) - map2.get(b.color);
            } else {
                return map1.get(b.point) - map1.get(a.point);
            }

        });
    }
}





// console.log(player[0]);

// 生成玩家手牌
function player0() {
    $('.left_poker>li').remove();
    for (let i = 0; i < player[0].poker.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-point', player[0].poker[i].point);
        li.setAttribute('data-color', player[0].poker[i].color);
        li.innerHTML = '<img src="../images/' + player[0].poker[i].point + player[0].poker[i].color + '.png" draggable="false">';
        $('.left_poker').append(li);
    }
}

function player1() {
    $('.middle_poker>li').remove();
    for (let i = 0; i < player[1].poker.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-point', player[1].poker[i].point);
        li.setAttribute('data-color', player[1].poker[i].color);
        li.innerHTML = '<img src="../images/' + player[1].poker[i].point + player[1].poker[i].color + '.png" draggable="false">';
        $('.middle_poker').append(li);
    }
}

function player2() {
    $('.right_poker>li').remove();
    for (let i = 0; i < player[2].poker.length; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-point', player[2].poker[i].point);
        li.setAttribute('data-color', player[2].poker[i].color);
        li.innerHTML = '<img src="../images/' + player[2].poker[i].point + player[2].poker[i].color + '.png" draggable="false">';
        $('.right_poker').append(li);
    }
}






let timerID1 = null;
// 抢地主函数
function robLandlord(get, num, get_data) {

    // 设置参数的默认值
    if (get == undefined) {
        // 随机点名一个玩家开始抢地主
        get = Math.floor(Math.random() * 3);
    }
    let time = 8;
    $('.timer1').html(time);
    timerID1 = setInterval(function () {
        time--;
        $('.timer1').html(time);
        if (time == 0) {
            clearInterval(timerID1);
            time = 8;
            $('.robLandlord').eq(get).find('.noRob').trigger('click');
        }
    }, 1000);

    num = num == undefined ? 0 : num;
    get_data = get_data == undefined ? [null, null, null] : get_data;

    // 判断地主
    if (num == 3) {
        if (get_data[0] == get_data[1] && get_data[1] == get_data[2]) {
            if (get_data[0] == 0) {
                // alert("本局无人抢地主，流局！！");
                console.log("本局无人抢地主，流局！！");
                clearInterval(timerID1);
                reset()
                again();
                return;
            }
        } else {
            if (get_data[0] == 1 && get_data[1] == 0 && get_data[2] == 0) {
                setLandlord(0);
                console.log(0);
                return;
            } else if (get_data[0] == 0 && get_data[1] == 1 && get_data[2] == 0) {
                setLandlord(1);
                console.log(1);
                return;
            } else if (get_data[0] == 0 && get_data[1] == 0 && get_data[2] == 1) {
                setLandlord(2);
                console.log(2);
                return;
            }
        }
    }
    // 不抢 则跳过下一轮抢地主
    if (get_data[get] === 0) {
        get = get + 1 > 2 ? 0 : get + 1;
        robLandlord(get, num, get_data);
        return;
    }

    // $('.robLandlord').hide();
    $('.robLandlord').css({
        opacity: 0,
        pointerEvents: 'none'
    });
    // $('.robLandlord').eq(get).show();
    $('.robLandlord').eq(get).css({
        opacity: 1,
        pointerEvents: 'unset'
    })
    $('.robLandlord .rob').off();
    $('.robLandlord .noRob').off();
    $('.robLandlord').eq(get).find('.rob').on('click', function () {
        gameData.multiple = gameData.multiple * 2;
        $('.bei #beishu').html(gameData.multiple);
        console.log(get, num);
        get_data[get] = 1;
        if (num == 0) {
            $('.bgsound').attr('src', '../Sound/Man/Man_Order.ogg');
        } else if (num == 1) {
            $('.bgsound').attr('src', '../Sound/Man/Man_Rob1.ogg');
        } else if (num == 2) {
            $('.bgsound').attr('src', '../Sound/Man/Man_Rob2.ogg');
        } else if (num == 3) {
            $('.bgsound').attr('src', '../Sound/Man/Man_Rob3.ogg');
        }
        num++;
        console.log('num:' + num);
        if (num == 4) {
            console.log("我是地主" + get);
            setLandlord(get);
            return;
        }
        get++;
        if (get == 3) {
            get = 0;
        }
        clearInterval(timerID1);

        robLandlord(get, num, get_data);
    })

    $('.robLandlord').eq(get).find('.noRob').on('click', function () {

        // console.log(soundSrc.src);
        console.log(get, num);
        get_data[get] = 0;
        if (num == 0) {
            $('.bgsound').attr('src', '../Sound/Man/Man_NoOrder.ogg');
        } else {
            $('.bgsound').attr('src', '../Sound/Man/Man_NoRob.ogg');
        }
        num++;
        console.log('num:' + num);
        let lord;
        if (num == 4) {
            console.log("我是地主");
            let pre = get - 1 < 0 ? 2 : get - 1;
            console.log(get_data[pre]);
            if (get_data[pre] == 1) {
                lord = pre;
            } else {
                lord = pre - 1 < 0 ? 2 : pre - 1;
            }
            setLandlord(lord);
            return;
        }
        get++;
        if (get == 3) {
            get = 0;
        }


        clearInterval(timerID1);
        robLandlord(get, num, get_data);
    })
}
// robLandlord();

// 设置地主
function setLandlord(lord) {
    console.log('setLandlord');
    console.log(lord);
    // $('.robLandlord').hide();
    $('.robLandlord').css({
        opacity: 0,
        pointerEvents: 'none'
    })
    $('.robLandlord .rob').off();
    $('.robLandlord .noRob').off();
    gameData.lord = lord;
    // 最后三张牌加入地主牌组中
    player[gameData.lord].poker = player[gameData.lord].poker.concat(remain);
    console.log(player[gameData.lord].poker.length);
    // 重新排序
    pokerSort();
    // 重新渲染
    player0();
    player1();
    player2();
    // 出牌阶段 
    gameData.play = lord;
    // pokerPlay(0);
    multiple();
}

// 加倍阶段
function multiple() {
    timer2();
    let p = 0;
    // $('.multiple').show();
    $('.multiple').css({
        opacity: 1,
        pointerEvents: 'unset'
    });
    $('.multiple .superDouble').on('click', function () {
        gameData.multiple = gameData.multiple * 4;
        $('.bei #beishu').html(gameData.multiple);
        $('.bgsound').attr('src', '../Sound/Man/Man_chaojijiabei.ogg');
        p++;
        console.log(p);
        // $(this).parents('.multiple').hide();
        $(this).parents('.multiple').css({
            opacity: 0,
            pointerEvents: 'none'
        });
        $(this).off();
        if (p == 3) {
            console.log('倍数' + gameData.multiple);
            clearInterval(timerID);
            console.log('p' + p);
            pokerPlay(0);
            $('.multiple .noDouble').off();
            $('.multiple .double').off();
            $('.multiple .superDouble').off();
            // return;
        }
    })
    $('.multiple .double').on('click', function () {
        gameData.multiple = gameData.multiple * 2;
        $('.bei #beishu').html(gameData.multiple);
        $('.bgsound').attr('src', '../Sound/Man/Man_jiabei.ogg');
        p++;
        console.log(p);

        // $(this).parents('.multiple').hide();
        $(this).parents('.multiple').css({
            opacity: 0,
            pointerEvents: 'none'
        });
        $(this).off();
        if (p == 3) {
            console.log('倍数' + gameData.multiple);
            console.log('p' + p);
            clearInterval(timerID);
            pokerPlay(0);


            $('.multiple .noDouble').off();
            $('.multiple .double').off();
            $('.multiple .superDouble').off();
            // return;
        }
    })
    $('.multiple .noDouble').on('click', function () {
        gameData.multiple = gameData.multiple * 1;
        $('.bei #beishu').html(gameData.multiple);
        $('.bgsound').attr('src', '../Sound/Man/Man_bujiabei.ogg');
        p++;
        // $(this).parents('.multiple').hide();
        $(this).parents('.multiple').css({
            opacity: 0,
            pointerEvents: 'none'
        });
        $(this).off();
        if (p == 3) {
            clearInterval(timerID);
            console.log('倍数' + gameData.multiple);
            console.log('p' + p);
            pokerPlay(0);


            $('.multiple .noDouble').off();
            $('.multiple .double').off();
            $('.multiple .superDouble').off();
            return;
        }
    })


}
// 出牌
var play = 0;

function pokerPlay() {
    console.log(player[gameData.play])
    if (player[gameData.play].tuo == true) {
        console.log('您是托管状态');
        if (play == 2) {
            gameData.desktop.type = 0;
            gameData.desktop.poker = [];
            gameData.desktop.max = 0;
        }
        console.log(play);
        $('.container .desk').eq(gameData.play).find('ul').empty();
        $('.playCard').css({
            opacity: 0,
            pointerEvents: 'none'
        });
        // $('.playCard').eq(gameData.play).show();
        $('.playCard').eq(gameData.play).css({
            opacity: 1,
            pointerEvents: 'unset'
        });
        timer4();
    } else {
        if (play == 2) {
            gameData.desktop.type = 0;
            gameData.desktop.poker = [];
            gameData.desktop.max = 0;
        }
        console.log('你不是托管状态');
        timer3();
        console.log(gameData.play)

        console.log(play);

        $('.playCard').css({
            opacity: 0,
            pointerEvents: 'none'
        });

        $('.playCard').eq(gameData.play).css({
            opacity: 1,
            pointerEvents: 'unset'
        });
        $('.container .desk').eq(gameData.play).find('ul').empty();

        $('.container .poker li').off();
        $('.play').off();
        $('.noPlay').off();
        $('.again').css({
            animation: 'none'
        });




        $('.container .poker:eq(' + gameData.play + ') li').on("click", function () {

            selected(this)
        });


        $('.play').eq(gameData.play).on('click', function () {
            // player[0].poker=[]
            //  gameClose()

            if (!pokerType(gameData.select)) {
                console.log('不符合规则');
                $('.again').css({
                    animation: 'messageShow 2s linear 1 forwards'
                });
            } else {
                if (playCheck()) {
                    $('.select').remove();

                    for (let i = 0; i < gameData.select.poker.length; i++) {
                        for (let j = 0; j < player[gameData.play].poker.length; j++) {
                            if (gameData.select.poker[i].point == player[gameData.play].poker[j].point &&
                                gameData.select.poker[i].color == player[gameData.play].poker[j].color
                            ) {
                                player[gameData.play].poker.splice(j, 1);
                                break;
                            }
                        }
                    }

                    console.log(player[gameData.play].poker.length);
                    if (player[gameData.play].poker.length == 0) {
                        clearInterval(timerID);
                        // 进入结算阶段
                        gameClose();
                        console.log('游戏结束');
                        $('.playCard').css({
                            opacity: 0,
                            pointerEvents: 'none'
                        });
                        return false;
                    }

                    // 1、如果能出的话，首选需要把手牌的数据替换掉桌面的数据
                    // gameData.desktop = gameData.select  // 由于数据是对象直接进行赋值的话是引用赋值，所以不能直接进行赋值
                    gameData.desktop.type = gameData.select.type;
                    gameData.desktop.max = gameData.select.max;
                    // 由于数组也是引用赋值，所以数组的拷贝需要使用循环进行遍历
                    gameData.desktop.poker = [];
                    for (let i = 0; i < gameData.select.poker.length; i++) {
                        gameData.desktop.poker[i] = {};
                        gameData.desktop.poker[i].point = gameData.select.poker[i].point;
                        gameData.desktop.poker[i].color = gameData.select.poker[i].color;
                    }
                    $('.container .desk').hide();

                    for (let i = 0; i < gameData.desktop.poker.length; i++) {
                        let li = document.createElement('li');
                        li.innerHTML = '<img src="../images/' + gameData.desktop.poker[i].point + gameData.desktop.poker[i].color + '.png">';
                        $('.container .desk').eq(gameData.play).show().find('ul').append(li);
                    }
                   
                    if (gameData.select.type == 888 || gameData.select.type == 777 || gameData.select.type == 4) {
                        $('.xiaoguo').animate({
                            left: '100%',
                            opacity: 0
                        }, 0).animate({
                            left: '0',
                            opacity: 0.8
                        }, 1000).animate({
                            left: '0',
                            opacity: 0.8
                        }, 1000).animate({
                            left: '-100%',
                            opacity: 0
                        }, 1000);
                    }


                    gameData.select.type = 0;
                    gameData.select.poker = [];
                    gameData.select.max = 0;

                    clearInterval(timerID)
                    gameData.play = ++gameData.play > 2 ? 0 : gameData.play; // 设置下一个出牌的玩家
                    play = 0;
                    // 使用自调函数让下一个玩家出牌
                    pokerPlay();

                    // clearInterval(timerID)
                } else {
                    console.log('请重新选牌');
                }
            }


        });
        $('.noPlay').eq(gameData.play).on('click', np);

    }

}


function np() {
    console.log('要不起AAAAAAA');
    $('.container .poker:eq(' + gameData.play + ') li').removeClass('select');
    gameData.select.poker = [];
    let random = Math.ceil(Math.random() * 4);
    $('.bgsound').attr('src', '../Sound/Man/Man_buyao' + random + '.ogg');
    if (gameData.desktop.type == 0) {
        console.log('您必须出牌');
        /*  player[gameData.play].poker.splice(player[gameData.play].poker.length - 1, 1);
         $('.container ul:eq(' + gameData.play + ') li').eq(player[gameData.play].poker.length - 1).remove();
         gameData.play = ++gameData.play > 2 ? 0 : gameData.play; // 设置下一个出牌的玩家
         clearInterval(timerID);
         pokerPlay(0); */
    } else {
        $('.container .desk').eq(gameData.play).hide();
        // $('.container .desk ul').empty();
        gameData.play = ++gameData.play > 2 ? 0 : gameData.play; // 设置下一个出牌的玩家
        play = play + 1;;
        console.log('play:' + play);
        clearInterval(timerID);
        pokerPlay();
    }
}

var timerID = null;

function timer2() {
    let time = 5;
    $('.timer2').html(time);
    timerID = setInterval(function () {
        time--;
        $('.timer2').html(time);
        if (time == 0) {
            clearInterval(timerID);
            time = 5;
            $('.multiple .noDouble').trigger('click');
            $('.multiple').css({
                opacity: 0,
                pointerEvents: 'none'
            });
        }
    }, 1000);
}

function timer3() {
    let time = 15;
    $('.timer3').html(time);
    console.log('111')
    timerID = setInterval(function () {
        console.log('222')
        time--;
        $('.timer3').html(time);
        if (time == 0) {
            clearInterval(timerID);
            time = 15;
            player[gameData.play].tuo = true;
            $('.noPlay').eq(gameData.play).trigger('click');
        }
    }, 1000);
}


function timer4() {

    let time = 3;
    $('.timer3').html(time);
    timerID = setInterval(() => {
        time--;
        $('.timer3').html(time);
        if (time == 0) {
            time = 3;
            clearInterval(timerID);

            if (gameData.desktop.type == 0) {
                let len = player[gameData.play].poker.length - 1;
                $('.bgsound').attr('src', '../Sound/Man/Man_' + player[gameData.play].poker[len].point + '.ogg ');
                let li = document.createElement('li');
                li.innerHTML = '<img src="../images/' + player[gameData.play].poker[len].point + player[gameData.play].poker[len].color + '.png">';
                $('.container .desk').eq(gameData.play).show().find('ul').append(li);
                gameData.desktop.type = 1;
                gameData.desktop.max = map1.get(player[gameData.play].poker[len].point);
                gameData.desktop.poker.length = 1;
                console.log('gameData.desktop.max       ' + gameData.desktop.max + '  gameData.desktop.type  ' + gameData.desktop.type);
                console.log('gameData.select.max ' + gameData.select.max);
                console.log('gameData.select.type   ' + gameData.select.type);
                player[gameData.play].poker.splice(len, 1);
                $('.container .poker:eq(' + gameData.play + ') li').eq(len).remove();

                len0();

            } else {
                one(player[gameData.play].poker);
                two(player[gameData.play].poker);
                three(player[gameData.play].poker);
                four(player[gameData.play].poker);
                five(player[gameData.play].poker);
                seven(player[gameData.play].poker);
                eight(player[gameData.play].poker);
                nine(player[gameData.play].poker);
                straight(player[gameData.play].poker);
                jokerBoom();
            }


            time = 3;

            /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            pokerPlay(0); */

        }
    }, 1000)



}



function len0() {
    if (player[gameData.play].poker.length == 0) {
        clearInterval(timerID);

        // 进入结算阶段
        gameClose();
        console.log('游戏结束');
        $('.playCard').css({
            opacity: 0,
            pointerEvents: 'none'
        });

        return false;
    } else {
        gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
        play = 0;
        pokerPlay();
    }
}

//更新玩家数据
function updatePlayer() {
    player.map((item, index) => {
        console.log(item.gold)
        $(".score").eq(index).text(item.gold)
    })
}

//游戏重置
function reset() {

    $(".poker").empty()
    $(".remain_poker").empty()
    $('.game-mask').css({
        display: 'none',
    });

    clearInterval(timerID);
    clearInterval(timerID1);

    
 


    arr = [];
    gameData.lord = null;
    gameData.play = null;
    gameData.desktop.type = 0;
    gameData.desktop.poker = [];
    gameData.desktop.max = 0;
    gameData.multiple = 1;
    gameData.select.type = 0;
    gameData.select.poker = [];
    gameData.select.max = 0;

    player.map((item) => {
        item.poker = []
        item.tuo=false
    })

    $('.playCard').css({
        opacity: 0,
        pointerEvents: 'none'
    });

    $(".robLandlord").css({
        opacity: 0,
        pointerEvents: 'none'
    })

    $(".desk ul").empty()
    $('.container .desk').eq(gameData.play).find('ul').empty();

    $('.container .poker li').off();
    $('.play').off();
    $('.noPlay').off();

    $('.bei #beishu').html(gameData.multiple);
    $('.settlement').hide();

    canShuffle = true
    updatePlayer()
    // $('#p1_balance').text(`${user.balance}金币`)




}

//游戏结算
function settlement() {
    let count = 5 * gameData.multiple;




    let ps = player[0].name + ',' + player[2].name

    console.log(player)
    console.log(player[1].gold)

    let profit;
    if (gameData.lord === 1) {
        profit = (player[1].poker.length == 0 ? 2 * count : -2 * count)
    } else {
        profit = (player[1].poker.length == 0 ? count : -count)
    }
    
   
    console.log(user)

    if (user) {
        user.balance = user.balance + profit;
        let data = {
            account: user.account,
            userId: user.id,
            players: ps,
            profit: profit,
            balance: player[1].gold + profit,
            score: 5,
            multiple: gameData.multiple,
            identity: gameData.lord === 1 ? '地主' : '农民'
        }

        $.ajax({
            url: `${BASE_URL}/user/update_history`,
            data: data,
            type: "POST",
            success: (data) => {
                console.log(data)


            }
        })
    }

    console.log($('.user  .name'))
    console.log($(".gold"))
    if (player[gameData.lord].poker.length == 0) {
        player[gameData.lord].gold = player[gameData.lord].gold + count * 2;
        $('.name,.gold').css({
            color: 'red'
        })
        $('.name').eq(gameData.lord).html(player[gameData.lord].name).css({
            color: 'green'
        });
        $('.gold').eq(gameData.lord).html('+ ' + count * 2).css({
            color: 'green'
        });
        console.log('地主' + player[gameData.lord].gold);
        if (gameData.lord == 0) {
            player[2].gold = player[2].gold - count;
            console.log('农民2' + player[2].gold);
            player[1].gold = player[1].gold - count;
            console.log('农民1' + player[1].gold);
            $('.name').eq(1).html(player[1].name);
            $('.gold').eq(1).html('- ' + count);
            $('.name').eq(2).html(player[2].name);
            $('.gold').eq(2).html('- ' + count);
            return true;
        } else if (gameData.lord == 1) {
            player[2].gold = player[2].gold - count;
            console.log('农民2' + player[2].gold);
            player[0].gold = player[0].gold - count;
            $('.name').eq(0).html(player[0].name);

            $('.gold').eq(0).html('- ' + count);
            $('.name').eq(2).html(player[2].name);
            $('.gold').eq(2).html('- ' + count);
            return true;
        } else if (gameData.lord == 2) {
            player[1].gold = player[1].gold - count;
            console.log('农民2' + player[1].gold);
            player[0].gold = player[0].gold - count;
            console.log('农民1' + player[0].gold);
            $('.name').eq(1).html(player[1].name);
            $('.gold').eq(1).html('- ' + count);
            $('.name').eq(0).html(player[0].name);
            $('.gold').eq(0).html('- ' + count);
            return;
        }
        console.log('地主胜利');
        return;
    } else {
        player[gameData.lord].gold = player[gameData.lord].gold - count * 2;
        console.log('地主' + player[gameData.lord].gold);
        $('.name,.gold').css({
            color: 'green'
        })
        $('.name').eq(gameData.lord).html(player[gameData.lord].name).css({
            color: 'red'
        });
        $('.gold').eq(gameData.lord).html('- ' + count * 2).css({
            color: 'red'
        });

        if (gameData.lord == 0) {
            player[2].gold = player[2].gold + count;
            console.log('农民1' + player[2].gold);
            player[1].gold = player[1].gold + count;
            console.log('农民1' + player[1].gold);
            $('.name').eq(1).html(player[1].name);
            $('.gold').eq(1).html('+ ' + count);
            $('.name').eq(2).html(player[2].name);
            $('.gold').eq(2).html('+ ' + count);
            return true;
        } else if (gameData.lord == 1) {
            player[2].gold = player[2].gold + count;
            console.log('农民2' + player[2].gold);
            player[0].gold = player[0].gold + count;
            console.log('农民1' + player[0].gold);

            $('.name').eq(0).html(player[0].name);
            $('.gold').eq(0).html('+ ' + count);
            $('.name').eq(2).html(player[2].name);
            $('.gold').eq(2).html('+ ' + count);
            return true;
        } else if (gameData.lord == 2) {
            player[1].gold = player[1].gold + count;
            console.log('农民2' + player[1].gold);
            player[0].gold = player[0].gold + count;
            console.log('农民1' + player[0].gold);
            $('.name').eq(1).html(player[1].name);
            $('.gold').eq(1).html('+ ' + count);
            $('.name').eq(0).html(player[0].name);
            $('.gold').eq(0).html('+ ' + count);
            return true;
        }

        return;
    }



}

//游戏结束
function gameClose() {
    $('.game-mask').css({
        display: 'block',
    });
    clearInterval(timerID);
    $('.settlement').show();
    settlement()

    $('.closeVF').on('click', function () {
        $('.settlement').hide();
    })
    $('.oneMore').on('click', function () {
        reset()
        again()
    })

}

$('.setUp').on('click', function () {
    $('.setUpMenu').show();

    $('.close').on('click', function () {
        $('.setUpMenu').hide();

    });

    $('.open').eq(0).on('click', function () {
        $(this).hide();
        $(this).siblings().show();
        audioBGM.pause();

    });

    $('.open').eq(1).on('click', function () {
        $(this).hide();
        $(this).siblings().show();
        let bgsound = $("#bgsound").get(0)
        bgsound.play();
        bgsound.src = '';
        bgsound.muted = true;
    });


    $('.down').eq(0).on('click', function () {
        $(this).hide();
        $(this).siblings().show();
        audioBGM.play();
    })


    $('.down').eq(1).on('click', function () {



        $(this).hide();
        $(this).siblings().show();
        let bgsound = $("#bgsound").get(0)
        bgsound.play();
        bgsound.src = '';
        bgsound.muted = false;
    })
})
// left
$('.left_poker').on('mousedown', function () {
    console.log('mousedown');
    $('.left_poker li').on('mouseenter', function () {
        selected(this)
    })
})
$('.left_poker').on('mouseup', function () {
    $('.left_poker li').off('mouseenter');
})
$('.left_poker').on('mouseleave', function () {
    $('.left_poker li').off('mouseenter');
})

// middle
$('.middle_poker').on('mousedown', function () {
    console.log('mousedown');

    $('.middle_poker li').on('mouseenter', function () {
        selected(this)
    })
})
$('.middle_poker').on('mouseup', function () {
    $('.middle_poker li').off('mouseenter');
})
$('.middle_poker').on('mouseleave', function () {
    $('.middle_poker li').off('mouseenter');
})

// right
$('.right_poker').on('mousedown', function () {
    console.log('mousedown');
    $('.right_poker li').on('mouseenter', function () {
        selected(this)
    })
})
$('.right_poker').on('mouseup', function () {
    $('.right_poker li').off('mouseenter');
})
$('.right_poker').on('mouseleave', function () {
    $('.right_poker li').off('mouseenter');
})

window.onbeforeunload = function () {

    if (user) {
        sessionStorage['user'] = JSON.stringify(user)
    }

}



function selected(li) {
    if ($(li).hasClass('select')) {
        $(li).removeClass('select');
        let poker = {};
        poker.point = $(li).attr('data-point');
        poker.color = $(li).attr("data-color");
        for (let i = 0; i < gameData.select.poker.length; i++) {
            if (gameData.select.poker[i].point == poker.point && gameData.select.poker[i].color == poker.color) {
                gameData.select.poker.splice(i, 1);
                break;
            }
        }

    } else {
        $(li).addClass('select')
        let poker = {};
        poker.point = $(li).attr('data-point');
        poker.color = $(li).attr("data-color");
        gameData.select.poker.push(poker);
        gameData.select.poker.sort(function (a, b) {
            return map1.get(b.point) - map1.get(a.point);
        });
    }
}