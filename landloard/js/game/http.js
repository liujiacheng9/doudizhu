const url = 'http://116.62.112.239:8080/landloard-0.0.1-SNAPSHOT'
var user
$(() => {
    if (sessionStorage['user']) {
        user = JSON.parse(sessionStorage['user'])

        $('#p1_name').text(user.name)
        $('#p1_balance').text(`${user.balance}金币`)
        $("#p1_head").attr('src', `${url}/img/cover/${user.cover}`)

        player[1].name = user.name
        player[1].gold = user.balance

    }




})