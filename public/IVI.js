window.onresize = () =>{
    document.querySelector('span').textContent = window.innerWidth;
}

window.onload = () =>{
    document.querySelector('span').textContent = window.innerWidth;
}

document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io();
    const video = document.getElementById('backgroundVideo');
    const turnLeftBtn = document.getElementById('turnLeftBtn');

    let isDragging = false;
    let startX;
    let startTime;
    let playbackRate = 2.0;
    let gradualReductionInterval;

    // Function to calculate drag speed and adjust video playback speed
    const calculateSpeed = (startX, endX, startTime, endTime) => {
        const distance = Math.abs(endX - startX);
        const time = endTime - startTime;
        const speed = distance / time;
        return speed;
    };

    const graduallyReduceSpeed = () => {
        clearInterval(gradualReductionInterval);
        gradualReductionInterval = setInterval(() => {
            if (playbackRate > 1) {
                playbackRate -= 0.7;
                video.playbackRate = playbackRate;
            } else {
                video.pause();
                clearInterval(gradualReductionInterval);
            }
        }, 20); // Reduce playback rate every 100ms
    };

    const startDrag = (clientX) => {
        isDragging = true;
        startX = clientX;
        startTime = Date.now();
        clearInterval(gradualReductionInterval); // Stop gradual reduction when starting to drag
    };

    const moveDrag = (clientX) => {
        if (isDragging) {
            const currentX = clientX;
            const currentTime = Date.now();
            const speed = calculateSpeed(startX, currentX, startTime, currentTime);
            playbackRate = Math.min(4.0, Math.max(0.5, speed)); // Limit playback rate between 0.5x and 4x
            video.playbackRate = playbackRate;
            video.play();
        }
    };

    const stopDrag = () => {
        isDragging = false;
        graduallyReduceSpeed();
    };

    document.addEventListener('mousedown', (e) => startDrag(e.clientX));
    document.addEventListener('mousemove', (e) => moveDrag(e.clientX));
    document.addEventListener('mouseup', stopDrag);

    document.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX));
    document.addEventListener('touchmove', (e) => moveDrag(e.touches[0].clientX));
    document.addEventListener('touchend', stopDrag);

    // Event listeners for button press (mouse and touch)
    turnLeftBtn.addEventListener('mousedown', () => {
        video.playbackRate = 1.0; // Set playback rate to normal speed when pressing the button
        video.play();
    });

    turnLeftBtn.addEventListener('mouseup', () => {
        video.pause();
    });

    turnLeftBtn.addEventListener('mouseleave', () => {
        video.pause();
    });

    turnLeftBtn.addEventListener('touchstart', () => {
        video.playbackRate = 1.0; // Set playback rate to normal speed when pressing the button
        video.play();
    });

    turnLeftBtn.addEventListener('touchend', () => {
        video.pause();
    });

    socket.on('video control', (action) => {
        if (action === 'play') {
            video.playbackRate = 2.0;
            video.play();
        } else if (action === 'pause') {
            video.pause();
        }
    });
});
