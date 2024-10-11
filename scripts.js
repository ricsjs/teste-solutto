window.addEventListener ? 
window.addEventListener("load", initialize, false) : 
window.attachEvent && window.attachEvent("onload", initialize);

function initialize(){
    setTimeout(() => {
        launchAvatars();
    }, 4000);

    async function triggerAudio() {
        try {
            const audio = new Audio("https://b.mokaly.com/audios/matrix_room_enter.mp3");
            await audio.play();
            console.log("Áudio tocando");
        } catch (err) {
            console.error("Erro ao tentar tocar o áudio:", err);
        }
        renderButton();
    }

    function renderButton() {
        const buttonDiv = document.getElementById('button');
        
        if (buttonDiv) {
            buttonDiv.classList.remove('hide');
            buttonDiv.classList.add('show');
            buttonDiv.querySelector('button').addEventListener('click', launchAvatars);
        }
    }    

    function launchAvatars() {
        const button = document.querySelector('#button');
        if (button) {
            button.classList.add('hide');
        }

        const avatars = document.querySelectorAll('.avatar-cup');

        let currentAvatar = avatars.length - 1;

        const animateInterval = setInterval(() => {
            if (currentAvatar < 0) {
                clearInterval(animateInterval);
                avatars[0].classList.remove('active', 'fly-in');
                triggerAudio();
                return;
            }

            if (currentAvatar < avatars.length - 1) {
                avatars[currentAvatar + 1].classList.remove('active');
            }

            const randomPosition = (Math.random() * 90) + "vw";
            avatars[currentAvatar].style.left = randomPosition;
            avatars[currentAvatar].classList.add('active', 'fly-in');

            currentAvatar--;
        }, 2000);
    }
}