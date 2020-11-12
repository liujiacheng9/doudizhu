const BASE_URL = "http://116.62.112.239:8080/landloard-0.0.1-SNAPSHOT"
$(() => {
    let arrs,show,length=7,index=0,pages
    let user = JSON.parse(sessionStorage['user'])
   
    if (user) {
        console.log(user);
        $('#name').html(user.name)
        let account = user.account
        $.ajax({
            method: 'get',
            url: `${BASE_URL}/user/history?account=${account}`,
            success: (data) => {
               
                arrs=data
                show=arrs.slice(index*length,(index+1)*length)
                pages=arrs.length/length+1

                updateTbody(show)
               
            }
        })
    }

   
    $("#last").click(()=>{
        
        if(arrs && index>=1){
            index--
            updateTbody(arrs.slice(index*length,(index+1)*length))
        }
    })

    $("#next").click(()=>{
       
        if(arrs && index<pages-2){
            index++
            updateTbody(arrs.slice(index*length,(index+1)*length))
        }
    })

    $("#first").click(()=>{
        index=0
        if(arrs){
            updateTbody(arrs.slice(index*length,(index+1)*length))
        }
    })


})

function updateTbody(arr){
    let $tbody = $("#tbody")
     $tbody.empty()
     arr.map((item) => {
        $tbody.append(
            `<tr>
             <td>
                ${item.players}
             </td>
             <td>
             ${item.score}
          </td>
          <td>
          ${item.multiple}
       </td>
           <td>
       ${item.identity}
          </td>
            <td>
            ${item.profit>0?"+"+item.profit:item.profit}金币
            </td>
            <td>
            ${timestampToTime(item.date)}
            </td>
        </tr>`
        )
       
    })
}


function timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

    strDate = Y + M + D + h + m + s;
    return strDate;

}