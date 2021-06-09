'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I never eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

function getMeme() {    
    console.log('getMeme() return gMeme', gMeme);
    return gMeme;
}

function setMemeImgId(imgId) {   
    gMeme.selectedImgId = imgId;
}

function setMemeText(text) {
    gMeme.lines[0].txt = text;
    console.log('gMeme.lines.txt', gMeme.lines.txt)
}