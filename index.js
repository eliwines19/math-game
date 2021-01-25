window.addEventListener('load', (e) => {

    // checks the text content of the start/reset button
    const playing = () => {
        if(startReset.innerText === "Start game"){
            return true
        } else {
            return false
        }
    }

    // sets the score to zero whenever the game has begun
    const setScoreToZero = () => {
        const scoreValue = document.getElementById('score-value');
        scoreValue.innerText = "0"
    }

    // changes the buttons inner text when the game is started
    const changeStartResetButton = () => {
        if(startReset.innerText === "Start game"){
            startReset.innerText = "Reset"
        } else if(startReset.innerText = "Reset"){
            startReset.innerText = "Start game"
        }
    }

    // generates the questions and answers
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

    // generates a new question with multiples up to 12
    const generateQuestion = () => {
        const qBox = document.getElementById('question');
        let n1 = Math.floor(Math.random() * 12) + 1;
        let n2 = Math.floor(Math.random() * 12) + 1;
        qBox.innerText = `${n1}x${n2}`
        generateAnswers(n1 * n2);
    }

    // shuffles the array of 1-4 to randomly choose which answer box contains the correct answer
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

    // generates the answers and randomly chooses which box holds the correct answer
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

    // adds the anser to the random box
    const addAnswerToRandomBox = (ans) => {
        let ansBoxNumber = String(Math.floor(Math.random() * 4) + 1);
        let ansBox = document.getElementById(`box${ansBoxNumber}`)
        ansBox.innerHTML = ans;
        ansBox.removeEventListener("click", wrongAnswerClicked);
        ansBox.addEventListener("click", rightAnswerClicked);
    }

    // triggers when the user clicks the wrong answer
    const wrongAnswerClicked = () => {
        flashWrongDiv()
    }

    // flashes the 'wrong' div to the user for 250ms
    const flashWrongDiv = () => {
        let tryAgainDiv = document.getElementById('wrong');
        tryAgainDiv.style.opacity = "100";
        tryAgainDiv.style.zIndex = "2";
        setTimeout(() => {
            tryAgainDiv.style.opacity = "0";
            tryAgainDiv.style.zIndex = "0";
        }, 250)
    }

    // triggered when the user clicks the right answer
    const rightAnswerClicked = () => {
        flashCorrectDiv();
        var score = document.getElementById('score-value');
        addOneToScore(score);
        setTimeout(generateQA, 250)
    }

    // adds a point to the users score
    const addOneToScore = (score) => {
        let newScore = parseInt(score.innerText, 10) + 1;
        score.innerText = newScore;
    }

    // flashes the 'correct' div to the user for 250ms
    const flashCorrectDiv = () => {
        let correctDiv = document.getElementById('correct');
        correctDiv.style.opacity = "100";
        correctDiv.style.zIndex = "2";
    }

    //displays the countdown and triggers the timer
    const startCountdown = () => {
        let timeDiv = document.getElementById('time-remaining');
        timeDiv.style.display = "block";
        timer();
    }

    // decreases the time left by one every second
    const timer = () => {
        let timeEl = document.getElementById('time-remaining-value');
        let time = parseInt(timeEl.innerText, 10);
        let interval = setInterval(() => {
            if(time === 0){
                clearInterval(interval);
                console.log('times up');
                showScore();
            } else {
                time -= 1;
                timeEl.innerText = time;
            }
        }, 1000)
    }

    // shows the users score after time runs out
    const showScore = () => {
        let scoreBoard = document.getElementById('game-over');
        scoreBoard.style.display = "block";
        let gameOverScore = document.getElementById('game-over-score');
        let score = document.getElementById('score-value');
        gameOverScore.innerText = score.innerText;
    }

    // triggers the game start when clicked
    const startReset = document.getElementById("start-reset");

    startReset.addEventListener("click", (e) => {
        if(!playing()){
            console.log('game ended')
            location.reload()
        } else {
            console.log('game started')
            setScoreToZero();
            changeStartResetButton();
            generateQA();
            startCountdown();
        }
    })

})