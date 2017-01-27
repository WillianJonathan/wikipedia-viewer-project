$(document).ready(function(){

  $("#search-box").on("keyup", function(){
        var value = "";
        value = $("#search-box").val();

        if(value == ""){
                $("#links").remove();
                $("#search-options").empty();
                $("#father").addClass('position-before-links');
        }else {      
            if(data !== null){ 
                if(isSearchValueDifferentFromMyCurrentData(data, value)){
                        getLinks(value);
                }else {
                 var newData = [];
                 newData = toSearchFromLocalData(data,value);
                 toPopulateDataList(newData);  
                 toPopulateLinks(newData);    
                }
            }else {
                    getLinks(value);
            }           
        }

        });  
  });  

  $("#search-box").on("keydown", function(event){
    
});


var data = null;

function getLinks(search_term){
 
 var endpoint = "https://en.wikipedia.org/w/api.php";

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
         
          
             if(!response.hasOwnProperty('error') && response[3][0] !== null){
                 toPopulateDataList(response);  
                 toPopulateLinks(response);    
                 data = response;
                  console.log(response);    
             }else{
                 console.log(response);
             }
        }        
  });
}

function toPopulateDataList(data){

    $("#search-options").empty();

    data[1].forEach(function(option){
        $("#search-options").append('<option value="'+option+'"></option>');
    });

}

function toPopulateLinks(data){

    $("#links").remove();
  //  $("#father").removeClass('position-before-links');
    $("#father").append('<div id="links" class="row">  </div>');

    var cont = data[1].length;

    for(i=0; i < cont; i++){
        $("#links").append('<a class="col-md-8 col-md-offset-2  col-xs-12" href="'+ data[3][i] +'" target="_blank"><div class="fadeInUp animated"><h3>' + data[1][i] + '</h3><p>' + data[2][i] + '</p></div></a>');
    }
  
}

function isSearchValueDifferentFromMyCurrentData(data, search_term){
 var isDifferent = true;
  isDifferent = data[1].every(function(item){
                    if(!item.toLowerCase().startsWith(search_term.toLowerCase())){
                    return true;
                    }
                });
 return isDifferent;

}

function toSearchFromLocalData(data, search_term){
    var newData = ["",[],[],[]];

    data[1].map(function(item,index){
        if(item.toLowerCase().startsWith(search_term.toLowerCase())){
            newData[1].push(data[1][index]);
            newData[2].push(data[2][index]);
            newData[3].push(data[3][index]);
        }
    });

    return newData;
}