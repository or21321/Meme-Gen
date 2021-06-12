'use strict'

var gKeywords = { 'happy': 12, 'funny puk': 1 }

var gImgs = [
    { id: 0, url: 'img/meme-imgs(square)/1.jpg', keywords: ['happy'] },
    { id: 1, url: 'img/meme-imgs(square)/2.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/meme-imgs(square)/3.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/meme-imgs(square)/4.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/meme-imgs(square)/5.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/meme-imgs(square)/6.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/meme-imgs(square)/7.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/meme-imgs(square)/8.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/meme-imgs(square)/9.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/meme-imgs(square)/10.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/meme-imgs(square)/11.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/meme-imgs(square)/12.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/meme-imgs(square)/13.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/meme-imgs(square)/14.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/meme-imgs(square)/15.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/meme-imgs(square)/16.jpg', keywords: ['happy'] },
    // {id: 16, url: 'img/meme-imgs(square)/17.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/meme-imgs/X-Everywhere.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/meme-imgs/9.jpg', keywords: ['happy'] },
];

var gMeme = {
    selectedImgId: 5,
    // selectedLineIdx: 0,
    selectedLineIdx: -1,
    linePosIdx: 0,
    lines: [],
    fontSize: 40,
    font: 'IMPACT',
    isLineEditOn: false,
    isFocusedLineOn: false,
    isLineDeleted: false
}


var gLinesPos = [
    {
        x: 225,
        y: 50
    },
    {
        x: 225,
        y: 450
    },
    {
        x: 225,
        y: 225
    },
    {
        x: 225,
        y: 215
    },
    {
        x: 225,
        y: 235
    },
    {
        x: 225,
        y: 205
    },
    {
        x: 225,
        y: 245
    },
    {
        x: 225,
        y: 200
    },
]

function getSelectedLineIdx() {
    return gMeme.selectedLineIdx;
}

function getMeme() {
    return gMeme;
}

function setSelectedImgId(imgId) {
    gMeme.selectedImgId = imgId - 1;
}

function setMemeFontSize(changeVal) {
    gMeme.fontSize += changeVal;
}

function getMemeFontSize() {
    return gMeme.fontSize;
}

function createLine(text, align = "left", fillColor = "white", strokeColor = "black") {
    var linePosIdx = gMeme.linePosIdx;
    // var linePosIdx = gMeme.lines.length;

    var newLine = {
        txt: text,
        size: getMemeFontSize(),
        align,
        fillColor,
        strokeColor,
        pos: gLinesPos[linePosIdx]
    }
    gMeme.lines.push(newLine);
    gMeme.linePosIdx++;
}

function setSelectedLineIdx() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0;
    }
    else {
        ++gMeme.selectedLineIdx;
    }
}

function setFocusedLine(val) {
    gMeme.isFocusedLineOn = val;
}
function resetSelectedLineIdx() {
    gMeme.selectedLineIdx = -1;
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedLineIdx];
}

function setLinePosY(moveVal) {
    var focusedLineIdx = gMeme.selectedLineIdx;
    gMeme.lines[focusedLineIdx].pos.y += moveVal;
}

function setLinePosX(moveVal) {
    var focusedLineIdx = gMeme.selectedLineIdx;
    gMeme.lines[focusedLineIdx].pos.x += moveVal;
}

function setLineEdit(val) {
    gMeme.isLineEditOn = val;
}

function deleteLastLine() {
    gMeme.lines.pop();
}

function deleteSelectedLine() {
    if (gMeme.selectedLineIdx === -1) return
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.isLineDeleted = true;
    setSelectedLineIdx(-1);
    setFocusedLine(false);
}