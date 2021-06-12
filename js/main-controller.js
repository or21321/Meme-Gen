'use strict'

var gElCanvas;
var gCtx;

const gElLineInput = document.querySelector('input[name=textLine]');

function init() {
    gElCanvas = document.querySelector('.meme-canvas');
    const elContainer = document.querySelector('.canvas-container')
    gCtx = gElCanvas.getContext('2d')
    // renderMemeOnCanvas()
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
    // var elTextLine = document.querySelector('input[name=textLine]');
    if (!gElLineInput.value) return;
    // createLine(elTextLine.value);
    gElLineInput.value = '';
    // drawLineTxt(gMeme.lines[gMeme.lines.length - 1])
    // renderSelectOption(gMeme.lines.length);
    // renderFocusedLineRect();
    setFocusedLine(false);
    resetSelectedLineIdx();
    unrenderFocusedRect();
}
function unrenderFocusedRect() {
    renderCanvas();
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
        }
    })
}



function drawLineTxt(line) {
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = `${line.strokeColor}`
    gCtx.fillStyle = `${line.fillColor}`
    gCtx.font = `${line.size}px Impact`

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
}

function onLineMoveHorizontal(moveVal) {
    setLinePosX(moveVal);

    renderCanvas();

    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
            renderFocusedLineRect();
        }
    })
}

function onLineMoveVertical(moveVal) {
    setLinePosY(moveVal);

    // render line with new pos:
    // drawLineTxt(gMeme.lines[0])
    // render canvas with img again, all lines with curr pos:
    renderCanvas();

    // render lines with new curr pos:
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
            renderFocusedLineRect();
        }
    })
}

function onFocusLine() {
    setSelectedLineIdx();
    setFocusedLine(true);
    renderCanvas();
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
        }
    })

    setTimeout(renderFocusedLineRect, 50)

    // var elInput = document.querySelector('input[name=textLine]')
    gElLineInput.value = getSelectedLine().txt;
    // setLineEdit(true);
    // renderLineLive(getfocusedLine().txt)
}

// function 

function renderFocusedLineRect() {
    if (!gMeme.lines.length) {
        return
    }
    var line = getSelectedLine();
    var pos = { ...line.pos };
    var textWidth = gCtx.measureText(line.txt).width;

    gCtx.beginPath();
    // gCtx.rect(50, 50, 250, 250)
    gCtx.rect(pos.x - 5, pos.y - gMeme.fontSize, textWidth + 10, gMeme.fontSize + 10);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
}

function renderCanvas() {
    // render fresh canvas:
    var meme = getMeme();
    var selectedImgId = meme.selectedImgId;

    var memeImg = new Image();
    memeImg.src = gImgs[selectedImgId].url;
    // memeImg.src = `./img/meme-imgs(square)/${selectedImgId}.jpg`;
    // gCtx.drawImage(memeImg, 0, 0);
    // memeImg.width = 500;
    // memeImg.height = 500;
    memeImg.onload = function () {
        // gElCanvas.height = (this.height * gElCanvas.width) / this.width
        // gElCanvas.width = (this.height * gElCanvas.height) / this.width
        gElCanvas.width = this.naturalWidth
        gElCanvas.height = this.naturalHeight
        gCtx.drawImage(this, 0, 0);
    }
}

function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Your-Meme'
    // saveToStorage('img', data);
}

function saveMeme() {
    // const data = gElCanvas.toDataURL();
    // saveToStorage('memes', data);
    console.log('saveMeme() isnt established yet');
    // render save image from local storage:
    // var elRenderSavedCanvas = document.querySelector('.render-saved');
    // var elCtx = elRenderSavedCanvas.getContext('2d')
    // var dataURL = loadFromStorage('memes')
    // var img = new Image;
    // img.src = dataURL;
    // img.onload = function () {
    //     elCtx.drawImage(img, 0, 0);
    // };
}


function renderFocusedLine(elInput) {
    // if (getSelectedLineIdx === -1) setSelectedLineIdx(-1)
    if (elInput.value.length < getSelectedLine().txt.length) {
        renderCanvas();
    }

    getSelectedLine().txt = elInput.value;

    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
        }
    })
    renderCanvas();
    setTimeout(renderFocusedLineRect,)
}

function renderLineLive(elInput) {
    if (gMeme.isFocusedLineOn === true) {
        console.log('first if');
        renderFocusedLine(elInput)
        return
    }
    if (elInput.value.length === 1 && !gMeme.isLineEditOn) {
        console.log('second if');
        createLine(elInput.value);
        setLineEdit(true);
        drawLineTxt(gMeme.lines[gMeme.lines.length - 1]);
        // drawLineTxt(gMeme.lines[getSelectedLineIdx()]);
    }
    if (elInput.value.length < gMeme.lines[gMeme.lines.length - 1].txt.length) {
        console.log('third if');
        renderCanvas();
    }
    if (elInput.value.length < gMeme.lines[gMeme.lines.length - 1].txt.length && !elInput.value.length) {
        console.log('fourth if');
        // setLineEdit(false);
        // gMeme.lines.pop();
        console.log('BUG not fixed yet - when deleting everything, need to reload again to make things work.');
    }
    console.log('after ifs');
    gMeme.lines[gMeme.lines.length - 1].txt = elInput.value;
    // gMeme.lines[gMeme.lines.length - 1].txt = elInput.value;
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
        }
    }, 50)
}

function onDeleteLine() {
    deleteSelectedLine();
    gElLineInput.value = '';
    renderCanvas();
    setTimeout(() => {
        for (var i = 0; i < gMeme.lines.length; i++) {
            drawLineTxt(gMeme.lines[i]);
        }
    })
}

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function shareImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg");
    document.querySelector('.share-btn').style.display = 'none';
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    let inputVal = elForm.querySelector('input').value
    doUploadImg(elForm, onSuccess, inputVal);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
    .then(function (res) {
        return res.text()
    })
    .then(onSuccess)
    .catch(function (err) {
        console.error(err)
    })
}

function searchByKeywords(elSearch, ev) {
    ev.preventDefault;
    elSearch.querySelector('input').value = '';
    console.log('searchByKeywords() isnt established yet');
}

function onSetStrokeColor() {   
    console.log('onSetStrokeColor() isnt established yet');
}

function onSetFillColor() { 
    console.log('onSetFillColor() isnt established yet');
}

function onAlignLeft() {
    console.log('onAlignLeft() isnt established yet');
}

function onAlignCenter() {
    console.log('onAlignCenter() isnt established yet');
}

function onAlignRight() {
    console.log('onAlignRight() isnt established yet');
}