// click on the start/reset
window.addEventListener('load', (e) => {
    const startReset = document.querySelector("div#start-reset");

    const playing = () => {
        if(startReset.innerText === "Start game"){
            return true
        } else {
            return false
        }
    }

    const setScoreToZero = () => {
        const scoreValue = document.getElementById('score-value');
        scoreValue.innerText = "0"
    }

    const changeStartResetButton = () => {
        if(startReset.innerText === "Start game"){
            startReset.innerText = "Reset"
        } else if(startReset.innerText = "Reset"){
            startReset.innerText = "Start game"
        }
    }

    const generateQA = () => {
        const correctDiv = document.getElementById('correct');
        if(correctDiv.style.display = "block"){
            correctDiv.style.opacity = "0";
            correctDiv.style.zIndex = "-1";
        }
        for(i=1;i<5;i++){
            let box = document.getElementById(`box${i}`);
            box.removeEventListener("click", wrongAnswerClicked);
            box.removeEventListener("click", rightAnswerClicked)
        }
        generateQuestion();
    }

    const generateQuestion = () => {
        const qBox = document.getElementById('question');
        let n1 = Math.floor(Math.random() * 12) + 1;
        let n2 = Math.floor(Math.random() * 12) + 1;
        qBox.innerText = `${n1}x${n2}`
        generateAnswers(n1 * n2);
    }

    const shuffle = (arr) => {
        var currentIndex = arr.length, temporaryValue, randomIndex;

        // while there remains elements to shuffle
        while(0 !== currentIndex) {
            // pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // swap it with a current element
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }

        return arr;
    }    

    const generateAnswers = (ans) => {
        let nums = [1,2,3,4];
        let shuffledNums = shuffle(nums);
        for(var i=0;i<shuffledNums.length;i++){
            let boxNumber = String(shuffledNums[i]);
            var box = document.getElementById(`box${boxNumber}`)
            var randomAnswerOption = Math.floor(Math.random() * ans + 10) + 1
            if(randomAnswerOption == ans){
                box.innerText = randomAnswerOption + 5;
            } else {
                box.innerText = randomAnswerOption;
            }
            box.addEventListener("click", wrongAnswerClicked)
        }
        addAnswerToRandomBox(ans);
    }

    const addAnswerToRandomBox = (ans) => {
        let ansBoxNumber = String(Math.floor(Math.random() * 4) + 1);
        let ansBox = document.getElementById(`box${ansBoxNumber}`)
        ansBox.innerHTML = ans;
        ansBox.removeEventListener("click", wrongAnswerClicked);
        ansBox.addEventListener("click", rightAnswerClicked);
    }

    const wrongAnswerClicked = () => {
        flashWrongDiv()
    }

    const flashWrongDiv = () => {
        let tryAgainDiv = document.getElementById('wrong');
        tryAgainDiv.style.opacity = "100";
        tryAgainDiv.style.zIndex = "2";
        setTimeout(() => {
            tryAgainDiv.style.opacity = "0";
            tryAgainDiv.style.zIndex = "0";
        }, 250)
    }

    const rightAnswerClicked = () => {
        flashCorrectDiv();
        var score = document.getElementById('score-value').innerText;
        var newScore = parseInt(score, 10) + 1;
        score.innerText = newScore.toString();
        setTimeout(generateQA, 250)
    }

    const flashCorrectDiv = () => {
        let correctDiv = document.getElementById('correct');
        correctDiv.style.opacity = "100";
        correctDiv.style.zIndex = "2";
    }

    startReset.addEventListener("click", (e) => {
        // if we are playing
        if(!playing()){
            // reload page
            console.log('game ended')
            location.reload()
        } else {
            console.log('game started')
            // set score to 0
            setScoreToZero();
            // change button to reset
            changeStartResetButton();
            // generate Q&A
            generateQA();
            // show countdown
            // reduce time by 1 every second
            // check if there is time left
                //yes-continue
                //no-game over
        }
    })
})
        

// click on answer box
    // if playing
        // check if answer is correct
            //yes- 
                // increase score by one
                // generate new Q&A
                // show correct box
            //no-
                //generate try again box