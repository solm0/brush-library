let currentBrushFunction = null;

let allowDownload = true;
let allowRefresh = true;

let currentButton;

//brush2
const symmetry = 2;
const multip = 10;
let angle;
updateAngle();

//brush3, brush4, brush5
let drawing1 = false;
let drawing2 = false;
let drawing3 = false;
let points1 = [];
let points2 = [];
let points3 = [];
let fillColor;

const buttonFunctions = {};

const buttonTexts = {
    button1: 'symmetrical lines',
    button2: '3 x 3',
    button3: 'fill the closed shape',
    button4: 'memory',
    button5: 'evaporate',
    button6: 'color circles',
};

let img;
let text1;
let text2;
let text3;
let text4;
let imgTextContainer;

function refTexts(work, artist, description, link) {
    this.work = work;
    this.artist = artist;
    this.description = description;
    this.link = link;
}
const noref = new refTexts(
    'no reference :-)',
    '',
    '',
    '',
)
const ref1 = new refTexts(
    'The True Cross of the Lord, sheet 28',
    'Gennady Pavlov',
    'Paper, calligraphic ink, water-colours, sharp-pointed nib pen, brush, 31x31 cm, 2010',
    'http://calligraphy-expo.com/en/participants/Gennady_Pavlov',
);
const ref2 = new refTexts(
    'Bodoni Ornament',
    'Seongjin Kim',
    '-',
    'https://www.behance.net/gallery/14142121/Bodoni-Ornament',
);
const ref3 = new refTexts(
    'Синицын, П. Преображенское и окружающие его места, их прошлое и настоящее',
    'Михаила Васильевича Нестерова',
    '1895, 195pp, 31.5x24.1cm. In a publishers compound chromolithographed binding with gold and colorful embossing.',
    'https://www.litfund.ru/auction/106/94/',
);
const refTextsArray = [noref, ref1, ref2, ref3];

const buttonImgs = {
    button1: './img/img1.jpg',
    button2: './img/img2.jpg',
    button3: './img/img3.jpeg',
    button4: '',
    button5: '',
    button6: '',
}

let buttonKeys = [];



function setup() {
    const cnv = createCanvas(windowWidth-330, windowHeight-50);
    cnv.addClass('cnv');
    background(220);

    const parent = createDiv('');
    parent.addClass('parent');

    imgTextContainer = createDiv('');
    imgTextContainer.addClass('img-text-container');

    let svgs = selectAll('.container');
    console.log(svgs);
    svgs.forEach(svg => {
        let posX = random(0, windowWidth-220);
        let posY = random(0, windowHeight-500);
        svg.position(posX, posY);
    });

    const buttonSVGs = {
        button1: select('#svg1'),
        button2: select('#svg2'),
        button3: select('#svg3'),
        button4: select('#svg4'),
        button5: select('#svg5'),
        button6: select('#svg6'),
    }

    const innerbuttonSVGs = {
        button1: select('#inSvg1'),
        button2: select('#inSvg2'),
        button3: select('#inSvg3'),
        button4: select('#inSvg4'),
        button5: select('#inSvg5'),
        button6: select('#inSvg6'),
    }

    for (let i = 6; i >= 1; i--) {
        let buttonKey = 'button' + i;
        buttonKeys.push(buttonKey);
        let brushValue = window['brush' + i];
        buttonFunctions[buttonKey] = brushValue;
        let ref = refTextsArray[i] ? refTextsArray[i] : noref;

        
        let button = buttonSVGs[buttonKey];
        parent.child(button);

        let buttonText = createP(buttonTexts[buttonKey]);
        buttonText.parent(button);


        setBrushFunction(buttonKey);
        applyButtonStyle(innerbuttonSVGs[buttonKey]);
        applyReference(buttonKey, ref);
        
        button.mouseClicked(() => {
            console.log(buttonKey);
            setBrushFunction(buttonKey);
            applyButtonStyle(innerbuttonSVGs[buttonKey]);
            applyReference(buttonKey, ref);

            //brush3, brush4, brush5
            fillColor = random([color(193,141,79,5),color(44,134,134, 5)]);
        });
    }
}



function setBrushFunction(buttonKey) {
    currentBrushFunction = buttonFunctions[buttonKey];
}

function applyButtonStyle(path) {
    if (currentButton) {
        // 이전 버튼이 있을 경우, 스타일 초기화
        currentButton.style('fill', '');
        currentButton.style('stroke', '');
        currentButton.style('stroke-width', '');
    }
    // 현재 버튼에 스타일 적용
    path.style('fill', ' rgb(204,204,204)');
    path.style('stroke', 'blue');
    path.style('stroke-width', '2px');
    // 현재 버튼을 기억
    currentButton = path;
}

function applyReference(buttonKey, ref) {
    imgTextContainer.remove();
    imgTextContainer = createDiv();
    imgTextContainer.addClass('img-text-container');
    
    text1 = createP();
    text1.addClass('text');
    text1.style('text-indent', '0px');
    text1.html(ref.work + '<br>');

    img = createImg(buttonImgs[buttonKey]);
    
    text2 = createP();
    text2.addClass('text');
    text2.style('text-indent', '0px');
    text2.html(ref.artist + '<br>');

    text3 = createP();
    text3.addClass('text');
    text3.style('text-indent', '20px');
    text3.html(ref.description + '<br>');

    text4 = createP();
    text4.addClass('text');
    text4.style('text-indent', '20px');
    text4.html('<a href="' + ref.link + '"target="_blank">' + ref.link + '</a>');
    
    imgTextContainer.child(text1);
    imgTextContainer.child(img);
    imgTextContainer.child(text2);
    imgTextContainer.child(text3);
    imgTextContainer.child(text4);
    imgTextContainer.position(windowWidth-320, 0);
}




function draw() {
    if (currentBrushFunction) {
        currentBrushFunction();
    }
}

function refresh() {
    location.reload(true);
}
function keyPressed() {
    if (keyCode === 83 && allowDownload) {
        save('library.jpg');
        allowDownload = false;
    }
    else if (keyCode === 67 && allowRefresh) {
        refresh();
        allowRefresh = false;
    }
}
function keyReleased() {
    if (keyCode === 83) {
        allowDownload = true;
    }
    if (keyCode === 67) {
        allowRefresh = true;
    }
}

function brush1() {
    console.log('brush1');
    frameRate(60);
    blendMode(BLEND);

    let mx = (width/2-mouseX) + width / 2;
    let pmx = (width/2-pmouseX) + width / 2;

    if(mouseIsPressed === true) {
        px = pow(pmouseX-mouseX, 2);
        py = pow(pmouseY-mouseY, 2);
        
        stroke(113,37,5)
        strokeWeight(4 - sqrt(px+py));
        line(mx-2, mouseY+2, pmx-2, pmouseY+2);
        line(mx+2, mouseY-2, pmx+2, pmouseY-2);
        line(pmouseX-2,pmouseY-2,mouseX-2,mouseY-2);
        line(pmouseX+2,pmouseY+2,mouseX+2,mouseY+2);
        
        stroke(225,225,216);
        strokeWeight(4 - sqrt(px+py));
        line(mx, mouseY, pmx, pmouseY);
        line(pmouseX, pmouseY,mouseX,mouseY);
        drawingContext.shadowColor = color(193,141,79)
        drawingContext.shadowBlur = 32;
    }
}
function brush2() {
    console.log('brush2');
    frameRate(20);
    blendMode(BLEND);
    drawingContext.shadowBlur = 0;

    angleMode(DEGREES);
    rectMode(CENTER);
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    mx = snapToGrid(mx, multip);
    my = snapToGrid(my, multip);
    pmx = snapToGrid(pmx, multip);
    pmy = snapToGrid(pmy, multip);

    let v = random([8, 3]);
    let v2 = random([8, 3]);
    let s = random([circle,rect]);
    let s2 = random([circle,rect]);
    let c = random(['red', 'black', 'white']);
    let c2 = random(['red', 'black', 'white']);
    
    if (mouseIsPressed) {
        translate(width / 2, height / 2); //Translate to the centre
    
        stroke('black');
        strokeWeight(1);

        for (let i = 0; i < symmetry; i++) { //Repeat the process
        push(); //Save matrix
        rotate(i * angle); //Rotate
            line(pmx, pmy, mx, my);
            line(pmx -30, pmy -30, mx -30, my -30);
            line(pmx +30, pmy +30, mx +30, my +30);
                fill(c)
            s(mx-30, my-30, v);
            s(mx-30, my+30, v);
            s(mx-30, my, v);
            s(mx, my-30, v);
            s(mx, my+30, v);
            s(mx+30, my-30, v);
            s(mx+30, my+30, v);
            s(mx+30, my, v);
                fill(c2)
            s2(mx, my, v2);
        
        scale(-1, 1); //Flip the canvas
            line(pmx, pmy, mx, my);
            line(pmx -30, pmy -30, mx -30, my -30);
            line(pmx +30, pmy +30, mx +30, my +30);
                fill(c)
            s(mx-30, my-30, v);
            s(mx-30, my+30, v);
            s(mx-30, my, v);
            s(mx, my-30, v);
            s(mx, my+30, v);
            s(mx+30, my-30, v);
            s(mx+30, my+30, v);
            s(mx+30, my, v);
                fill(c2)
            s2(mx, my, v2);
        pop(); //Restore matrix
        }
    }
}

    function updateAngle() { //A function to update the angle
        angle = 360 / symmetry;
    }

    function snapToGrid(val, multiplier) { // A function that returns a value that is in an imaginary grid
        let num = 0;
        while (!(abs(val) - num <= multiplier)) {
            num += multiplier;
        }
        return num * Math.sign(val);
    }

function brush3() {
    console.log('brush3');
    frameRate(60);
    drawingContext.shadowBlur = 0;

    noFill();
    let sW = 25;
    strokeCap(SQUARE);
    

    if (mouseIsPressed === true) {
        
    stroke('red');
    strokeWeight(sW);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke(225,225,216);
    strokeWeight(sW * 0.8);
    line(pmouseX, pmouseY, mouseX, mouseY);

    stroke('black');
    strokeWeight(sW * 0.6);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke(225,225,216);
    strokeWeight(sW * 0.4);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke('red');
    strokeWeight(sW * 0.1);
    line(pmouseX, pmouseY, mouseX, mouseY);
    }

    beginShape();
    for (let pt of points1) {
        vertex(pt.x, pt.y);
    }
    endShape();

    if (drawing1 && points1.length > 1) {
        fill(fillColor);
        noStroke();
        
        blendMode(DIFFERENCE);
        beginShape();
        for (let pt of points1) {
            vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
    }

}

    
function brush4() {
    console.log('brush4');
    drawingContext.shadowBlur = 0;
    frameRate(60);

    noFill();
    let sW = 25;
    strokeCap(SQUARE);
    

    if (mouseIsPressed === true) {
        
    stroke('red');
    strokeWeight(sW);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke(225,225,216);
    strokeWeight(sW * 0.8);
    line(pmouseX, pmouseY, mouseX, mouseY);

    stroke('black');
    strokeWeight(sW * 0.6);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke(225,225,216);
    strokeWeight(sW * 0.4);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke('red');
    strokeWeight(sW * 0.1);
    line(pmouseX, pmouseY, mouseX, mouseY);
    }

    
    beginShape();
    for (let pt of points2) {
        vertex(pt.x, pt.y);
    }
    endShape();

    if (drawing2 && points2.length > 1) {
        fill(fillColor);
        noStroke();
        filter(DILATE);
        blendMode(DIFFERENCE);
        beginShape();
        for (let pt of points2) {
        vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
    }
}

function brush5() {
    console.log('brush5');
    drawingContext.shadowBlur = 0;
    frameRate(60);

    noFill();
    let sW = 25;
    strokeCap(SQUARE);
    

    if (mouseIsPressed === true) {
        
    stroke('red');
    strokeWeight(sW);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke(225,225,216);
    strokeWeight(sW * 0.8);
    line(pmouseX, pmouseY, mouseX, mouseY);

    stroke('black');
    strokeWeight(sW * 0.6);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke(225,225,216);
    strokeWeight(sW * 0.4);
    line(pmouseX, pmouseY, mouseX, mouseY);
    
    stroke('red');
    strokeWeight(sW * 0.1);
    line(pmouseX, pmouseY, mouseX, mouseY);
    }
    
    beginShape();
    for (let pt of points3) {
        vertex(pt.x, pt.y);
    }
    endShape();

    if (drawing3 && points3.length > 1) {
    
        fill(fillColor);
        noStroke();
        filter(DILATE);
        blendMode(DIFFERENCE);
        beginShape();
        for (let pt of points3) {
        vertex(pt.x, pt.y);
        }
        endShape(CLOSE);
    }
}

    //brush3, brush4, brush5
    function mousePressed() {
        drawing1 = true;
        points1 = [];

        drawing2 = true;

        drawing3 = true;
        points3 = [];
    }
    function mouseDragged() {
        if (drawing1) {
            points1.push(createVector(mouseX, mouseY));
        }
        if (drawing2) {
            points2.push(createVector(mouseX, mouseY));
        }
        if (drawing3) {
            points3.push(createVector(mouseX, mouseY));
        }
    }

function brush6() {
    console.log('brush6');
    frameRate(30);
    drawingContext.shadowBlur = 0;

    let sW = 500;
    strokeCap(ROUND);
    

    if (mouseIsPressed === true) {
        blendMode(DIFFERENCE);
        filter(BLUR, 1);

        stroke(random(['orange','red','yellow']));
        strokeWeight(random(-30,30));
        line(pmouseX, pmouseY, mouseX, mouseY);

        stroke(random(['lime','blue','pink']));
        strokeWeight(sW * 0.8);
        line(pmouseX, pmouseY, mouseX, mouseY);

        stroke(random(['orange','red','yellow']));
        strokeWeight(sW * 0.4);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}










// h1요소 단어별 호버 효과
const textContainer = document.getElementById('hover-text');
const words = textContainer.innerText.split(' ');

textContainer.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

const spans = document.querySelectorAll('#hover-text span');

spans.forEach(span => {
    span.addEventListener('mouseenter', () => {
        span.style.color = 'blue'; // 호버 시 적용될 스타일
        span.style.transition = 'color 0.5s linear';
    });

    span.addEventListener('mouseleave', () => {
        span.style.color = ''; // 호버 해제 시 스타일 초기화
    });
});


// 마우스커서
const cursor = document.getElementById('cursor');
const cursorText = document.getElementById('cursorText');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX - Math.sqrt(5000)}px`;
    cursor.style.top = `${e.clientY - Math.sqrt(5000)}px`;
    cursorText.style.left = `${e.clientX - Math.sqrt(5000)}px`;
    cursorText.style.top = `${e.clientY - Math.sqrt(5000)}px`;
});
document.addEventListener('mousedown', () => {
    cursorText.style.display = 'none';
});
document.addEventListener('mouseup', () => {
    cursorText.style.display = 'block';
});