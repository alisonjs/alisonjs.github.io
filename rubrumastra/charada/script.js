// ===== script.js atualizado =====


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}


function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}


// --- CONFIGURAÇÃO DO CRONÔMETRO ---
const unlockTime = new Date("2024-12-11T08:00:00-03:00").getTime();


function updateCountdown() {
    const now = Date.now();
    const remaining = unlockTime - now;


    const countdownEl = document.getElementById("countdown");
    const startBtn = document.getElementById("start-btn");
    const nameInput = document.getElementById("player-name");


    if (remaining <= 0) {
        countdownEl.textContent = "A charada está liberada!";
        startBtn.disabled = false;
        nameInput.disabled = false;
        return;
    }


    const d = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const h = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((remaining % (1000 * 60)) / 1000);


    countdownEl.textContent = `Disponível em ${d}d ${h}h ${m}m ${s}s`;
}


window.onload = () => {
    const savedName = getCookie("rubrumastra_player");


    const nameInput = document.getElementById("player-name");
    const savedNameText = document.getElementById("saved-name");
    const startBtn = document.getElementById("start-btn");
    const continueBtn = document.getElementById("continue-btn");


    // Bloqueado até o cronômetro liberar
    startBtn.disabled = true;
    nameInput.disabled = true;
    setInterval(updateCountdown, 1000);
    updateCountdown();


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


    // Enter envia o formulário
    nameInput.addEventListener("keydown", e => {
        if (e.key === "Enter" && !startBtn.disabled) startBtn.click();
    });
};