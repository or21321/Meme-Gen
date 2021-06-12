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
    setSelectedImgId(imgId);
    var elMemeEdit = document.querySelector('.meme-edit');
    elMemeEdit.style.display = 'flex';
    renderCanvas();
    renderFontSize()
}

function onAddText() {
    setLineEdit(false);
    var elTextLine = document.querySelector('input[name=textLine]');
    if (!elTextLine.value) return;
    // createLine(elTextLine.value);
    elTextLine.value = '';
    // drawLineTxt(gMeme.lines[gMeme.lines.length - 1])
    renderSelectOption(gMeme.lines.length);
    renderFocusedLine();
}

function renderSelectOption(focusedLine) {
    var elFocusSelect = document.querySelector('.focus-lines');
    if (elFocusSelect.innerText === '') setSelectedLine(1);
    elFocusSelect.innerHTML += `<option value="${focusedLine}">${focusedLine}</option>`
}

function drawLineTxt(line) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.font = `${line.size}px Impact`
    console.log(line.size);

    gCtx.textAlign = line.textAlign;
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y);
    gCtx.fillText(line.txt, line.pos.x, line.pos.y);
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
            renderFocusedLine();
        }
        console.log('i', i);
    })
}

function onFocusLine(selectedLine) {
    // console.log('focusedLine', focusedLine);
    setSelectedLine(selectedLine);
    renderFocusedLine();
}

function renderFocusedLine() {
    var line =  getfocusedLine();
    var pos = {...line.pos};
    var textWidth = gCtx.measureText(line.txt).width;
    // console.log(textWidth);

    // console.log('line', line);
    // console.log('focusedLine.pos', gMeme.lines[focusedLine - 1].pos);
    gCtx.beginPath()
    // gCtx.rect(50, 50, 250, 250)
    gCtx.rect(pos.x - 5, pos.y - gMeme.fontSize, textWidth + 10, gMeme.fontSize + 10)
    gCtx.strokeStyle = 'black'
    gCtx.stroke()
}

function renderCanvas() {
    // render fresh canvas:
    var meme = getMeme();
    var selectedImgId = meme.selectedImgId;

    var memeImg = new Image();
    memeImg.src = gImgs[selectedImgId].url;
    console.log(memeImg.src);
    // memeImg.src = `./img/meme-imgs(square)/${selectedImgId}.jpg`;
    gCtx.drawImage(memeImg, 0, 0);
    memeImg.onload = function () {
        // gElCanvas.height = (this.height * gElCanvas.width) / this.width
        gElCanvas.width = (this.height * gElCanvas.height) / this.width
        console.log('gElCanvas.height', gElCanvas.height);
        console.log('gElCanvas.width', gElCanvas.width);
        // gElCanvas.width = this.naturalWidth
        // gElCanvas.height = this.naturalHeight
        gCtx.drawImage(this, 0, 0);
    }
}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    console.log('DATA', data);
    elLink.href = data
    elLink.download = 'Your-Meme'
    // saveToStorage('img', data);
}

function saveMeme() {
    const data = gElCanvas.toDataURL();
    saveToStorage('memes', data);
    console.log(localStorage);

    // render save image from local storage:
    var elRenderSavedCanvas = document.querySelector('.render-saved');
    var elCtx = elRenderSavedCanvas.getContext('2d')
    var dataURL = loadFromStorage('memes')
    var img = new Image;
    img.src = dataURL;
    // img.onload = function () {
    //     elCtx.drawImage(img, 0, 0);
    // };

}

function renderLineLive(elInput) {
    if (elInput.value.length === 1 && gMeme.isLineEditOn === false) {
        createLine(elInput.value);
        drawLineTxt(gMeme.lines[getSelectedLine()]);
        setLineEdit(true);
    }
    if (elInput.value.length < gMeme.lines[gMeme.lines.length - 1].txt.length) {
        renderCanvas();
    }
    // setTimeout(() => {
        gMeme.lines[gMeme.lines.length - 1].txt = elInput.value;
        // console.log(gMeme.lines[gMeme.lines.length - 1].txt);
        // drawLineTxt(gMeme.lines[gMeme.lines.length - 1])
        // currLineCharsLength = gMeme.lines[gMeme.lines.length - 1].txt.length;
        // console.log(currLineCharsLength);
    // })
      setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            console.log('gMeme.lines.length', gMeme.lines.length);
            console.log('i', i);
            drawLineTxt(gMeme.lines[i]);
        }
        console.log('i', i);
    })

}

// function check() {
//     console.log('Hey');
// }


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