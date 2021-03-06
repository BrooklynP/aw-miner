let lastNotifiedID = null;
function checkIfMineReady(timeToCheck) {
    setTimeout(() => {
        const shouldShowAlerts = localStorage.getItem('shouldShowAlerts');
        const shouldPingSound = localStorage.getItem('sound');

        if (shouldShowAlerts === 'checked' || shouldPingSound === 'alien' || shouldPingSound === 'monkey') {
            console.log("Checking if mine ready");
            const waxAddress = localStorage.getItem('waxAddress');
            if (waxAddress) {
                fetch('https://api.alienworlds.io/v1/alienworlds/mines?limit=1&miner=' + waxAddress)
                    .then(response => response.json())
                    .then(json => {
                        console.log(json);
                        const lastMineDate = new Date(json.results[0].block_timestamp);
                        const mineCooldownTime = json.results[0].params.delay;
                        const nowDate = new Date();
                        const nextMineDate = new Date(lastMineDate.getTime() + (mineCooldownTime * 1000));

                        localStorage.setItem('nextMineTime', nextMineDate);

                        if (nowDate > nextMineDate) {
                            console.log("mine ready");
                            if (JSON.stringify(lastMineDate) != JSON.stringify(lastNotifiedID)) {
                                lastNotifiedID = null;
                            }
                            if (lastNotifiedID === null) {
                                notifyUser();
                                lastNotifiedID = lastMineDate;
                            }
                            checkIfMineReady(1000);
                        }
                        else {
                            console.log("Mine not ready, ready at ", nextMineDate);
                            console.log("Checking again in ", nextMineDate - nowDate);
                            checkIfMineReady(nextMineDate - nowDate);
                        }
                    }).catch(error => { console.error(error) });
            }
            else {
                checkIfMineReady(10000);
            }
        }
        else {
            checkIfMineReady(1000)
        }
    }, timeToCheck);
}
checkIfMineReady(0);


function notifyUser(){
    const shouldShowAlerts = localStorage.getItem('shouldShowAlerts');
    const sound = localStorage.getItem('sound');

    console.log(sound);

    if(sound === 'alien'){
        let pingAudio = new Audio('./ping.mp3');
        pingAudio.play();
    }
    else if(shouldMonkeySound === 'monkey'){
        let monkeyAudio = new Audio('/chimp.mp3');
        monkeyAudio.play();
    }
    if(shouldShowAlerts === 'checked'){
        alert('Ready To Mine');
    }
}