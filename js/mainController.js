'use strict'

var gElCanvas;
var gCtx;

function init() {
    console.log('hey-init');
    gElCanvas = document.querySelector('.meme-canvas');
    const elContainer = document.querySelector('.canvas-container')
    gCtx = gElCanvas.getContext('2d')
    // renderMemeOnCanvas()
    // console.log(gMeme);
}

function onImgClicked(imgId) {
    console.log(imgId);
    setMemeImgId(imgId);

    var meme = getMeme();
    var selectedImgId = meme.selectedImgId;

    var memeImg = new Image();
    memeImg.src = `./img/meme-imgs(square)/${selectedImgId}.jpg`;
    gCtx.drawImage(memeImg, 0, 0);
    memeImg.onload = function () {
        gElCanvas.width = memeImg.naturalWidth
        gElCanvas.height = memeImg.naturalHeight
        gCtx.drawImage(memeImg, 0, 0);
    }
    var elMemeEdit = document.querySelector('.meme-edit');
    elMemeEdit.style.display = 'flex';

    gFontSize = 30;
    renderFontSize()

}

function onAddText() {
    var elTextLine = document.querySelector('input[name=textLine]');
    // var elFontSize = document.querySelector('.font-size').innerText;
    createLine(elTextLine.value, getMemeFontSize());
    elTextLine.value = '';
    
    if (!gMeme.lines) drawLineTxt(gMeme.lines[0], gLinesPos[0]);
    else drawLineTxt(gMeme.lines[gMeme.lines.length - 1], gLinesPos[gMeme.lines.length - 1])
}


function drawLineTxt(line, pos) {
    // need to fix 3+ rows.
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.font = `${line.size}px IMPACT`


    gCtx.textAlign = 'center';
    gCtx.fillText(line.txt, pos.x, pos.y);
    gCtx.strokeText(line.txt, pos.x, pos.y);
}

function onChangeFontSize(changeVal) {
    setMemeFontSize(changeVal)
    renderFontSize();
}

function renderFontSize() {
    var gElFontSize = document.querySelector('.font-size');
    gElFontSize.innerText = getMemeFontSize();
    console.log(gElFontSize);
}
