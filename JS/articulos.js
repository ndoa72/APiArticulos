var UrlGetArticulos = 'http://localhost:80/G6_20/controller/articulos.php?opciones=GetArticulos';
var UrlPostArticulos = 'http://localhost:80/G6_20/controller/Articulos.php?opciones=InsertArticulos';
var UrlPostUno = 'http://localhost:80/G6_20/controller/Articulos.php?opciones=GetUno';
var UrlPutArticulos = 'http://localhost:80/G6_20/controller/Articulos.php?opciones=UpdateArticulos';
var UrlDeleteArticulos= 'http://localhost:80/G6_20/controller/Articulos.php?opciones=DeleteArticulos';

$(document).ready(function(){
    $.ajax({
        url: UrlGetArticulos,
        type: "GET",
        dataType: "json",
        success: function(response){
            var MiItems = response;
            var valores='';
            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].DESCRIPCION+'</td>'+
                '<td>'+MiItems[i].UNIDAD+'</td>'+
                '<td>'+MiItems[i].COSTO+'</td>'+
                '<td>'+MiItems[i].PRECIO+'</td>'+
                '<td>'+MiItems[i].APLICA_ISV+'</td>'+
                '<td>'+MiItems[i].PORCENTAJE_ISV+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="CargarArticulos('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarArticulos('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.articulosTabla').html(valores);
            }
        }
    });
});

/*
function CargarArticulos(){
    console.log("Cargando Archivos");
    $.ajax({
        url: UrlGetArticulos,
        type: "GET",
        dataType: "json",
        success: function(response){
            console.log(response);
            var MiItems = response;
            var valores='';
            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].DESCRIPCION+'</td>'+
                '<td>'+MiItems[i].UNIDAD+'</td>'+
                '<td>'+MiItems[i].COSTO+'</td>'+
                '<td>'+MiItems[i].PRECIO+'</td>'+
                '<td>'+MiItems[i].APLICA_ISV+'</td>'+
                '<td>'+MiItems[i].PORCENTAJE_ISV+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="CargarArticulos('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarArticulos('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Articulos').html(valores);
            }
        }
    });
}*/

function AgregarArticulos(){
    console.log("Insert");
   var datosarticulos = {
    DESCRIPCION: $('#DESCRIPCION').val(),
    UNIDAD: $('#UNIDAD').val(),
    COSTO: $('#COSTO').val(),
    PRECIO: $('#PRECIO').val(),
    APLICA_ISV: $('#APLICA_ISV').val(),
    PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
    ESTADO: $('#ESTADO').val(),
    ID_SOCIO: $('#ID_SOCIO').val(),
    
   };
   console.log("Primer Log",datosarticulos);
   var datosarticulosjson = JSON.stringify(datosarticulos);
   console.log("Segundo Log",datosarticulosjson);
   $.ajax({
   url : "http://localhost:80/G6_20/controller/Articulos.php?opciones=InsertArticulos",//UrlPostArticulos,
   type: "POST",
   data: datosarticulosjson,
   datatype: "json",
   async: true,
        cache: true,
   contentType: 'applicaction/json',
   success: function(dataResult){
       console.log(dataResult);
       alert("Su Articulo ha sido Agregado")
       location.reload();
   }
   });
   
}

function CargarArticulos(idarticulos){
var datosarticulos ={
    ID:idarticulos
};
var datosarticulosjson=JSON.stringify(datosarticulos)

$.ajax({
    url: UrlPostUno,
    type: 'POST',
    data:datosarticulosjson,
    datatype:'json',
    contentType: 'application/json',
    success:function(response){
        var MiItems = response;
        $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
        $('#UNIDAD').val(MiItems[0].UNIDAD);
        $('#COSTO').val(MiItems[0].COSTO);
        $('#PRECIO').val(MiItems[0].PRECIO);
        $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
        $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
        $('#ESTADO').val(MiItems[0].ESTADO);
        $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
        var btnActualizar = '<input type="button" id="btn_actualizar" onclick="ActualizarArticulos('+MiItems[0].ID+')"'+
        'value="Actualizar Articulos" class="btn btn-primary"></input>';
        $('.btnagregar').html(btnActualizar);
    }
});
}

function ActualizarArticulos(idarticulos){
    var datosarticulos ={
        ID:idarticulos,
        DESCRIPCION: $('#DESCRIPCION').val(),
        UNIDAD: $('#UNIDAD').val(),
        COSTO: $('#COSTO').val(),
        PRECIO: $('#PRECIO').val(),
        APLICA_ISV: $('#APLICA_ISV').val(),
        PORCENTAJE_ISV: $('#PORCENTAJE_ISV').val(),
        ESTADO: $('#ESTADO').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
    };
    var datosarticulosjson=JSON.stringify(datosarticulos);
console.log(datosarticulosjson);
    $.ajax({
        url: UrlPutArticulos,
        type: 'PUT',
        data: datosarticulosjson,
        datatype: 'json',
        contentType: 'application/json',
        success:function(response){
            console.log(response);
            alert("Su Articulo se ha Actualizado");

            location.reload();
        }
    });
   
}

function EliminarArticulos(idarticulos){
    var datosarticulos ={
        ID: idarticulos
    };
    var datosarticulosEliminarjson=JSON.stringify(datosarticulos)
    $.ajax({
        url: UrlDeleteArticulos,
        type: 'DELETE',
        data: datosarticulosEliminarjson,
        datatype: 'json',
        contentType: 'application/json',
        success:function(response){
            console.log(response);
            alert("Su Articulo se ha Eliminado");
        }
    });
   
}