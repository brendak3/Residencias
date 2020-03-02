const { ipcRenderer } = require('electron');

ipcRenderer.on('action-update-label', (event, arg) => {

    // Update the second window label content with the data sent from
    // the first window :) !
    //let label = document.getElementById("label");
    console.log(arg.message);
    //label.innerHTML = arg.message;
    //label.style.color = arg.color;
    //label.style.backgroundColor = arg.backgroundColor;
    $('#video').attr("src", arg.message);
});
