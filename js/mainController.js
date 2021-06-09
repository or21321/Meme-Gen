'use strict'

var gElCanvas;
var gCtx;


function init() {
    console.log('hey-init');
    gElCanvas = document.querySelector('.meme-canvas');
    const elContainer = document.querySelector('.canvas-container')
    gCtx = gElCanvas.getContext('2d')
    // renderMemeOnCanvas()
}

function onImgClicked(imgId) {
    setMemeImgId(imgId);

    var meme = getMeme();
    var selectedImgId = meme.selectedImgId;

    var memeImg = new Image();
    memeImg.src = `/img/meme-imgs(square)/${selectedImgId}.jpg`;
    gCtx.drawImage(memeImg, 0, 0);
    memeImg.onload = function () {
        gElCanvas.width = memeImg.naturalWidth
        gElCanvas.height = memeImg.naturalHeight
        gCtx.drawImage(memeImg, 0, 0);
    }
    var elMemeEdit = document.querySelector('.meme-edit');
    elMemeEdit.style.display = 'flex';
}

function onAddText() {
    var elTextLine = document.querySelector('input[name=textLine]')
    setMemeText(elTextLine.value);
    elTextLine.value = '';
    console.log(gMeme.lines[0].txt)
    drawTextLine(gMeme.lines[0].txt);
}

function drawTextLine(text, x = 250, y = 50) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = '40px IMPACT'
    
    
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}


