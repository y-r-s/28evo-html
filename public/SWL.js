document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io();
    const rightBtn = document.getElementById('leftBtn');

    rightBtn.addEventListener('mousedown', () => {
        socket.emit('video control', 'play');
    });

    rightBtn.addEventListener('mouseup', () => {
        socket.emit('video control', 'pause');
    });

    rightBtn.addEventListener('mouseleave', () => {
        socket.emit('video control', 'pause');
    });
});
