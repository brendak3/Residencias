const Cyton = require("@openbci/cyton");
const {constants} = require("@openbci/utilities");

const ourBoard = new Cyton({
  simulate: true
});

//Simulo que leo del puerto
var portName = constants.OBCISimulatorPortName;

ourBoard.connect(portName).then(function (){
  console.log('Console');
  //ourBoard.on('ready', () =>{
    ourBoard.streamStart();
    ourBoard.on('sample', function(sample){
      console.log('Iteration');
      //console.log(sample.channelData[0]);
        for (var i = 0; i < 8; i++) {
          //console.log("Chanel " + i + " " + sample.channelData[i]);
        }
    });
  //});
}).catch(function(err){
  console.log("Pues no se pudo");
});
