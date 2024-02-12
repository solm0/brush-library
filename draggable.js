 const draggable = ($target) => {
            let isPress = false,
            prevPosX = 0,
            prevPosY = 0;

            $target.onmousedown = start;
            $target.onmouseup = end;
            window.onmousemove = move;

            function start(e) {
                prevPosX = e.clientX;
                prevPosY = e.clientY;
    
                isPress = true;
            }
            function move(e) {
                if (!isPress) {
                    return;
                }
    
                const posX = prevPosX - e.clientX;
                const posY = prevPosY - e.clientY;
    
                prevPosX = e.clientX;
                prevPosY = e.clientY;
    
                $target.style.left = `${$target.offsetLeft - posX}px`;
                $target.style.top = `${$target.offsetTop - posY}px`;
            }
            function end() {
                isPress = false;
            }
        }
        window.onload = () => {
            // 버튼을 선택하여 draggable 함수에 전달
            const $target = document.querySelector('.img-text-container');
            draggable($target);
            console.log($target);
        }