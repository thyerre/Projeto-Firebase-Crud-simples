function RetornarDespesa(){
    
    var lista = db.database().ref("minhasdespesas").on("value",function(res){
        var conteudoTabela = '';    
        var soma = 0;
        var i = 0;
        res.forEach(function(item){
           
            conteudoTabela +=`<tr>            
            <td class="tb">`+item.val().description+`</td>
            <td class="tb">`+item.val().amount+`</td>
            <td class="tb">`+item.val().dateAdd+`</td>
            <td class="tb action"><a href="confirm.html?id=`+item.key+`"><button type="submit"  class="btn btn-danger excluir" >Excluir<img src="https://png.icons8.com/color/25/000000/trash.png"></button></a>
            <a href="confirmedite.html?id=`+item.key+`"><button type="submit" id="editar" class="btn btn-warning">Editar<img src="https://png.icons8.com/color/25/000000/pencil.png"></button></a></td>
            </tr>`;
                    
            //Verifica se pode ser tranformando em float
            if(!isNaN(parseFloat(item.val().amount))){
                soma = soma + parseFloat(item.val().amount);
            }
        });
        conteudoTabela += " <td class='tbtotal' colspan='3'><img class='cal' src='https://png.icons8.com/color/30/000000/estimate.png' ><b>Valor Total</b></td><td class='tbtotal'><b>R$ "+ soma+"</b><img class='dinheiro' src='https://png.icons8.com/color/30/000000/cash-.png'></td>"; 
        
        //local que vai ser colocado o conteudo do tbody    
        
        $("tbody").append(conteudoTabela);
    }); 
}
function excluir(){
    var url = window.location.href;
    url = url.split("=");
    db.database().ref('minhasdespesas/'+url[1]).remove();
    window.location.href = "list.html";
}

 function itemExcluir(){
    var url = window.location.href;
    url = url.split("=");
    db.database().ref("minhasdespesas").on("value",function find(res){
        res.forEach(function find(item){
            if(url[1] == item.key){
                $('<p class="descri_excluido" ><b>Data: </b>'+item.val().dateAdd+'</p>').insertAfter("div#sucesso");
                $('<p class="descri_excluido" ><b>Valor: </b>R$ '+item.val().amount+' </p>').insertAfter("div#sucesso");
                $('<p class="descri_excluido" ><b>Descrição: </b>'+item.val().description+'</p>').insertAfter("div#sucesso");
                 return 0;
                
            }
        });
    });
}

// dados = [item.val().description,item.val().amount,item.val().dateAdd];
     

function editar(){
    var url = window.location.href;
    url = url.split("=");
    
    
    db.database().ref("minhasdespesas").on("value",function(res){
        res.forEach(function(item){
            if(url[1] == item.key){
                console.log(item.val());
                $('<input type="text" class="form-control" id="description" value="'+item.val().description+'" >').insertAfter("label#descri");
                $('<input type="number" class="form-control" id="amount" value="'+item.val().amount+'">').insertAfter("label#valor");
                $('<input type="date" class="form-control" id="dateAdd" value="'+item.val().dateAdd+'">').insertAfter("label#data");
            }
        });
    });
}
var dados;
function find(id){
    db.database().ref("minhasdespesas").on("value",function find(res){
        res.forEach(function find(item){
            if(id == item.key){
                dados = [item.val().description,item.val().amount,item.val().dateAdd];
                console.log(dados);
                return dados;
                
            }
        });
    });
}
        
function SalvarEdicao(){
    var url = window.location.href;
    url = url.split("=");
            
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var dateAdd = document.getElementById("dateAdd").value;
    var updates = {amount:amount,description:description,dateAdd:dateAdd};
    console.log(updates); 
    db.database().ref('minhasdespesas/'+url[1]).update(updates);
    $("input#dateAdd").remove();
    $("input#amount").remove();
    $("input#description").remove();
    
    window.location.href = "list.html";
}

