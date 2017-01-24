var endpoint = "https://en.wikipedia.org/w/api.php";

var data = {}

function getLinks(search_term){
  //  queryValue = queryValue.replace(' ','+');
    $.ajax({url: endpoint,
        dataType: 'jsonp',
        jsonp: 'callback',
        data: {action: 'opensearch',
               format: 'json',
               search: search_term,
               namespace: 0,
               limit: 10,
               suggest : 1,
               formatversion: 2,
               utf8: 1
               },
        success: function(response) {
           data = response;
          
             if(!response.hasOwnProperty('error')){
                 ToPopulateDataList(data);  
                 ToPopulateLinks(data);    
                  console.log(response);    
             }else{
                 console.log(response);
             }

         

        }
        
  });
}

$(document).ready(function(){
  $("#search-box").on("keypress", function(){
      getLinks( $("#search-box").val());
  });  
  $("#search-box").on("keydown", function(event){
    if(event.which==13){
      getLinks( $("#search-box").val());
    }
  });  
});

function ToPopulateDataList(data){
    $("#search-options").empty();
 data[1].forEach(function(option){
      $("#search-options").append('<option value="'+option+'"></option>');
 });

}

function ToPopulateLinks(data){
    $("#links").empty();
    var cont = data[1].length;
    for(i=0; i < cont; i++){
        $("#links").append('<a href="'+ data[3][i] +'" target="_blank"><div><h3>' + data[1][i] + '</h3><p>' + data[2][i] + '</p></div></a>');
    }
  
}