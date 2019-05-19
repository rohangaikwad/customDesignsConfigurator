var options = {
    fontFamily: 'KGNoRegretsSketch',
    width: 3308, height: 4679,
    labels: [
        {
            label: "Name", x: 0.5, y: 0.18, color: '#ff91ad', fontsize: 500, value: 'Emily'
        },
        {
            label: "Date", x: 0.5, y: 0.345, color: '#00cded', fontsize: 230, value: '19-05-2019'
        },
        {
            label: "Weight", x: 0.3, y: 0.465, color: '#00cded', fontWeight: 'bold', fontsize: 300, value: '15'
        },
        {
            label: "Height", x: 0.7, y: 0.465, color: '#00cded', fontWeight: 'bold', fontsize: 300, value: '30'
        },
        {
            label: "No. of teeth", x: 0.23, y: 0.64, color: '#ff91ad', fontsize: 300, value: '4'
        },
        {
            label: "First Words", x: 0.58, y: 0.68, color: '#ff91ad', fontsize: 150, originX: 'left', value: 'mama, dada'
        },
        {
            label: "I love", x: 0.15, y: 0.815, color: '#ff91ad', fontsize: 150, value: 'bath time,\nbeing outside', originX: 'left'
        },
        {
            label: "I can", x: 0.58, y: 0.815, color: '#ff91ad', fontsize: 150, value: 'walk,\ngive high five', originX: 'left'
        }
    ]
}





{
    // init font
    var i = document.createElement('i');
    i.innerText = "dsf";
    i.style.fontFamily = "KGNoRegretsSketch";
    i.style.visibility = "hidden";
    i.style.position = "absolute";
    i.style.left = "-1000px";
    document.body.appendChild(i);
}

var canvasElem = document.querySelector('#c');

var wh = window.innerHeight - 50 - 100;
var scaledH = options.height * 1, scaledW = options.width * 1;
if(options.height > wh) {
    scaledH = wh * 1;
    scaledW = wh/options.height * options.width
}

canvasElem.width = options.width;
canvasElem.height = options.height;

var canvas = new fabric.Canvas('c', {preserveObjectStacking: true});


fabric.Object.prototype.set({
    transparentCorners: false,
    cornerSize: 60,
    padding: 15
});
fabric.Image.fromURL('images/templates/1.png', function (oImg) {
    oImg.selectable = false;
    init(oImg)
});


function init(img) {

    canvas.add(img);

    options.labels.forEach(function(o,i){
        console.log(o.value)
        var text = new fabric.Text(o.value, { 
            left: options.width * o.x, top: options.height * o.y, fontSize: o.fontsize, fontFamily: 'KGNoRegretsSketch', fill: o.color, originX: o.originX || 'center', originY: 'center', fontWeight: o.fontWeight || 'normal', id: 'f'+i
        });
        canvas.add(text);
    });
}

function out() {
    var jpgURLat50PercentQuality = canvas.toDataURL("image/jpeg", 0.6);
    var i1 = document.querySelector('#i1');
    i1.src = jpgURLat50PercentQuality;
    i1.onload = function() {
        thumb();
    }
}

function thumb() {
    var wSize = 700;
    var tCanvas = document.querySelector('#t');
    tCanvas.width = wSize;
    tCanvas.height = (wSize * options.height)/options.width;

    // tCanvas.width = options.width;
    // tCanvas.height = options.height;

    var ctx = tCanvas.getContext("2d");
    var img = document.querySelector('#i1');
    ctx.drawImage(img, 0, 0, wSize, (wSize * options.height)/options.width);
    //ctx.drawImage(img, 0, 0, options.width, options.height);
    
    var thumb = tCanvas.toDataURL("image/jpeg", 0.4);
    var i2 = document.querySelector('#i2')
    i2.src = thumb;
    i2.onload = function() {
        //i2.style.display = "block";
        Canvas2Image.saveAsPNG(tCanvas);
    }
}




// populate labels
{
    var labelsContent = document.querySelector('.panel.panel-labels .panel-content');
    options.labels.forEach(function(o,i) {

        var div = document.createElement('div');
        div.className = "custom-label";

        var label = document.createElement('label');
        label.innerText = o.label;

        var tBox = document.createElement('textarea');
        tBox.value = o.value;
        tBox.addEventListener('keyup', function(e) {
            console.log(e.target.value)
            canvas.getObjects().forEach(function(o) {
                if(o.id === 'f'+i) {
                    canvas.setActiveObject(o);
                    var obj = canvas.getActiveObject();
                    obj.set({
                        text:e.target.value
                    });
                    canvas.renderAll();
                }
            })
        });
        
        div.appendChild(label);
        div.appendChild(tBox);
        labelsContent.appendChild(div);
    })
}


document.querySelector('.btn-download').addEventListener('click', function () {
    out();
});