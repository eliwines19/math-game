// click on the start/reset
window.addEventListener('load', (e) => {
    const startReset = document.querySelector("div#start-reset");

    const playing = () => {
        if(startReset.innerText === "Start Game"){
            return true
        }
        return false
    }

    const setScoreToZero = () => {
        const scoreValue = document.getElementById('score-value');
        scoreValue.innerText = "0"
    }

    const changeStartResetButton = (btn) => {
        if(btn.innerText === "Start game"){
            btn.innerText = "Reset"
        } else {
            btn.innerText = "Start game"
        }
    }

    startReset.addEventListener("click", () => {
        // if we are playing
        if(playing()){
            // reload page
            console.log('game ended')
            location.reload()
        } else if (!playing()){
            console.log('game started')
            // set score to 0
            setScoreToZero();
            // change button to reset
            changeStartResetButton(startReset);
            // generate Q&A
            // show countdown
            // reduce time by 1 every second
            // check if there is time left
                //yes-continue
                //no-game over
        }
    })
})
    // if we are not playing
        // set score to 0
        // change button to reset
        // generate Q&A
        // show countdown
        // reduce time by 1 every second
        // check if there is time left
            //yes-continue
            //no-game over
        

// click on answer box
    // if playing
        // check if answer is correct
            //yes- 
                // increase score by one
                // generate new Q&A
                // show correct box
            //no-
                //generate try again box