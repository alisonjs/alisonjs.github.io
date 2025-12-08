function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}


window.onload = () => {
    const savedName = getCookie("rubrumastra_player");


    const nameInput = document.getElementById("player-name");
    const savedNameText = document.getElementById("saved-name");
    const startBtn = document.getElementById("start-btn");
    const continueBtn = document.getElementById("continue-btn");


    if (savedName) {
        savedNameText.textContent = `Bem-vindo novamente, ${savedName}!`;
        nameInput.classList.add("hidden");
        startBtn.classList.add("hidden");
        continueBtn.classList.remove("hidden");
    }


    startBtn.onclick = () => {
        const player = nameInput.value.trim();
        if (!player) return alert("Digite seu nome!");


        setCookie("rubrumastra_player", player, 365);
        window.location.href = "crossword.html";
    };


    continueBtn.onclick = () => {
        window.location.href = "crossword.html";
    };
};