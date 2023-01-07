console.log(window.top,' ------------------');
var div = document.createElement('button');
div.innerHTML = '点我啊';
div.style.cssText = 'position: fixed;top: 0; left: 0; z-index: 1000000000';
document.body.appendChild(div);
div.onclick = function () {
    var frame = document.getElementById('gameframe');
    if (frame) {
        const newFrame = document.createElement('iframe');
        newFrame.allow = frame.allow;
        newFrame.src = frame.src;
        newFrame.id = frame.id;
        document.body.appendChild(newFrame);
        document.body.removeChild(frame);
    }
   
}