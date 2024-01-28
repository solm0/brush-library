let sketch1 = function(p) {
    let img1;
    let img2;
    let img3;
    let imgFunctions = {};
    let currentImgFunction = null;
    // let drawImage = false;
    // console.log(drawImage);

    p.preload = function() {
        img1 = p.loadImage('./img/img1.png');
        img2 = p.loadImage('./img/img2.png');
        img3 = p.loadImage('./img/img3.png');
    }
    p.setup = function() {
        imgFunctions = {
            img1: img1,
            img2: img2,
            img3: img3,
        }
        button1.mouseOver(() => {
            p.setImgFunction('img1');
        });
        button2.mouseOver(() => {
            p.setImgFunction('img2');
        });
        button3_1.mouseOver(() => {
            p.setImgFunction('img3');
        });
        button3_2.mouseOver(() => {
            p.setImgFunction('img3');
        });
        button3_3.mouseOver(() => {
            p.setImgFunction('img3');
        });
    }

    p.setImgFunction = function(imgName) {
        currentImgFunction = imgFunctions[imgName];
    }

    p.draw = function() {
        if (currentImgFunction) {


        imageMode(CENTER);
        let aspectRatio = currentImgFunction.width / currentImgFunction.height;
        let imgWidth = 150;
        let imgHeight = imgWidth / aspectRatio;
        
        image(currentImgFunction, width/2, 200, imgWidth, imgHeight);
    }
    }
}
// new p5(sketch1);