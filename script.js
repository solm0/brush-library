const cursor = document.getElementById('cursor');
        const cursorText = document.getElementById('cursorText');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX - 50}px`;
            cursor.style.top = `${e.clientY - 50}px`;
            cursorText.style.left = `${e.clientX}px`;
            cursorText.style.top = `${e.clientY}px`;
        });
        document.addEventListener('mousedown', () => {
            cursorText.style.display = 'none';
        });
        document.addEventListener('mouseup', () => {
            cursorText.style.display = 'block';
        });

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
            button1: 'outline, outline with blur',
            button2: '9 random shapes, 3 line snap to grid',
            button3: 'fill the closed shape',
            button4: 'fill the closed shape (2)',
            button5: 'fill the closed shape (3)',
            button6: 'color circles',
        };


        




        function setup() {
            createCanvas(windowWidth, windowHeight);
            background(220);

            const parent = createDiv('');
            parent.addClass('parent');

            for (let i = 6; i >= 1; i--) {
                let buttonKey = 'button' + i;
                let brushValue = window['brush' + i];
                buttonFunctions[buttonKey] = brushValue;
                let buttonText = buttonTexts[buttonKey];

                
                let button = createButton(buttonText);
                button.position(random(100,windowWidth-200), random(100,windowHeight-200));
                parent.child(button);
                setBrushFunction(buttonKey);
                button.mousePressed(() => {
                    setBrushFunction(buttonKey);
                });

                button.mouseClicked(() => {
                    applyButtonStyle(button);
                })
            }

            //brush3, brush4, brush5
            fillColor = random([color(193,141,79,5),color(44,134,134, 5)]);
        }

        function applyButtonStyle(button) {
            if (currentButton) {
                // 이전 버튼이 있을 경우, 스타일 초기화
                currentButton.style('color', '');
                currentButton.style('background-color', '');
                currentButton.style('box-shadow', 'none');
            }
            // 현재 버튼에 스타일 적용
            button.style('color', 'white');
            button.style('background-color', 'blue');
            button.style('box-shadow', '0px 0px 10px 10px blue');
            // 현재 버튼을 기억
            currentButton = button;
        }

        function setBrushFunction(buttonName) {
            currentBrushFunction = buttonFunctions[buttonName];
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
                
                blendMode(BURN);
                beginShape();
                for (let pt of points1) {
                    vertex(pt.x, pt.y);
                }
                endShape(CLOSE);
            }

            if (mouseIsPressed === true) {
            
                blendMode(BLEND);
                stroke(225,225,216);
                strokeWeight(sW * 0.4);
                line(pmouseX, pmouseY, mouseX, mouseY);
                
                stroke('red');
                strokeWeight(sW * 0.1);
                line(pmouseX, pmouseY, mouseX, mouseY);
                    
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