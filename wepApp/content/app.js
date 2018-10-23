var sizeMemory = 256;
var typeMemory = "Fija";
var fitMemory = "Best Fit";
var algorithm = "FCFS";

var arrayProcess = [];

$(function () {
  $('[data-toggle="popover"]').popover()
})

$(document).ready(function () {
    getData();
    $(".quantumIn").hide();

    $(".optionFitTwo").hide();

    console.log(sizeMemory);
    console.log(typeMemory);
    console.log(fitMemory);
    console.log(algorithm);

    $(".sizeInput, .arrivalInput, .firstCpu, .inOut, .lastCpu, .quantumIn, .fixedPart, .inputMemory").keydown(function (e) {
       if ((e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
         (e.keyCode >= 35 && e.keyCode <= 40) ||
         $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1) {
         return;
      }
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
         (e.keyCode < 96 || e.keyCode > 105)) {
          e.preventDefault();
      }

      $('.quantumIn').keypress(function() {
          //falta hacer
      });

    });


   //control de la obtención del tamaño de la memoria
   $(".optionOne").click(function(){
      sizeMemory = parseInt($(".optionOne > input").val());
      console.log(sizeMemory)
   });
   $(".optionTwo").click(function(){
       sizeMemory = parseInt($(".optionTwo > input").val());
       console.log(sizeMemory)
   });
   $(".optionThree").click(function(){
      sizeMemory = parseInt($(".optionThree > input").val());
      console.log(sizeMemory)
   });
   //--------------------------------

   //control del tipo de memoria
   $(".optionTypeOne").click(function(){
      $(".fixedPart").show();
      var valueCurrent = $(".optionTypeOne > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
      $("#collapseExample").addClass("show");
      $(".optionFitTwo").hide();
      $(".optionFitOne").show();
   });
   $(".optionTypeTwo").click(function(){
      $(".fixedPart").hide();
      var valueCurrent = $(".optionTypeTwo > input").val();
      typeMemory = valueCurrent;
      console.log(typeMemory);
      $("#collapseExample").removeClass("show");
      //$("#collapseExample").addClass("show");
      $(".optionFitTwo").show();
      $(".optionFitOne").hide();
   });
   //-------------------------

   //control de ajuste de memoria
   $(".optionFitOne").click(function(){
      var valueCurrent = $(".optionFitOne > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
   });
   $(".optionFitTwo").click(function(){
      var valueCurrent = $(".optionFitTwo > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
   });
   $(".optionFitThree").click(function(){
      var valueCurrent = $(".optionFitThree > input").val();
      fitMemory = valueCurrent;
      console.log(fitMemory);
   });
   //------------------------------------

   //control de la seleccion de algoritmo
   $(".optionPlaningOne").click(function(){
      var valueCurrent = $(".optionPlaningOne > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").val("");
      $(".quantumIn").hide();
   });
   $(".optionPlaningTwo").click(function(){
      var valueCurrent = $(".optionPlaningTwo > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").show();
   });
   $(".optionPlaningThree").click(function(){
      var valueCurrent = $(".optionPlaningThree > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").val("");
      $(".quantumIn").hide();
   });
   $(".optionPlaningFour").click(function(){
      var valueCurrent = $(".optionPlaningFour > input").val();
      algorithm = valueCurrent;
      console.log(algorithm);
      $(".quantumIn").hide();
   });
   //------------------------------------

   //seguir
   $(".startButton").click(function(){
      $('.progress-bar').clone().addClass('newClass').insertAfter('.progress');
   });
   //--------------

});


var cont = 5;

//inputs para crear las particiones
$(document).on('click', '.btn-add', function(e){

    $('.alertCustom').removeClass('show');
    $('.alertCustom').addClass('hide');

    e.preventDefault();

      if(cont > 0){

        if($('.inputMemory').val()){

          var controlForm = $('.controls form:first'),
              currentEntry = $(this).parents('.entry:first'),
              newEntry = $(currentEntry.clone()).appendTo(controlForm);

          newEntry.find('input').val('');
          controlForm.find('.entry:not(:last) .inputMemory')
            .addClass('classDisabled')
            .removeClass('inputMemory')
            .prop('disabled', true);

          controlForm.find('.entry:not(:last) .btn-add')
              .removeClass('btn-add').addClass('btn-remove')
              .removeClass('btn-success').addClass('btn-danger')
              .html('<span class="glyphicon glyphicon-minus">Quitar</span>');

          cont = cont - 1;

        }else{
          $('.alertCustom').addClass('show');
        }

      }else{
          $('.alertCustom').addClass('show');
      }

    }).on('click', '.btn-remove', function(e)
    {
    $(this).parents('.entry:first').remove();

    e.preventDefault();
    return false;
  });
//-------

var config = {
    apiKey: "AIzaSyBPV-YDy4TwyVtAnKzG8SQ3fwKy4gyAHxQ",
    authDomain: "proyectoprocesos-fddd5.firebaseapp.com",
    databaseURL: "https://proyectoprocesos-fddd5.firebaseio.com",
    projectId: "proyectoprocesos-fddd5",
    storageBucket: "proyectoprocesos-fddd5.appspot.com",
    messagingSenderId: "80081573356"
};

firebase.initializeApp(config);

var db = firebase.firestore();

function saveData() {

    var name = $('.name').val();
    var size = $('.size').val();
    var arrival = $('.arrival').val();
    var firstCpu = $('.firstCpu').val();
    var inOut = $('.inOut').val();
    var lastCpu = $('.lastCpu').val();

    saveFirebase(name, size, arrival, firstCpu, inOut, lastCpu);
}

function saveFirebase(name, size, arrival, firstCpu, inOut, lastCpu) {

    db.collection("process").add({
        name: name,
        size: size,
        arrivalTime: arrival,
        cpuTime: firstCpu,
        ioTime: inOut,
        lastCpuTime: lastCpu
    }).then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);

        $('.name').val("");
        $('.size').val("");
        $('.arrival').val("");
        $('.firstCpu').val("");
        $('.inOut').val("");
        $('.lastCpu').val("");

        getData();

    }).catch(function (error) {
        console.error("Error adding document: ", error);
    });
}

function deleteData(idData){

    db.collection("process").doc(idData).delete().then(function() {
        console.log("Document successfully deleted!");
        getData();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function getData(){

    var tabla = document.getElementById('tableId');

    db.collection("process").orderBy('arrivalTime').get().then((querySnapshot) => {

        tabla.innerHTML = '';
        var index = 1;

        querySnapshot.forEach((doc) => {

          tabla.innerHTML += `
            <tr>
                <td class="tdTable">${index}</td>
                <td class="tdTable">${doc.data().size}</td>
                <td class="tdTable">${doc.data().arrivalTime}</td>
                <td class="tdTable">${doc.data().cpuTime} - ${doc.data().ioTime} - ${doc.data().lastCpuTime}</td>
                <td class="tdTable"><button class="btn btn-danger" onclick="deleteData('${doc.id}')">Borrar</button></td>
            </tr>
            `;
            index += 1;

          arrayProcess.push(doc.data());

          console.log(arrayProcess);

          firstComeFirstServed(arrayProcess);

        });
    });
}

function secondStep(){
  $('[href="#profile"]').tab('show');
}

//algoritmo FCFS
function firstComeFirstServed(procesosMemoria){
   var colaBloqueados = procesosMemoria;
   var colaListo=[];
   var salidaCPU=[];
   var salidaES=[];
   var salidaFinal =[];
   var salidaTabla=[];
   var tablaTime=[];
   var tablaCPU=[];
   var tablaES=[];
   var tablaCola= [];
   var cola=[];
   var enES = [];
   var enCPU=[];
   var controladorBucle = 0;
   var n=0;
   var i;
   var tiempo=0;
   var tiempoCpu;
   var x=0;
   var elementoCPU=[];
   var elementoES=[];
   var t1=0;
   var t2=0;

//obtención de la cantodad de tiempo de procesamiento
   for (var i = 0; i < colaBloqueados.length; i++) {
      var firstCpu = parseInt(colaBloqueados[i].ioTime) + parseInt(colaBloqueados[i].cpuTime) + parseInt(colaBloqueados[i].lastCpuTime);
      var controladorBucle =controladorBucle + firstCpu;
   }
//-------------------------------

   for (var i=controladorBucle; i>0; i--) {
            if (colaBloqueados[n].arrivalTime<= tiempo){colaListo.push(colaBloqueados[n]);
                                                        colaBloqueados=colaBloqueados.splice(n,1);}
          }

          if (colaListo[x].cpuTime!=0){
            if (enCPU=[]){enCPU=colaListo[x];
              if (enCPU.cpuTime!=0){
                  enCPU.cpuTime=enCPU.cpuTime-1;
                  elementoCPU[0].push(enCPU.name);
                  elementoCPU[1].push(t1+1);
                  if (enCPU.cpuTime=0){salidaCPU.push(elementoCPU); t1=0;enCPU=[];x=x+1;}
                }
              }else
                {if (enCPU.cpuTime!=0){
                    enCPU.cpuTime=enCPU.cpuTime-1;
                    elementoCPU[0].push(enCPU.name);
                    elementoCPU[1].push(t1+1);
                    if (enCPU.cpuTime=0){salidaCPU.push(elementoCPU); t1=0;enCPU=[];x=x+1;}
                    }
              }
           }else{if(enCPU.ioTime=0){if (enCPU.lastCpuTime!=0){
             enCPU.lastCpuTime=enCPU.lastCpuTime-1;
             elementoCPU[0].push(enCPU.name);
             elementoCPU[1].push(t1+1);
             if (enCPU.lastCpuTime=0){salidaCPU.push(elementoCPU); t1=0;enCPU=[];x=x+1;}}
           }}

         if(colaListo[y].cpuTime=0){
           if (colaListo[y].ioTime!=0){
             if(enES=[]){enES=colaListo[y]
               enES.ioTime= enES.ioTime-1;
               elementoES[0].push(enES.name);
               elementoES[1].push(t2+1);
               if (enES.ioTime=0){salidaES.push(elementoES); t2=0;enES=[];y=y+1;}
              }
              else{if(enES.ioTime!=0){
                                      enES.ioTime= enES.ioTime-1;
                                      elementoES[0].push(enES.name);
                                      elementoES[1].push(t2+1);
                                      if (enES.ioTime=0){salidaES.push(elementoES); t2=0;enES=[];y=y+1;}}
                                    }
              }}
          tiempo=tiempo+1;
          if(colaListo[0].cpuTime=0) {if (colaListo[0].ioTime=0){if (colaListo[0].lastCpuTime=0)
                {i=0;colaListo=colaListo.splice(i,1);}}}
          if(colaListo[0].cpuTime=0){if (colaListo[0].ioTime=0){if (colaListo[0].lastCpuTime!=0){x=0;}}}
          if(colaListo[0].cpuTime=0){if (colaListo[0].ioTime!=0){y=0;}}
          if (colaListo=[]){if (colaBloqueados=[]){break;}}
  }
  salidaFinal.push(salidaCPU);
  salidaFinal.push(salidaES);
  console.log("Es la salida final", salidaFinal);
}
