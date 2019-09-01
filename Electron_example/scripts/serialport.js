const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const parser = new ReadLine();

// const mySerial = new SerialPort('COM3', {
//   baudRate:9600
// });
//
// SerialPort.list((err, ports) =>{
//     console.log('ports', ports)
//     console.log((ports[0].comName))
//     document.getElementById('De_verdad').value = ports[0].comName
//   }
// );
//
// mySerial.on('open', function(){
//   console.log('SerailPort open');
// });
//
// mySerial.on('data', function(data){
//   console.log(data.toString);
//   //Buscar el elemento con ese Id y darle como valor lo que se lee por el puerto serial
//   document.getElementById('No_Te_Amo_Brenda_mucho').value = data.toString();
// });
//
// mySerial.on('err', function (err) {
//   console.log(err.message);
// });
