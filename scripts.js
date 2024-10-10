window.addEventListener ? 
window.addEventListener("load", initialize, false) : 
window.attachEvent && window.attachEvent("onload", initialize);

function initialize(){
    setTimeout(() => {
        launchAvatars();
    }, 4000);

    async function triggerAudio() {
        try {
            var audio = new Audio("https://b.mokaly.com/audios/matrix_room_enter.mp3");
            await audio.play();
            console.log("Áudio tocando");
        } catch (err) {
            console.error("Erro ao tentar tocar o áudio:", err);
        }
        renderButton();
    }

    function renderButton() {
        if (document.getElementById('button') == null) {
            let div = document.createElement('div');
            div.classList.add('button');
            div.setAttribute('id', 'button');
            let button = document.createElement('button');
            let text = document.createTextNode('Repetir animação');
            button.appendChild(text);
            div.appendChild(button);
            document.querySelector(".main").appendChild(div);

            document.getElementById('button').addEventListener('click', launchAvatars);
        } else {
            document.getElementById('button').classList.remove('hide');
            document.getElementById('button').classList.add('show');
        }
    }

    function launchAvatars() {
        const button = document.querySelector('#button');
        if (button) {
            button.classList.add('hide');
        }

        const avatars = document.querySelectorAll('.avatar-svg');
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

            const randomPosition = (Math.random() * 80) + "vw";
            avatars[currentAvatar].style.left = randomPosition;
            avatars[currentAvatar].classList.add('active', 'fly-in');

            currentAvatar--;
        }, 2000);
    }
}
