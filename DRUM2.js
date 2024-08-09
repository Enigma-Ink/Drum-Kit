document.addEventListener('DOMContentLoaded', () => {
    const drumPads = document.querySelectorAll('.drum-pad');
    const volumeControl = document.getElementById('volume');
    let isRecording = false;
    let recordedSounds = [];
    let startTime = null;

    const sounds = {
        kick: new Audio('sounds/kick.mp3'),
        snare: new Audio('sounds/snare.mp3'),
        hihat: new Audio('sounds/hihat.mp3'),
        
    };

    const playSound = (sound) => {
        sounds[sound].volume = volumeControl.value;
        sounds[sound].currentTime = 0;
        sounds[sound].play();
    };

    drumPads.forEach(pad => {
        pad.addEventListener('click', () => {
            const sound = pad.getAttribute('data-sound');
            playSound(sound);

            if (isRecording) {
                const currentTime = new Date().getTime() - startTime;
                recordedSounds.push({ sound, time: currentTime });
            }
        });
    });

    document.getElementById('recordBtn').addEventListener('click', () => {
        if (isRecording) {
            isRecording = false;
            document.getElementById('recordBtn').textContent = 'Record';
        } else {
            isRecording = true;
            recordedSounds = [];
            startTime = new Date().getTime();
            document.getElementById('recordBtn').textContent = 'Stop Recording';
        }
    });

    document.getElementById('playBtn').addEventListener('click', () => {
        if (recordedSounds.length > 0) {
            let playbackStart = new Date().getTime();
            recordedSounds.forEach(recordedSound => {
                setTimeout(() => {
                    playSound(recordedSound.sound);
                }, recordedSound.time);
            });
        }
    });
});