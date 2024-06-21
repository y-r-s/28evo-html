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
                playbackRate -= 1;
                video.playbackRate = playbackRate;
            } else {
                video.pause();
                clearInterval(gradualReductionInterval);
            }
        }, 20); // Reduce playback rate every 100ms
    };

    turnLeftBtn.addEventListener('mousedown', () => {
        video.playbackRate = 2.0;
        video.play();
    });

    turnLeftBtn.addEventListener('mouseup', () => {
        video.pause();
    });

    turnLeftBtn.addEventListener('mouseleave', () => {
        video.pause();
    });

    //Drag left
    document.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startTime = Date.now();
        clearInterval(gradualReductionInterval);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const currentX = e.clientX;
            const currentTime = Date.now();
            const speed = calculateSpeed(startX, currentX, startTime, currentTime);
            playbackRate = Math.min(10.0, Math.max(0.5, speed));
            video.playbackRate = playbackRate;

            if (startX - currentX > 0) { // Adjust the threshold as needed
                video.play();
            } else {
                video.pause();
            }
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        graduallyReduceSpeed();
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
