'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: []
}
// {
//     txt: '',
//     size: 20,
//     align: 'left',
//     color: 'red',
//     x: 250,
//     y: 50
// }

var gLinesPos = [
    {
        x: 250,
        y: 50
    },
    {
        x: 250,
        y: 450
    }
]

var gFontSize;


function getMeme() {
    console.log('getMeme() return gMeme', gMeme);
    return gMeme;
}

function setMemeImgId(imgId) {
    gMeme.selectedImgId = imgId;
}


function setMemeFontSize(changeVal) {
    gFontSize += changeVal;
}

function getMemeFontSize() {
    return gFontSize;
}

function createLine(text, size, align = "left", fillColor = "white", strokeColor = "black") {
    var newLine = {
        txt: text,
        size,
        align,
        fillColor,
        strokeColor

    }
    gMeme.lines.push(newLine);
    console.log(gMeme);
}