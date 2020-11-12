$(() => {
    setTimeout(() => {
        $("#bgs-ul li").eq(0).html(` <video src="../video/01.mp4" autoplay muted  style="width: 100%;height:100%;object-fit:fill" loop></video>`)
    })





    $(".bgs-select-item").on('click', function () {
        let index = $(this).index()
        $(".bgs-select-active").removeClass('bgs-select-active')
        $(this).addClass('bgs-select-active')

        $("#bgs-ul").css('transform', `translateY(-${index*20}%)`)

        // console.log($("#bgs-ul li").eq(index).find('video'))

        if (index === 0) {
            if ($("#bgs-ul li").eq(index).find('video').length == 0) {

                setTimeout(() => {
                    $("#bgs-ul li").eq(index).html(` <video src="../video/0${index+1}.mp4" autoplay muted  style="width: 100%;height:100%;object-fit:fill" loop></video>`)

                }, 1000)

            }
        }


        setTimeout(() => {
            audioBGM.src = `../Sound/bgm/game/0${index+1}.mp3`

        }, 2000)





        let $selected = $("#bgs-selected")
        $selected.attr('src', `../images/bgs/game/0${index+1}.png`)
        $selected.css('border', $(this).css('border'))


    })

    $(".bgs-selected").on('mouseenter', function () {
        $("#bgs-select-ul").css('transform', ' translateY(0%)')
        $(this).css('transform', 'translateY(-100%)')
    })


    $("#bgs-select-ul").on('mouseleave', function () {
        $(this).css('transform', ' translateY(-110%)')
        $(".bgs-selected").css('transform', 'translateY(0%)')
    })


    // 卡牌选择

    $(".cards-selected").on('mouseenter', function () {
        $("#cards-select-ul").css('transform', ' translateY(0%)')
        $(this).css('transform', 'translateY(-100%)')
    })

    $(".cards-select-item").on('click', function () {
        let index = $(this).index()
        $(".cards-select-active").removeClass('cards-select-active')
        $(this).addClass('cards-select-active')


        console.log($(".mid-cards li"))
        let border = $(this).css('border')
        $(".mid-cards li").css({
            'background': `url(../images/game/card/0${index+1}.png) 0% 0% / 100% 100%`,
            'border': border
        })

        let $selected = $("#cards-selected")
        $selected.attr('src', `../images/game/card/0${index+1}.png`)
        $selected.css('border', $(this).css('border'))
    })

    $("#cards-select-ul").on('mouseleave', function () {
        $(this).css('transform', ' translateY(-110%)')
        $(".cards-selected").css('transform', 'translateY(0%)')
    })



})