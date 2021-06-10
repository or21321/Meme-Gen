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
    setMemeImgId(imgId);
    var elMemeEdit = document.querySelector('.meme-edit');
    elMemeEdit.style.display = 'flex';
    renderCanvas();
    gFontSize = 40;
    renderFontSize()

}

function onAddText() {
    var elTextLine = document.querySelector('input[name=textLine]');
    if (!elTextLine.value) return;
    createLine(elTextLine.value, getMemeFontSize());
    elTextLine.value = '';
    drawLineTxt(gMeme.lines[gMeme.lines.length - 1])
    renderFocusOption(gMeme.lines.length);
}

function renderFocusOption(focusLines) {
    var elFocusSelect = document.querySelector('.focus-lines');
    if (elFocusSelect.innerText === '') setFocusedLine(1);
    elFocusSelect.innerHTML += `<option value="${focusLines}">${focusLines}</option>`
}

function drawLineTxt(line) {
    // need to fix 3+ rows.
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.font = `${line.size}px IMPACT`


    gCtx.textAlign = line.textAlign;
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
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

function onLineMovePos(moveVal) {
    setLinePos(moveVal);

    // render line with new pos:
    // drawLineTxt(gMeme.lines[0])
    // render canvas with img again, all lines with curr pos:
    renderCanvas();

    // render lines with new curr pos:
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            console.log('gMeme.lines.length', gMeme.lines.length);
            console.log('i', i);
            drawLineTxt(gMeme.lines[i]);
        }
        console.log('i', i);
    })
}

function onFocusLine(focusedLine) {
    console.log('focusedLine', focusedLine);
    setFocusedLine(focusedLine);
}

function renderCanvas() {
    // render fresh canvas:
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
}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    console.log('DATA', data);
    elLink.href = data

    saveToStorage('img', data);

    // elLink.download = 'Your-Meme'
}


// text wrap: NOT WORKING 
// var wrapText = function (ctx, text, sx, sy, w) {
//     var words = text.match(/\w+/g),
//         word,
//         lines = [],
//         currentLine = '',
//         len = words.length,
//         wordIndex = 0,
//         x = sx,
//         y = sy,
//         m;
//     while (wordIndex < len) {
//         word = words[wordIndex];
//         m = ctx.measureText(word + ' ');
//         x += m.width;
//         if (x + m.width < w) {
//             currentLine += word + ' ';
//             if (wordIndex === len - 1) {
//                 lines.push(currentLine);
//             }
//         } else {
//             x = sx;
//             lines.push(currentLine);
//             currentLine = word + ' ';
//         }
//         wordIndex += 1;
//     }
//     return lines;
// };

    // function drawLineTxt(line) {
    //     // need to fix 3+ rows.
    //     var text =  wrapText(gCtx, line.txt,0,0, gElCanvas.width);
    //     console.log(text);
    //     gCtx.lineWidth = 2;
    //     gCtx.strokeStyle = `${line.strokeColor}`
    //     gCtx.fillStyle = `${line.fillColor}`
    //     gCtx.font = `${line.size}px IMPACT`


    //     text.forEach(function(line,i){
    //         console.log(i);
    //         console.log(line);
    //         gCtx.fillText(line, 0, 30 * i + 40)
    //     });
        // gCtx.textAlign = line.textAlign;
        // gCtx.fillText(text, line.pos.x, line.pos.y);
        // gCtx.strokeText(text, line.pos.x, line.pos.y);
    // }
// };