initialise();

function getCurrentlySetWaxAddress() {
    let waxAddress = localStorage.getItem('waxAddress')
    if (waxAddress) {
        document.getElementById('waxAddressDisplay').innerText = 'Your WAX address is set to ' + waxAddress
    }
}

function setCurrentWaxAddress() {
    let waxAddress = document.getElementById('waxAddress').value;
    console.log(waxAddress);
    localStorage.setItem('waxAddress', waxAddress);
    getCurrentlySetWaxAddress();
}

function getTimeUntilNextMine() {
    let timeUntilNextMineString = localStorage.getItem('nextMineTime');
    let timeUntilNextMine = new Date(timeUntilNextMineString);
    if(timeUntilNextMine > new Date()){
    document.getElementById('nextMine').innerText = timeUntilNextMine.toLocaleTimeString();
    }
    else{
        document.getElementById('nextMine').innerText = "NOW";
    }
}

function toggleShowAlerts() {
    let showAlertsToggle = document.getElementById('shouldShowAlertsToggle');
    if(showAlertsToggle.checked === true){
        localStorage.setItem('shouldShowAlerts','checked')
    }
    else{
        localStorage.setItem('shouldShowAlerts','unchecked')
    }
}

function changeSoundEffect() {
    let chimpRadio = document.getElementById('chimpRadio').checked;
    let alienRadio = document.getElementById('alienRadio').checked;

    if(chimpRadio){
        localStorage.setItem('sound', 'monkey');
        let monkeyAudio = new Audio('./chimp.mp3');
        monkeyAudio.play();
    }
    else if(alienRadio){
        localStorage.setItem('sound', 'alien');
        let pingAudio = new Audio('./ping.mp3');
        pingAudio.play();
    }
    else{
        localStorage.setItem('sound', 'none');
    }
}

function initialise() {
    document.getElementById('changeWaxBtn').addEventListener('click', setCurrentWaxAddress)
    document.getElementById('shouldShowAlertsToggle').addEventListener('click', toggleShowAlerts)
    
    document.getElementById('chimpRadio').addEventListener('click', changeSoundEffect);
    document.getElementById('alienRadio').addEventListener('click', changeSoundEffect);
    document.getElementById('noneRadio').addEventListener('click', changeSoundEffect);

    getCurrentlySetWaxAddress();
    getTimeUntilNextMine();

    let showAlerts = localStorage.getItem('shouldShowAlerts');
    if(!showAlerts){
        localStorage.setItem('shouldShowAlerts','checked');
        showAlerts = 'checked';
    }
    document.getElementById('shouldShowAlertsToggle').checked = showAlerts === 'checked';
}