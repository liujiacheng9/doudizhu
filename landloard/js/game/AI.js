// 检查牌组的函数
/* 
    牌型分类：
    1       单张
    2       对子
    3       三张
    4       普炸
    5       三带一
    6       顺子
    7       三带二
    8       连对
    9       四带二
    10      四带两对
    777     飞机
    888     王炸
*/


// 单张判断
function one(poker) {
    let arrPoker = [];
    if (gameData.desktop.type == 1) {
        for (let i = 0; i < poker.length; i++) {
            if (map1.get(poker[i].point) > gameData.desktop.max) {

                arrPoker.push({
                    point: poker[i].point,
                    color: poker[i].color
                });
            }
        }
        if (arrPoker.length > 0) {
            $('.bgsound').attr('src', '../Sound/Man/Man_' + arrPoker[arrPoker.length - 1].point + '.ogg ');
            console.log('arrPoker ' + arrPoker[arrPoker.length - 1].point);
            for (let i = 0; i < poker.length; i++) {
                if (arrPoker[arrPoker.length - 1].point == poker[i].point &&
                    arrPoker[arrPoker.length - 1].color == poker[i].color
                ) {
                    showDesk(poker[i]);
                    poker.splice(i, 1);
                    $('.container .poker:eq(' + gameData.play + ') li').eq(i).remove();
                    break;
                }

            }
            //  
            gameData.desktop.type = 1;
            gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
            gameData.desktop.poker.length = 1;
            len0();
            // gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            // play = 0;
            // pokerPlay();

        } else {
            console.log("要不起");
            np();
        }

    }

}

// 对子判断
function two(poker) {
    let arrPoker = [];
    if (gameData.desktop.type == 2) {
        for (let i = 0; i < poker.length - 1; i++) {
            if (poker[i].point == poker[i + 1].point &&
                map1.get(poker[i].point) > gameData.desktop.max
            ) {
                arrPoker.push(poker[i]);
            }
        }
        console.log(arrPoker);
        if (arrPoker.length > 0) {
            console.log('对子  ' + arrPoker[arrPoker.length - 1].color);
            for (let j = 0; j < 2; j++) {
                for (let i = 0; i < poker.length; i++) {
                    if (arrPoker[arrPoker.length - 1].point == poker[i].point) {
                        console.log('111111111111');
                        console.log(poker[i]);
                        showDesk(poker[i]);
                        poker.splice(i, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                        break;
                    }
                }
            }
            $('.bgsound').attr('src', '../Sound/Man/Man_dui' + arrPoker[arrPoker.length - 1].point + '.ogg ');

            gameData.desktop.type = 2;
            gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
            len0();
            // gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            // play = 0;
            // pokerPlay();
        } else {
            for (let i = 0; i < poker.length - 3; i++) {
                if (poker[i].point == poker[i + 3].point) {
                    arrPoker.push(poker[i]);
                }
            }
            if (arrPoker.length > 0) {
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < poker.length; i++) {
                        if (arrPoker[arrPoker.length - 1].point == poker[i].point) {
                            console.log('111111111111');
                            console.log(poker[i]);
                            showDesk(poker[i]);
                            poker.splice(i, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                            break;
                        }
                    }
                }
                $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                showImg();
                /*  gameData.desktop.type = 4;
                                gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
                                gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                pokerPlay(0); */

                gameData.desktop.type = 4;
                gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
                len0();
                // gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                // play = 0;
                // pokerPlay();
            } else {
                if (poker[0].point == 'joker2' && poker[1].point == 'joker1') {
                    arrPoker.push(poker[0]);
                }

                if (arrPoker.length == 1 && arrPoker[0].point == 'joker2') {
                    console.log('王炸');
                    for (let i = 0; i < 2; i++) {
                        console.log(poker[i]);
                        showDesk(poker[0]);
                        poker.splice(0, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(0).remove();
                    }
                    /*  gameData.desktop.type = 888;
                     gameData.desktop.max = map1.get(arrPoker[0].point);
                     gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                     pokerPlay(0); */
                    $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                    $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                    showImg();

                    gameData.desktop.type = 888;
                    gameData.desktop.max = map1.get(arrPoker[0].point);
                    len0();
                     /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    play = 0;
                    pokerPlay();*/
                } else {
                    console.log("要不起");
                    np();
                }
            }
        }

    }
}

// 三张判断
function three(poker) {
    let arrPoker = [];
    if (gameData.desktop.type == 3) {
        for (let i = 0; i < poker.length - 2; i++) {
            if (poker[i].point == poker[i + 1].point &&
                poker[i + 1].point == poker[i + 2].point &&
                map1.get(poker[i].point) > gameData.desktop.max
            ) {
                arrPoker.push(poker[i]);
            }
        }
        console.log(arrPoker);
        if (arrPoker.length > 0) {
            console.log('三个  ' + arrPoker[arrPoker.length - 1]);
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < poker.length; i++) {
                    if (arrPoker[arrPoker.length - 1].point == poker[i].point) {
                        console.log('111111111111');
                        console.log(poker[i]);
                        showDesk(poker[i]);
                        poker.splice(i, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                        break;
                    }
                }
            }
            $('.bgsound').attr('src', '../Sound/Man/Man_tuple' + arrPoker[arrPoker.length - 1].point + '.ogg ');


            gameData.desktop.type = 3;
            gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
            len0();
            // gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            // play = 0;
            // pokerPlay();
        } else {
            for (let i = 0; i < poker.length - 3; i++) {
                if (poker[i].point == poker[i + 3].point) {
                    arrPoker.push(poker[i]);
                }
            }
            if (arrPoker.length > 0) {
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < poker.length; i++) {
                        if (arrPoker[arrPoker.length - 1].point == poker[i].point) {
                            console.log('111111111111');
                            console.log(poker[i]);
                            showDesk(poker[i]);
                            poker.splice(i, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                            break;
                        }
                    }
                }
                $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                showImg();
                /* gameData.desktop.type = 4;
                               gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
                               gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                               pokerPlay(0); */

                gameData.desktop.type = 4;
                gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
                len0();
                /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                play = 0;
                pokerPlay(); */
            } else {
                if (poker[0].point == 'joker2' && poker[1].point == 'joker1') {
                    arrPoker.push(poker[0]);
                }

                if (arrPoker.length == 1 && arrPoker[0].point == 'joker2') {
                    console.log('王炸');
                    for (let i = 0; i < 2; i++) {
                        console.log(poker[0]);
                        showDesk(poker[0]);
                        poker.splice(0, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(0).remove();
                    }
                    $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                    $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                    showImg();
                    /* gameData.desktop.type = 888;
                                       gameData.desktop.max = map1.get(arrPoker[0].point);
                                       gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                       pokerPlay(0); */

                    gameData.desktop.type = 888;
                    gameData.desktop.max = map1.get(arrPoker[0].point);
                    len0();
                     /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    play = 0;
                    pokerPlay();*/
                } else {
                    console.log("要不起");
                    np();
                }
            }
        }
    }
}
// 判断炸弹
function four(poker) {
    let arrPoker = [];
    if (gameData.desktop.type == 4) {
        for (let i = 0; i < poker.length - 3; i++) {
            if (poker[i].point == poker[i + 3].point &&
                map1.get(poker[i].point) > gameData.desktop.max
            ) {
                arrPoker.push(poker[i]);
            }
        }
        console.log(arrPoker);
        if (arrPoker.length > 0) {
            console.log('zhadan  ' + arrPoker[arrPoker.length - 1].color);
            for (let j = 0; j < 4; j++) {
                for (let i = 0; i < poker.length; i++) {
                    if (arrPoker[arrPoker.length - 1].point == poker[i].point) {
                        console.log('111111111111');
                        console.log(poker[i]);
                        showDesk(poker[i]);
                        poker.splice(i, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                        break;
                    }
                }
            }
            $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
            $('.xiaoguo img').attr('src', '../images/zhadan.gif');
            showImg();
            /* gameData.desktop.type = 4;
                       gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
                       gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                       pokerPlay(0); */

            gameData.desktop.type = 4;
            gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
            len0();
            /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            play = 0;
            pokerPlay(); */
        } else {
            if (poker[0].point == 'joker2' && poker[1].point == 'joker1') {
                arrPoker.push(poker[0]);
            }

            if (arrPoker.length == 1 && arrPoker[0].point == 'joker2') {
                console.log('王炸');
                for (let i = 0; i < 2; i++) {
                    console.log(poker[i]);
                    showDesk(poker[0]);
                    poker.splice(0, 1);
                    $('.container ul:eq(' + gameData.play + ') li').eq(0).remove();
                }
                $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                showImg();
                /*  gameData.desktop.type = 888;
                                gameData.desktop.max = map1.get(arrPoker[0].point);
                                gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                pokerPlay(0); */

                gameData.desktop.type = 888;
                gameData.desktop.max = map1.get(arrPoker[0].point);
                len0();
                /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                play = 0;
                pokerPlay(); */
            } else {
                console.log("要不起");
                np();
            }
        }

    }
}

// 判断三代一
function five(poker) {
    let arrPoker = [];
    if (gameData.desktop.type == 5) {
        for (let i = 0; i < poker.length - 2; i++) {
            if (poker[i].point == poker[i + 1].point &&
                poker[i + 1].point == poker[i + 2].point &&
                map1.get(poker[i].point) > gameData.desktop.max
            ) {
                arrPoker.push(poker[i]);
            }
        }
        console.log(arrPoker);
        if (arrPoker.length > 0) {
            console.log('三带一  ' + arrPoker[arrPoker.length - 1]);
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < poker.length; i++) {
                    if (arrPoker[arrPoker.length - 1].point == poker[i].point) {
                        console.log('111111111111');
                        console.log(poker[i]);
                        showDesk(poker[i]);
                        poker.splice(i, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                        break;
                    }
                }
            }
            let num = poker.length - 1;
            console.log(poker[poker.length - 1]);
            showDesk(poker[num]);
            poker.splice(num, 1);
            $('.container ul:eq(' + gameData.play + ') li').eq(num).remove();
            Sound('sandaiyi')
            /*  gameData.desktop.type = 5;
             gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
             gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
             pokerPlay(0); */

            gameData.desktop.type = 5;
            gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
            len0();
            /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            play = 0;
            pokerPlay(); */
        } else {
            for (let i = 0; i < poker.length - 3; i++) {
                if (poker[i].point == poker[i + 3].point) {
                    arrPoker.push(poker[i]);
                }
            }
            if (arrPoker.length > 0) {
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < poker.length; i++) {
                        if (arrPoker[arrPoker.length - 1].point == poker[i].point) {
                            console.log('111111111111');
                            console.log(poker[i]);
                            showDesk(poker[i]);
                            poker.splice(i, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                            break;
                        }
                    }
                }
                $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                showImg();
                /*  gameData.desktop.type = 4;
                                gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
                                gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                pokerPlay(0); */

                gameData.desktop.type = 4;
                gameData.desktop.max = map1.get(arrPoker[arrPoker.length - 1].point);
                len0();
               /*  gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                play = 0;
                pokerPlay(); */
            } else {
                if (poker[0].point == 'joker2' && poker[1].point == 'joker1') {
                    arrPoker.push(poker[0]);
                }

                if (arrPoker.length == 1 && arrPoker[0].point == 'joker2') {
                    console.log('王炸');
                    for (let i = 0; i < 2; i++) {
                        console.log(poker[0]);
                        showDesk(poker[0]);
                        poker.splice(0, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(0).remove();
                    }
                    $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                    $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                    showImg();
                    /* gameData.desktop.type = 888;
                                       gameData.desktop.max = map1.get(arrPoker[0].point);
                                       gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                       pokerPlay(0); */

                    gameData.desktop.type = 888;
                    gameData.desktop.max = map1.get(arrPoker[0].point);
                    len0();
                     /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    play = 0;
                    pokerPlay();*/
                } else {
                    console.log("要不起");
                    np();
                }
            }
        }

    }

}




// 判断三带二
function seven(poker) {
    let arrPoker3 = [];
    let arrPoker2 = [];
    if (gameData.desktop.type == 7) {
        for (let i = 0; i < poker.length - 2; i++) {
            if (poker[i].point == poker[i + 1].point &&
                poker[i + 1].point == poker[i + 2].point &&
                map1.get(poker[i].point) > gameData.desktop.max
            ) {
                arrPoker3.push(poker[i]);
            }
        }
        for (let i = 0; i < poker.length - 1; i++) {
            if (poker[i].point == poker[i + 1].point) {
                arrPoker2.push(poker[i]);
            }
        }
        console.log(arrPoker2);
        if (arrPoker3.length > 0 && arrPoker2.length > 0) {
            console.log('三带二  ' + arrPoker3[arrPoker3.length - 1]);
            for (let j = 0; j < 3; j++) {
                for (let i = 0; i < poker.length; i++) {
                    if (arrPoker3[arrPoker3.length - 1].point == poker[i].point) {
                        console.log('111111111111');
                        console.log(poker[i]);
                        showDesk(poker[i]);
                        poker.splice(i, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                        break;
                    }
                }
            }
            if (arrPoker2[arrPoker2.length - 1].point == arrPoker3[arrPoker3.length - 1].point) {
                for (let j = 0; j < 2; j++) {
                    for (let i = 0; i < poker.length; i++) {
                        if (arrPoker2[arrPoker2.length - 2].point == poker[i].point) {
                            console.log('2222222');
                            console.log(poker[i]);
                            showDesk(poker[i]);
                            poker.splice(i, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                            break;
                        }
                    }
                }
            } else {
                for (let j = 0; j < 2; j++) {
                    for (let i = 0; i < poker.length; i++) {
                        if (arrPoker2[arrPoker2.length - 1].point == poker[i].point) {
                            console.log('2222222');
                            console.log(poker[i]);
                            showDesk(poker[i]);
                            poker.splice(i, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                            break;
                        }
                    }
                }
            }
            Sound('sandaiyidui');
            /* gameData.desktop.type = 7;
            gameData.desktop.max = map1.get(arrPoker3[arrPoker3.length - 1].point);
            gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            pokerPlay(0); */

            gameData.desktop.type = 7;
            gameData.desktop.max = map1.get(arrPoker3[arrPoker3.length - 1].point);
            len0();
            /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            play = 0;
            pokerPlay(); */
        } else {
            for (let i = 0; i < poker.length - 3; i++) {
                if (poker[i].point == poker[i + 3].point) {
                    arrPoker3.push(poker[i]);
                }
            }
            if (arrPoker3.length > 0) {
                for (let j = 0; j < 4; j++) {
                    for (let i = 0; i < poker.length; i++) {
                        if (arrPoker[arrPoker3.length - 1].point == poker[i].point) {
                            console.log('111111111111');
                            console.log(poker[i]);
                            showDesk(poker[i]);
                            poker.splice(i, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                            break;
                        }
                    }
                }
                $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                showImg();
                /* gameData.desktop.type = 4;
                               gameData.desktop.max = map1.get(arrPoker3[arrPoker3.length - 1].point);
                               gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                               pokerPlay(0); */

                gameData.desktop.type = 4;
                gameData.desktop.max = map1.get(arrPoker3[arrPoker3.length - 1].point);
                len0();
                /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                play = 0;
                pokerPlay(); */
            } else {
                if (poker[0].point == 'joker2' && poker[1].point == 'joker1') {
                    arrPoker3.push(poker[0]);
                }

                if (arrPoker3.length == 1 && arrPoker3[0].point == 'joker2') {
                    console.log('王炸');
                    for (let i = 0; i < 2; i++) {
                        console.log(poker[0]);
                        showDesk(poker[0]);
                        poker.splice(0, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(0).remove();
                    }
                    $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                    $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                    showImg();
                    /* gameData.desktop.type = 888;
                                       gameData.desktop.max = map1.get(arrPoker3[0].point);
                                       gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                       pokerPlay(0); */

                    gameData.desktop.type = 7;
                    gameData.desktop.max = map1.get(arrPoker3[0].point);
                    len0();
                     /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    play = 0;
                    pokerPlay();*/
                } else {
                    console.log("要不起");
                    np();
                }
            }

        }
    }
}
// 连对
function eight(poker) {
    let oldPoker = [];
    let arrPoker = [];
    if (gameData.desktop.type == 8) {
        for (let i = 0; i < poker.length - 1; i++) {
            if (poker[i].point == poker[i + 1].point) {
                arrPoker.push(poker[i]);
            }
        }

        for (let i = 0; i < gameData.desktop.poker.length - 1; i++) {
            if (gameData.desktop.poker[i].point == gameData.desktop.poker[i + 1].point) {
                oldPoker.push(gameData.desktop.poker[i]);
            }
        }


        // let pointsMap = map(poker)
        // console.log(pointsMap);

        let play = map(poker)


        let cases = []

        cases.push({
            'doubles': []
        })




        let pointsTypes = getPointsType(2, map(poker))

        let length = oldPoker.length
        let min = oldPoker[length - 1].point




        for (let i = 0; i < pointsTypes.length - length + 1; i++) {
            // console.log(pointsTypes[i]);
            // console.log(map1.get(pointsTypes[i]) + "-" + map1.get(pointsTypes[min]));

            if (map1.get(pointsTypes[i]) > map1.get(min)) {

                console.log(pointsTypes[i]);


                if (map1.get(pointsTypes[i + length - 1]) - map1.get(pointsTypes[i]) === length - 1) {

                    let temp = []
                    for (let k = i; k < i + length; k++) {
                        temp.push(pointsTypes[k])
                    }
                    cases[0]['doubles'].push(temp)
                }
            }
        }



        if (play['4']) {
            cases.push({
                'boom': play['4']
            })
        }

        if (play['1']) {
            if (play['1'].indexOf('joker1') != -1 && play['1'].indexOf('joker2') != -1) {
                cases.push({
                    'boomMAX': 'joker'
                })
            }
        }

        //连对所有情况
        console.log(cases)
        if (cases[0]['doubles'].length > 0) {
            console.log(cases[0]['doubles'][0].length);
            for (let k = 0; k < 2; k++) {
                for (let i = 0; i < cases[0]['doubles'][0].length; i++) {
                    for (let j = 0; j < poker.length; j++) {
                        if (cases[0]['doubles'][0][i] == poker[j].point) {
                            console.log('AAAAAAAAAAAAAAAAAAAAAA');
                            showDesk(poker[j]);
                            poker.splice(j, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(j).remove();
                            break;
                        }
                    }
                }
            }
            Sound('liandui');
            /* gameData.desktop.type = 8;
            gameData.desktop.max = map1.get(cases[0]['doubles'][0][0]);
            gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            pokerPlay(0); */

            gameData.desktop.type = 8;
            gameData.desktop.max = map1.get(cases[0]['doubles'][0][0]);
            len0();
            /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            play = 0;
            pokerPlay(); */
        } else {
            if (cases[1] && cases[1]['boom'] && cases[1]['boom'].length > 0) {
                let boom = cases[1]['boom'].length;
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < poker.length; j++) {
                        if (cases[1]['boom'][boom - 1] == poker[j].point) {
                            console.log('AAAAAAAAAAAAAAAAAAAAAA');
                            showDesk(poker[j]);
                            poker.splice(j, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(j).remove();
                            break;
                        }
                    }
                }
                $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                showImg();
                /* gameData.desktop.type = 4;
                               
                               gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                               pokerPlay(0); */

                gameData.desktop.type = 4;
                gameData.desktop.max = map1.get(cases[1]['boom'][boom - 1]);
                len0();
                gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                play = 0;
                pokerPlay();
            } else{
                if (cases[1] && cases[1]['boomMAX'] && cases[1]['boomMAX'].length > 0) {
                    for (let j = 0; j < 2; j++) {
                        for (let i = 0; i < poker.length; i++) {
                            if (poker[i].point.indexOf('joker') != -1) {
                                showDesk(poker[i]);
                                poker.splice(i, 1);
                                $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                                break;
                            }
                        }
                    }
                    $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                    $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                    showImg();
                    /*  gameData.desktop.type = 888;
                                        gameData.desktop.max = map1.get(cases[1]['boomMAX'][0]);
                                        gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                        pokerPlay(0); */

                    gameData.desktop.type = 888;
                    gameData.desktop.max = map1.get(cases[1]['boomMAX'][0]);
                    len0();
                     /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    play = 0;
                    pokerPlay();*/
                } else {
                    console.log("要不起");
                    np();
                }
            }
        }
    }
}


//飞机
function nine(poker) {

    if (gameData.desktop.type === 777) {
        //当前出牌的所有情况
        let cases = []

        //上次出牌
        let last = gameData.desktop.poker //{point:x,color:x}
        last = map(last)

        let last_length = {} //上次手牌的长度
        for (let key in last) {
            last_length[key] = last[key].length
        }

        // console.log(last_length);

        // let length = last.length//上次手牌长度
        // let min = last[length - 1]  //上次手牌的最小值

        // console.log(last);



        //玩家当前手牌
        let plays = map(poker)
        let plays_three = getPointsType(3, plays)





        let length = last_length['3']

        let min = plays_three[0]
        let waittings_three = []
        for (let i = 0; i < plays_three.length - length + 1; i++) {
            if (map1.get(plays_three[i]) > map1.get(min)) {

                if (map1.get(plays_three[i + length - 1]) - map1.get(plays_three[i]) === length - 1) {
                    let temp = []
                    for (let k = i; k < i + length; k++) {
                        temp.push(plays_three[k])
                    }
                    waittings_three.push(temp)
                    // cases[0]['planes'].push(temp)
                }
            }
        }



        if (last['1']) {


            let waittings_one = []
            let plays_one = getPointsType(1, plays)

            // let length = waittings_three[0].length

            // console.log(waittings_three)

            waittings_three.map((itemT) => {
                let length = itemT.length
                plays_one.map((itemO) => {
                    if (planesIsContains(itemT, itemO) && waittings_one.length < length) {
                        waittings_one.push(itemO)
                    }
                })
            })

            // plays_one.map((item, index) => {
            //     if (index < length) {
            //           console.log(item)
            //          if (planesIsContains(waittings_three, item) && waittings_one.length < length) {
            //              waittings_one.push(item)
            //          }
            //     }    

            // })

            let waittings = []
            waittings_three.map((item) => {
                waittings.push({
                    '3': item,
                    '1': waittings_one
                })
            })

            cases.push({
                'planes': waittings
            })




        } else if (last['2']) {
            let waittings_two = []
            let plays_two = getPointsType(2, plays)







            waittings_three.map((itemT) => {
                let length = itemT.length
                plays_two.map((itemW) => {


                    if (planesIsContains(waittings_three, itemW) && waittings_two.length < length) {
                        waittings_two.push(itemW)
                    }


                })
            })



            let waittings = []
            waittings_three.map((item) => {
                waittings.push({
                    '3': item,
                    '2': waittings_two
                })
            })

            cases.push({
                'planes': waittings
            })

        } else {
            cases.push({
                'planes': waittings_three
            })
        }

        //其它情况：炸弹
        getBooms(plays, cases)



        console.log(cases);
        if (cases[0]['planes'].length > 0) {
            console.log(cases[0]['planes'][0].length);
            for (let i = 0; i < cases[0]['planes'][0].length; i++) {
                for (let j = 0; j < poker.length; j++) {
                    if (cases[0]['planes'][0][i] == poker[j].point) {
                        console.log('AAAAAAAAAAAAAAAAAAAAAA');
                        showDesk(poker[j]);
                        poker.splice(j, 1);
                        $('.container ul:eq(' + gameData.play + ') li').eq(j).remove();
                        break;
                    }
                }
            }
            Sound('feiji');
            /*  gameData.desktop.type = 777;
             gameData.desktop.max = map1.get(cases[0]['planes'][0][0]);
             gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
             pokerPlay(0); */

            gameData.desktop.type = 777;
            gameData.desktop.max = map1.get(cases[0]['planes'][0][0]);
            len0();
            /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
            play = 0;
            pokerPlay(); */
        } else {
            if (cases[1] && cases[1]['boom'] && cases[1]['boom'].length > 0) {
                let boom = cases[1]['boom'].length;
                for (let i = 0; i < 4; i++) {
                    for (let j = 0; j < poker.length; j++) {
                        if (cases[1]['boom'][boom - 1] == poker[j].point) {
                            console.log('AAAAAAAAAAAAAAAAAAAAAA');
                            showDesk(poker[j]);
                            poker.splice(j, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(j).remove();
                            break;
                        }
                    }
                }
                $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                showImg();
                /* gameData.desktop.type = 4;
                               gameData.desktop.max = map1.get(cases[1]['boom'][boom - 1]);
                               gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                               pokerPlay(0); */

                gameData.desktop.type = 4;
                gameData.desktop.max = map1.get(cases[1]['boom'][boom - 1]);
                len0();
                gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                play = 0;
                pokerPlay();
            } else  {
                if (cases[1] && cases[1]['boomMAX'] && cases[1]['boomMAX'].length > 0) {
                    for (let j = 0; j < 2; j++) {
                        for (let i = 0; i < poker.length; i++) {
                            if (poker[i].point.indexOf('joker') != -1) {
                                showDesk(poker[i]);

                                poker.splice(i, 1);
                                $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                                break;
                            }
                        }
                    }
                    $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                    $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                    showImg();
                    /*  gameData.desktop.type = 888;
                                        gameData.desktop.max = map1.get(cases[1]['boomMAX'][0]);
                                        gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                                        pokerPlay(0); */

                    gameData.desktop.type = 888;
                    gameData.desktop.max = map1.get(cases[1]['boomMAX'][0]);
                    len0();
                     /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    play = 0;
                    pokerPlay();*/
                } else {
                    console.log("要不起");
                    np();
                }
            }
        }
    }
}

//顺子
function straight(poker) {
    if (gameData.desktop.type == 6) { //当前出牌的所有情况
        let cases = []
        cases.push({
            'straights': []
        })

        //上次出牌
        let last = gameData.desktop.poker //{point:x,color:x}
        if (last.length == 0) {
            console.log('请选牌');
        } else {
            last = map(last)
            console.log(last);
            let length = last['1'].length;

            let min = last['1'][0]

            //玩家当前手牌
            let plays = map(poker)
            let plays_one = getPointsType(1, plays)

            console.log(length);

            for (let i = 0; i < plays_one.length - length + 1; i++) {
                if (map1.get(plays_one[i]) > map1.get(min)) {

                    if (map1.get(plays_one[i + length - 1]) - map1.get(plays_one[i]) === length - 1 && plays_one[i + length - 1].indexOf('joker') == -1) {
                        let temp = []
                        for (let k = i; k < i + length; k++) {

                            temp.push(plays_one[k])
                        }

                        cases[0]['straights'].push(temp)
                    }
                }
            }

            //其它情况：炸弹
            getBooms(plays, cases)


            console.log(cases[0]['straights'].length);
            console.log(cases);
            if (cases[0]['straights'].length > 0) {
                console.log(cases[0]['straights'][0].length);
                for (let i = 0; i < cases[0]['straights'][0].length; i++) {
                    for (let j = 0; j < poker.length; j++) {
                        if (cases[0]['straights'][0][i] == poker[j].point) {
                            console.log('AAAAAAAAAAAAAAAAAAAAAA');
                            showDesk(poker[j]);

                            poker.splice(j, 1);
                            $('.container ul:eq(' + gameData.play + ') li').eq(j).remove();
                            break;
                        }
                    }
                }
                Sound('shunzi');
                /*  gameData.desktop.type = 6;
                 gameData.desktop.max = map1.get(cases[0]['straights'][0][0]);
                 gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                 pokerPlay(0); */

                gameData.desktop.type = 6;
                gameData.desktop.max = map1.get(cases[0]['straights'][0][0]);
                len0();
                /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                play = 0;
                pokerPlay(); */
            } else {
                if (cases[1] && cases[1]['boom'] && cases[1]['boom'].length > 0) {
                    let boom = cases[1]['boom'].length;
                    for (let i = 0; i < 4; i++) {
                        for (let j = 0; j < poker.length; j++) {
                            if (cases[1]['boom'][boom - 1] == poker[j].point) {
                                console.log('AAAAAAAAAAAAAAAAAAAAAA');
                                showDesk(poker[j]);

                                poker.splice(j, 1);
                                $('.container ul:eq(' + gameData.play + ') li').eq(j).remove();
                                break;
                            }
                        }
                    }
                    $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                    $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                    showImg();
                    /* gameData.desktop.type = 4;
                    gameData.desktop.max = map1.get(cases[1]['boom'][boom - 1]);
                    gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    pokerPlay(0); */

                    gameData.desktop.type = 4;
                    gameData.desktop.max = map1.get(cases[1]['boom'][boom - 1]);
                    len0();
                     /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                    play = 0;
                    pokerPlay();*/
                } else{
                    if (cases[1] && cases[1]['boomMAX'] && cases[1]['boomMAX'].length > 0) {
                        for (let j = 0; j < 2; j++) {
                            for (let i = 0; i < poker.length; i++) {
                                if (poker[i].point.indexOf('joker') != -1) {
                                    showDesk(poker[i]);

                                    poker.splice(i, 1);
                                    $('.container ul:eq(' + gameData.play + ') li').eq(i).remove();
                                    break;
                                }
                            }
                        }
                        $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                        $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                        showImg();
                        /*  gameData.desktop.type = 888;
                         gameData.desktop.max = map1.get(cases[1]['boomMAX'][0]);
                         gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                         pokerPlay(0); */

                        gameData.desktop.type = 4;
                        gameData.desktop.max = map1.get(cases[1]['boomMAX'][0]);
                        len0();
                        /* gameData.play = ++gameData.play > 2 ? 0 : gameData.play;
                        play = 0;
                        pokerPlay(); */
                    } else {
                        console.log("要不起");
                        np();
                    }
                }
            }
        }
    }

}

function jokerBoom() {

    if (gameData.desktop.type == 888) {
        console.log("要不起");
        np();

    }
}


//判断飞机是否包含
function planesIsContains(points, point) {
    for (let i = 0; i < points.length; i++) {
        if (points[i].indexOf(point) != -1) {
            return false
        }
    }
    return true;
}


function map(poker) {
    let keys = {}
    poker.map((item) => {
        if (keys[item.point] == null) {
            keys[item.point] = 1
        } else {
            keys[item.point] += 1
        }
    })
    let newKeys = {};
    for (let key in keys) {

        let value = keys[key]
        if (newKeys[value] == null) {
            newKeys[value] = []
            newKeys[value].push(key)
        } else {
            newKeys[value].push(key)
        }
    }
    return newKeys;
}

//获得炸弹
function getBooms(plays, cases) {
    //普通炸弹
    if (plays['4']) {
        cases.push({
            'boom': plays['4']
        })
    }

    //王炸
    if (plays['1']) {
        if (plays['1'].indexOf('joker1') != -1 && plays['1'].indexOf('joker2') != -1) {
            cases.push({
                'boomMAX': 'joker'
            })
        }
    }

}


function getPointsTypeOnly(index, pointsType) {
    let types = []
    for (let key in pointsType) {
        if (key == index) {
            types = [...types, ...pointsType[key]]
        }
    }
    types.sort((a, b) => {
        return map1.get(a) - map1.get(b)
    })
    return types
}

function getPointsType(index, pointsType) {
    let types = []
    for (let key in pointsType) {
        if (key >= index) {
            types = [...types, ...pointsType[key]]
        }
    }
    types.sort((a, b) => {
        return map1.get(a) - map1.get(b)
    })
    return types
}

function isShunzi(arr) {
    for (let i = 0; i < arr.length - 2; i++) {
        if (map1.get(arr[i + 1]) - map.get(arr[i]) != 1 && arr[i + 1] == '2') {
            return false
        }
    }
    return true
}


function showDesk(poker) {
    let li = document.createElement('li');
    li.innerHTML = '<img src="../images/' + poker.point + poker.color + '.png">';
    $('.container .desk').eq(gameData.play).show().find('ul').append(li);
}


function showImg() {
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