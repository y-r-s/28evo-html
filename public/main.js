window.onresize = () =>{
    document.querySelector('span').textContent = window.innerWidth;
}

window.onload = () =>{
    document.querySelector('span').textContent = window.innerWidth;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('backgroundVideo');
    const turnRightBtn = document.getElementById('turnRightBtn');

    turnRightBtn.addEventListener('mousedown', () => {
        video.play();
    });

    turnRightBtn.addEventListener('mouseup', () => {
        video.pause();
    });

    turnRightBtn.addEventListener('mouseleave', () => {
        video.pause();
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('backgroundVideo');
    const turnRightBtn = document.getElementById('leftBtn');

    leftBtn.addEventListener('mousedown', () => {
        video.play();
    });

    leftBtn.addEventListener('mouseup', () => {
        video.pause();
    });

    leftBtn.addEventListener('mouseleave', () => {
        video.pause();
    });
});