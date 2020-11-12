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

function pokerType(data) {
    let len = data.poker.length;
    switch (len) {
        case 1:
            data.type = 1;
            if (data.poker[0].point == 'joker1') {
                console.log('小王');
                data.max = map1.get(data.poker[0].point);
                $('.bgsound').attr('src', '../Sound/Man/Man_joker1.ogg');

            } else if (data.poker[0].point == 'joker2') {
                console.log('大王');
                data.max = map1.get(data.poker[0].point);
                $('.bgsound').attr('src', '../Sound/Man/Man_joker2.ogg');

            } else {
                console.log(data.poker[0].point);
                data.max = map1.get(data.poker[0].point);
                $('.bgsound').attr('src', '../Sound/Man/Man_' + data.poker[0].point + '.ogg ');

            }

            return true;
            break;

        case 2:
            if (data.poker[0].point != data.poker[1].point) {
                if (data.poker[0].point == 'joker2' && data.poker[1].point == 'joker1') {
                    data.type = 888;
                    data.max = map1.get(data.poker[0].point);
                    console.log('王炸' + data.max);
                    gameData.multiple = gameData.multiple * 2;
                    $('.bei>span').html(gameData.multiple);
                    $('.bgsound').attr('src', '../Sound/Man/Man_wangzha.ogg ');
                    $('.xiaoguo img').attr('src', '../images/wangzha.gif');
                    
                    return true;
                } else {
                    return false;
                }
            } else {
                data.type = 2;
                data.max = map1.get(data.poker[0].point);
                console.log('一对' + data.poker[0].point);
                console.log(data.max);
                $('.bgsound').attr('src', '../Sound/Man/Man_dui' + data.poker[0].point + '.ogg ');
                return true;
            }
            break;

        case 3:
            if (data.poker[0].point == data.poker[2].point) {
                data.type = 3;
                data.max = map1.get(data.poker[0].point);
                console.log('三个' + data.poker[0].point);
                $('.bgsound').attr('src', '../Sound/Man/Man_tuple' + data.poker[0].point + '.ogg ');
                return true;
            }
            return false;
            break;

        case 4:
            if (data.poker[0].point == data.poker[3].point) {
                data.type = 4;
                data.max = map1.get(data.poker[0].point);
                console.log('四个' + data.poker[0].point);
                gameData.multiple = gameData.multiple * 2;
                $('.bei>span').html(gameData.multiple);
                $('.bgsound').attr('src', '../Sound/Man/Man_zhadan.ogg ');
                $('.xiaoguo img').attr('src', '../images/zhadan.gif');
                return true;
            } else if (data.poker[0].point == data.poker[2].point || data.poker[1].point == data.poker[3].point) {
                data.type = 5;
                data.max = map1.get(data.poker[1].point);
                console.log('三带一');
                Sound('sandaiyi');
                return true;
            }
            return false;
            break;

        case 5:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子');
                Sound('shunzi');
                return true;
            }

            if (data.poker[0].point == data.poker[2].point && data.poker[3].point == data.poker[4].point ||
                data.poker[2].point == data.poker[4].point && data.poker[0].point == data.poker[1].point
            ) {
                data.type = 7;
                data.max = map1.get(data.poker[2].point);
                console.log('三带二');
                Sound('sandaiyidui');
                return true;
            }
            return false;
            break;

        case 6:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子' + data.max);
                Sound('shunzi');
                return true;
            }
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            if (data.poker[0].point == data.poker[3].point ||
                data.poker[1].point == data.poker[4].point ||
                data.poker[2].point == data.poker[5].point
            ) {
                data.type = 9;
                data.max = map1.get(data.poker[2].point);
                console.log('四带二' + data.max);
                Sound('sidaier');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            return false;
            break;

        case 7:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子' + data.max);
                Sound('shunzi');
                return true;
            }
            return false;
            break;

        case 8:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子' + data.max);
                Sound('shunzi');
                return true;
            }
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) ||

                data.poker[1].point == data.poker[3].point &&
                data.poker[4].point == data.poker[6].point &&
                map1.get(data.poker[1].point) - 1 == map1.get(data.poker[4].point) ||

                data.poker[2].point == data.poker[4].point &&
                data.poker[5].point == data.poker[7].point &&
                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[2].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[0].point == data.poker[3].point &&
                data.poker[4].point == data.poker[5].point &&
                data.poker[6].point == data.poker[7].point
            ) {
                data.type = 10;
                data.max = map1.get(data.poker[0].point);
                console.log('四带两对' + data.max);
                Sound('sidailiangdui');
                return true;
            }
            if (data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[5].point &&
                data.poker[6].point == data.poker[7].point
            ) {
                data.type = 10;
                data.max = map1.get(data.poker[2].point);
                console.log('四带两对' + data.max);
                Sound('sidailiangdui');
                return true;
            }
            if (data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[3].point &&
                data.poker[4].point == data.poker[7].point
            ) {
                data.type = 10;
                data.max = map1.get(data.poker[4].point);
                console.log('四带两对' + data.max);
                Sound('sidailiangdui');
                return true;
            }
            return false;
            break;

        case 9:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子' + data.max);
                Sound('shunzi');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point)

            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            return false;
            break;

        case 10:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子' + data.max);
                Sound('shunzi');
                return true;
            }
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                data.poker[6].point == data.poker[7].point &&
                data.poker[8].point == data.poker[9].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[2].point == data.poker[4].point &&
                data.poker[5].point == data.poker[7].point &&
                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point) &&
                data.poker[0].point == data.poker[1].point &&
                data.poker[8].point == data.poker[9].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point) &&
                data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[3].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            return false;
            break;

        case 11:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子' + data.max);
                Sound('shunzi');
                return true;
            }
            return false;
            break;

        case 12:
            if (checkStraight(data.poker)) {
                data.type = 6;
                data.max = map1.get(data.poker[0].point);
                console.log('顺子' + data.max);
                Sound('shunzi');
                return true;
            }
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[1].point == data.poker[3].point &&
                data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                map1.get(data.poker[1].point) - 1 == map1.get(data.poker[4].point) &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[1].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[2].point == data.poker[4].point &&
                data.poker[5].point == data.poker[7].point &&
                data.poker[8].point == data.poker[10].point &&
                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point) &&
                map1.get(data.poker[5].point) - 1 == map1.get(data.poker[8].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[2].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[3].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[0].point == data.poker[3].point &&
                data.poker[4].point == data.poker[7].point &&
                data.poker[8].point == data.poker[11].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[4].point) &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[8].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[0].point == data.poker[3].point &&
                data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[4].point) &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[0].point == data.poker[3].point &&
                data.poker[4].point == data.poker[7].point &&
                data.poker[8].point == data.poker[10].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[4].point) &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[8].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[0].point == data.poker[3].point &&
                data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[10].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[4].point) &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[8].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            return false;
            break;

        case 13:
            return false;
            break;

        case 14:
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            return false;
            break;
        case 15:
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                data.poker[12].point == data.poker[14].point &&

                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                data.poker[9].point == data.poker[10].point &&
                data.poker[11].point == data.poker[12].point &&
                data.poker[13].point == data.poker[14].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[2].point == data.poker[4].point &&
                data.poker[5].point == data.poker[7].point &&
                data.poker[8].point == data.poker[10].point &&
                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point) &&
                map1.get(data.poker[5].point) - 1 == map1.get(data.poker[8].point) &&
                data.poker[0].point == data.poker[1].point &&
                data.poker[11].point == data.poker[12].point &&
                data.poker[13].point == data.poker[14].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[2].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                data.poker[10].point == data.poker[12].point &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point) &&
                map1.get(data.poker[7].point) - 1 == map1.get(data.poker[10].point) &&
                data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[3].point &&
                data.poker[13].point == data.poker[14].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[4].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                data.poker[12].point == data.poker[14].point &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point) &&
                data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[3].point &&
                data.poker[4].point == data.poker[5].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[6].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            return false;
            break;

        case 16:
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&

                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[1].point == data.poker[3].point &&
                data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                data.poker[10].point == data.poker[12].point &&

                map1.get(data.poker[1].point) - 1 == map1.get(data.poker[4].point) &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point) &&
                map1.get(data.poker[7].point) - 1 == map1.get(data.poker[10].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[1].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[2].point == data.poker[4].point &&
                data.poker[5].point == data.poker[7].point &&
                data.poker[8].point == data.poker[10].point &&
                data.poker[11].point == data.poker[13].point &&
                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point) &&
                map1.get(data.poker[5].point) - 1 == map1.get(data.poker[8].point) &&
                map1.get(data.poker[8].point) - 1 == map1.get(data.poker[11].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[2].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                data.poker[12].point == data.poker[14].point &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[3].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                data.poker[10].point == data.poker[12].point &&
                data.poker[13].point == data.poker[15].point &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point) &&
                map1.get(data.poker[7].point) - 1 == map1.get(data.poker[10].point) &&
                map1.get(data.poker[10].point) - 1 == map1.get(data.poker[15].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[4].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            return false;
            break;
        case 17:
            return false;
            break;
        case 18:
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                data.poker[12].point == data.poker[14].point &&
                data.poker[15].point == data.poker[17].point &&

                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point) &&
                map1.get(data.poker[12].point) - 1 == map1.get(data.poker[15].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            return false;
            break;
        case 19:
            return false;
            break;

        case 20:
            if (checkDouble(data.poker)) {
                data.type = 8;
                data.max = map1.get(data.poker[0].point);
                console.log('连对' + data.max);
                Sound('liandui');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                data.poker[12].point == data.poker[14].point &&

                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point)

            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[1].point == data.poker[3].point &&
                data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                data.poker[10].point == data.poker[12].point &&
                data.poker[13].point == data.poker[15].point &&

                map1.get(data.poker[1].point) - 1 == map1.get(data.poker[4].point) &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point) &&
                map1.get(data.poker[7].point) - 1 == map1.get(data.poker[10].point) &&
                map1.get(data.poker[10].point) - 1 == map1.get(data.poker[13].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[1].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[2].point == data.poker[4].point &&
                data.poker[5].point == data.poker[7].point &&
                data.poker[8].point == data.poker[10].point &&
                data.poker[11].point == data.poker[13].point &&
                data.poker[14].point == data.poker[16].point &&

                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point) &&
                map1.get(data.poker[5].point) - 1 == map1.get(data.poker[8].point) &&
                map1.get(data.poker[8].point) - 1 == map1.get(data.poker[11].point) &&
                map1.get(data.poker[11].point) - 1 == map1.get(data.poker[14].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[2].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                data.poker[12].point == data.poker[14].point &&
                data.poker[15].point == data.poker[17].point &&

                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point) &&
                map1.get(data.poker[13].point) - 1 == map1.get(data.poker[15].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[3].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                data.poker[10].point == data.poker[12].point &&
                data.poker[13].point == data.poker[15].point &&
                data.poker[16].point == data.poker[18].point &&
                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point) &&
                map1.get(data.poker[7].point) - 1 == map1.get(data.poker[10].point) &&
                map1.get(data.poker[10].point) - 1 == map1.get(data.poker[15].point) &&
                map1.get(data.poker[13].point) - 1 == map1.get(data.poker[16].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[4].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[5].point == data.poker[7].point &&
                data.poker[8].point == data.poker[10].point &&
                data.poker[11].point == data.poker[13].point &&
                data.poker[14].point == data.poker[16].point &&
                data.poker[17].point == data.poker[19].point &&
                map1.get(data.poker[5].point) - 1 == map1.get(data.poker[8].point) &&
                map1.get(data.poker[8].point) - 1 == map1.get(data.poker[11].point) &&
                map1.get(data.poker[11].point) - 1 == map1.get(data.poker[14].point) &&
                map1.get(data.poker[14].point) - 1 == map1.get(data.poker[17].point)
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[5].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[0].point == data.poker[2].point &&
                data.poker[3].point == data.poker[5].point &&
                data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&

                map1.get(data.poker[0].point) - 1 == map1.get(data.poker[3].point) &&
                map1.get(data.poker[3].point) - 1 == map1.get(data.poker[6].point) &&
                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&


                data.poker[12].point == data.poker[13].point &&
                data.poker[14].point == data.poker[15].point &&
                data.poker[16].point == data.poker[17].point &&
                data.poker[18].point == data.poker[19].point

            ) {
                data.type = 777;
                data.max = map1.get(data.poker[0].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[2].point == data.poker[4].point &&
                data.poker[5].point == data.poker[7].point &&
                data.poker[8].point == data.poker[10].point &&
                data.poker[11].point == data.poker[13].point &&

                map1.get(data.poker[2].point) - 1 == map1.get(data.poker[5].point) &&
                map1.get(data.poker[5].point) - 1 == map1.get(data.poker[8].point) &&
                map1.get(data.poker[8].point) - 1 == map1.get(data.poker[11].point) &&

                data.poker[0].point == data.poker[1].point &&
                data.poker[14].point == data.poker[15].point &&
                data.poker[16].point == data.poker[17].point &&
                data.poker[18].point == data.poker[19].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[2].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[4].point == data.poker[6].point &&
                data.poker[7].point == data.poker[9].point &&
                data.poker[10].point == data.poker[12].point &&
                data.poker[13].point == data.poker[15].point &&

                map1.get(data.poker[4].point) - 1 == map1.get(data.poker[7].point) &&
                map1.get(data.poker[7].point) - 1 == map1.get(data.poker[10].point) &&
                map1.get(data.poker[10].point) - 1 == map1.get(data.poker[13].point) &&
                data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[3].point &&
                data.poker[16].point == data.poker[17].point &&
                data.poker[18].point == data.poker[19].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[4].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            if (data.poker[6].point == data.poker[8].point &&
                data.poker[9].point == data.poker[11].point &&
                data.poker[12].point == data.poker[14].point &&
                data.poker[15].point == data.poker[17].point &&

                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point) &&
                map1.get(data.poker[12].point) - 1 == map1.get(data.poker[15].point) &&

                data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[3].point &&
                data.poker[4].point == data.poker[5].point &&
                data.poker[18].point == data.poker[19].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[6].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }
            if (data.poker[8].point == data.poker[10].point &&
                data.poker[11].point == data.poker[13].point &&
                data.poker[14].point == data.poker[16].point &&
                data.poker[17].point == data.poker[19].point &&

                map1.get(data.poker[6].point) - 1 == map1.get(data.poker[9].point) &&
                map1.get(data.poker[9].point) - 1 == map1.get(data.poker[12].point) &&
                map1.get(data.poker[12].point) - 1 == map1.get(data.poker[15].point) &&

                data.poker[0].point == data.poker[1].point &&
                data.poker[2].point == data.poker[3].point &&
                data.poker[4].point == data.poker[5].point &&
                data.poker[6].point == data.poker[7].point
            ) {
                data.type = 777;
                data.max = map1.get(data.poker[6].point);
                console.log('飞机' + data.max);
                Sound('feiji');
                $('.xiaoguo img').attr('src', '../images/feiji.gif');
                return true;
            }

            return false;
            break;
        default:
            break;

    }
}

// 检查是否为是否为顺子
function checkStraight(poker) {
    for (let i = 0; i < poker.length - 1; i++) {
        if (poker[i].point == '2') {
            return false;
        }
        if (map1.get(poker[i].point) - 1 != map1.get(poker[i + 1].point)) {
            return false;
        }
    }
    return true;
}

function checkDouble(poker) {
    for (let i = 0; i < poker.length - 2; i += 2) {
        if (map1.get(poker[i].point) != map1.get(poker[i + 1].point) || map1.get(poker[i].point) - 1 != map1.get(poker[i + 2].point)) {
            return false;
        }
    }
    return true;
}

function playCheck() {
    // 如果桌面上没有牌的话可以直接打出
    if (gameData.desktop.type == 0) {

        return true;

    }

    // 如果出的牌是王炸的话可以直接打出
    if (gameData.select.type == 888) {
        return true;
    }

    // 出的是普通炸弹并且桌上的不是炸弹或者王炸就可以直接打出
    if (gameData.select.type == 4 &&
        (gameData.desktop.type != 4 && gameData.desktop.type != 888)) {
        
        return true;
    }

    // 如果桌面上的牌是王炸那无论是什么牌都不能打出
    if (gameData.desktop.type == 888) {
        return false;
    }

    // 一般组数据大小的判断
    if (gameData.select.type == gameData.desktop.type &&
        gameData.select.poker.length == gameData.desktop.poker.length &&
        gameData.select.max > gameData.desktop.max
    ) {
        return true;
    } else {
        return false;
    }
}


function Sound(type) {
    if (gameData.desktop.type == 0) {
        $('.bgsound').attr('src', '../Sound/Man/Man_' + type + '.ogg ');
    } else {
        let random = Math.ceil(Math.random() * 3);
        $('.bgsound').attr('src', '../Sound/Man/Man_dani' + random + '.ogg ');
    }
}