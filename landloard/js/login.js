const BASE_URL="http://116.62.112.239:8080/landloard-0.0.1-SNAPSHOT"

$(()=>{
      //输入框状态切换
      $("input").on('blur',function(e){
       if(e.target.value){    
           $(this).parent().find('.title-show').addClass("title_active")    
       }else{
           $(this).parent().find('.title-show').removeClass("title_active")
       } 
   })
     $("input").trigger('blur')
    
 

    $("#login").click(()=>{
        console.log($("#account"));
        
        let account=$("#account").val()
        let password=$("#password").val()

        let data={account:account,password:password}
        console.log(data);
        

        $.ajax({
            url : `${BASE_URL}/user/login`,
            data:data,
            type : "POST",
            success:(data)=>{
                if(data){
                    
                  
                    sessionStorage['user']=JSON.stringify(data)
               
                  
                 
                    alert('登录成功');
                    window.location.href="./game.html"
                   
                    
                }else{
                    alert('登录失败');
                }
              
            }
        })
     
    })
})