var BASE_URL = "http://116.62.112.239:8080/landloard-0.0.1-SNAPSHOT"
// const BASE_URL="http://localhost:8080"

$(() => {


    // 头像的更换
    $("#btn-head").click(() => {
        $("#head").trigger('click')
    })

    //输入框状态切换
    $("input").blur(function (e) {

        if (e.target.value) {
            $(this).parent().find('.title-show').addClass("title_active")
        } else {
            $(this).parent().find('.title-show').removeClass("title_active")
        }

    })

    //获取验证码
    $("#code").click(() => {
        let email = $("#email").val()
        console.log('12346')
        $.ajax({
            method: 'get',
            url: `${BASE_URL}/email/send?email=${email}`,
            success: (data) => {
                if (data.status == 500) {
                    $("#code-message").text(`(${data.message})`)
                } else {
                    $("#sessionID").val(data.sessionID)
                    $("#code-message").text('(已发送)')

                }

            }
        })
    })

    $("#register").click(() => {
        var option = {
            url: `${BASE_URL}/user/register02`,
            method: "post",
            success: function (data) {
                if (data.status == 200) {
                    alert(data.message)
                    window.location.href="./login.html"
                } else {
                    alert(data.message)
                }

            },
        };
        $("#register-form").ajaxSubmit(option);
        return false
    })

    //音频播放
    // console.log(document.getElementById("audio"));

    // document.getElementById("audio").muted=false


    // audioPlay('./audio/01.mp3')
})


function changeCover(e) {
    let _this = this;
    let event = e || window.event
    let file = null
    let reader = new FileReader()

    try {
        file = event.target.files[0];

    } catch (e) {
        window.console.log("");
    }

    if (file != null) {
        reader.readAsDataURL(file);
    }

    reader.onload = function (e) {
        $("#cover").attr("src", e.target.result)
    }

}

