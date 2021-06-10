'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [],
    focusedLine: 0
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
        x: 225,
        y: 50
    },
    {
        x: 225,
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
    var linePosIdx;
    console.log(gMeme.lines);
    if (gMeme.lines.length === 0) linePosIdx = 0;
    else linePosIdx = gMeme.lines.length;
    console.log(gLinesPos[0]);
    var newLine = {
        txt: text,
        size,
        align,
        fillColor,
        strokeColor,
        pos: gLinesPos[linePosIdx]
    }
    gMeme.lines.push(newLine);
    console.log(gMeme);
}

function setFocusedLine(focusedLine) { 
    gMeme.focusedLine = parseInt(focusedLine);
    console.log(gMeme);
}

function setLinePos(moveVal) { 
    var focusedLineIdx = gMeme.focusedLine - 1;
    console.log('gMeme.lines', gMeme.lines);
    console.log('gMeme.lines[0].pos.y', gMeme.lines[focusedLineIdx].pos.y);
    gMeme.lines[focusedLineIdx].pos.y += moveVal;
    console.log('gMeme.lines[0].pos.y', gMeme.lines[focusedLineIdx].pos.y);
}