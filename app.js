const hiraganaArray = [
    'あ', 'い', 'う', 'え', 'お',
    'か', 'き', 'く', 'け', 'こ',
    'さ', 'し', 'す', 'せ', 'そ',
    'た', 'ち', 'つ', 'て', 'と',
    'な', 'に', 'ぬ', 'ね', 'の',
    'は', 'ひ', 'ふ', 'へ', 'ほ',
    'ま', 'み', 'む', 'め', 'も',
    'や',      'ゆ',      'よ',
    'ら', 'り', 'る', 'れ', 'ろ',
    'わ', 'ゐ',      'ゑ', 'を',
                        'ん',
    'が', 'ぎ', 'ぐ', 'げ', 'ご',
    'ざ', 'じ', 'ず', 'ぜ', 'ぞ',
    'だ', 'で', 'ど',
    'ば', 'び', 'ぶ', 'べ', 'ぼ',
    'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ',
]

const katakanaArray = [
    'ア', 'イ', 'ウ', 'エ', 'オ', 
    'カ', 'キ', 'ク', 'ケ', 'コ', 
    'サ', 'シ', 'ス', 'セ', 'ソ', 
    'タ', 'チ', 'ツ', 'テ', 'ト', 
    'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 
    'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 
    'マ', 'ミ', 'ム', 'メ', 'モ', 
    'ヤ',      'ユ',      'ヨ', 
    'ラ', 'リ', 'ル', 'レ', 'ロ', 
    'ワ', 'ヰ',      'ヱ', 'ヲ', 
                        'ン',
    'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 
    'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 
    'ダ', 'デ', 'ド', 
    'バ', 'ビ', 'ブ', 'ベ', 'ボ', 
    'パ', 'ピ', 'プ', 'ペ', 'ポ', 
 
    'ー'
]

const currentKana = katakanaArray;

Array.prototype.randomSyllabary = function(){
    return this[Math.floor(Math.random()*this.length)];
}


var quizArray, currentQuizItem, currentQuizItemIndex, results;

var startButton = document.querySelector('#start');

var resultsElement = document.querySelector('#results');

var answersElement = document.getElementById('answers');

startButton.addEventListener('click', () => {
    startQuiz(currentKana);
})



function startQuiz(currentKana) {
    getRidOfPreviousResults();

    passTrueIfYouWantToChangeElementClassToHide(startButton, true);

    passTrueIfYouWantToChangeElementClassToHide(resultsElement, true);

    passTrueIfYouWantToChangeElementClassToHide(answersElement, false);
    quizArray = getNewArrayThatContainsKanaThatCanBeUsedForTheQuiz(currentKana, 10);
    currentQuizItemIndex = 0;
    currentQuizItem = quizArray[currentQuizItemIndex];
    results = [];
    createKanaQuizCard(currentQuizItem);
    getAnswersArrayDisplayThemAndCheckForClickOnAnswerButtons(currentKana, currentQuizItem, results);
}

function finishQuiz() {

    startButton.textContent = 'RESTART';

    passTrueIfYouWantToChangeElementClassToHide(startButton, false);

    passTrueIfYouWantToChangeElementClassToHide(resultsElement, false);

    passTrueIfYouWantToChangeElementClassToHide(answersElement, true);

    var rightAnswers = 0;
    var totalAnswers = results.length;

    for(var i = 0; i < results.length; i++) {
        if(wanakana.toRomaji(results[i][1]) == results[i][0]) {
            rightAnswers++
        }
    }

    var myBar = document.createElement('div');
    myBar.id = 'myBar';
    myBar.textContent = `${(rightAnswers / totalAnswers) * 100}%`;
    myBar.style.width = `${(rightAnswers / totalAnswers) * 100}%`;

    var myProgess = document.createElement('div');
    myProgess.id = 'myProgress';
    
    myProgess.append(myBar);
    myProgess.style.gridArea = '1 / 1 / 2 / 3';


    resultsElement.append(myProgess);

    var yourAnswerText = document.createElement('p')
    var correctAnswerText = document.createElement('p')

    yourAnswerText.textContent = 'Your Answer:';
    correctAnswerText.textContent = 'Correct Answer:';

    yourAnswerText.className = 'resultText';
    correctAnswerText.className = 'resultText';

    correctAnswerText.style.gridArea = '2 / 1 / 3 / 2';
    yourAnswerText.style.gridArea = '2 / 2 / 3 / 3';

    resultsElement.append(correctAnswerText, yourAnswerText)

    for(var i = 0; i < results.length; i++) {

        var correctAnswer = document.createElement('p');
        correctAnswer.textContent = `${results[i][1]} =>  ${wanakana.toRomaji(results[i][1])}`;
        correctAnswer.className = 'theAnswer';
        var selectedAnswer = document.createElement('p');
        selectedAnswer.textContent = `${results[i][0]}`;

        if(wanakana.toRomaji(results[i][1]) == results[i][0]) {
            selectedAnswer.className = 'correct';
        } else {
            selectedAnswer.className = 'incorrect';

        }

        resultsElement.append(correctAnswer, selectedAnswer);

    }

    resetState();
}

function nextQuizItem(currentKana, currentQuizItem, results) {
    currentQuizItemIndex++;
    currentQuizItem = quizArray[currentQuizItemIndex];
    resetState();
    createKanaQuizCard(currentQuizItem);
    getAnswersArrayDisplayThemAndCheckForClickOnAnswerButtons(currentKana, currentQuizItem, results);
}

function resetState() {
    let answersElement = document.getElementById('answers');
    var quiz = document.getElementById('quiz');
    quiz.removeChild(quiz.lastChild);
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.lastChild);
    }
}

function getRidOfPreviousResults() {
    while(resultsElement.firstChild) {
        resultsElement.removeChild(resultsElement.lastChild);
    }
}

function getAnswersArrayDisplayThemAndCheckForClickOnAnswerButtons(currentKana, currentQuizItem, results) {
    getAnswersFromArrayAndDisplayThem(currentKana, currentQuizItem);
    pushAnswerAndSelectedAnswerToArray(currentKana, currentQuizItem, results)
}

function getAnswersFromArrayAndDisplayThem(currentKana, currentQuizItem) {
    var answerArray = getNewArrayThatContainsRomajiThatCanBeUsedForTheAnswers(currentKana, 3, currentQuizItem);

    console.log(answerArray);

    for(var i = 0; i < answerArray.length; i++) {
        let button = document.createElement('button');
        button.textContent = answerArray[i];
        button.id = 'btn';

        let answersElement = document.getElementById('answers');
        answersElement.append(button);
    }
}

function pushAnswerAndSelectedAnswerToArray(currentKana, quizItem, results) {
    var button = document.querySelectorAll('#btn');

    button.forEach(btn => {
        btn.addEventListener('click', (e) => {
                var newArr = [];
                newArr.push(e.target.textContent);
                newArr.push(quizItem);

                results.push(newArr);
                console.log(results);

            if(results.length < quizArray.length) {
                nextQuizItem(currentKana, quizItem, results)
            } else {
                finishQuiz();
            }
        })
    })
}

function createKanaQuizCard(quizItem) {
    console.log(quizItem);
    var quizCard = document.createElement('div');
    quizCard.append(quizItem);

    var quiz = document.getElementById('quiz');
    quiz.append(quizCard);
}

function getNewArrayThatContainsKanaThatCanBeUsedForTheQuiz(kanaArray, num) {
    var kanaArrayCopy = [...kanaArray];
    var newArr = [];
    for(var i = 0; i < num; i++) {
        var element = kanaArrayCopy.randomSyllabary();
        newArr.push(element);
        kanaArrayCopy.splice(kanaArrayCopy.indexOf(element), 1);
    }
    console.log(newArr);
    return newArr;
}

function getNewArrayThatContainsRomajiThatCanBeUsedForTheAnswers(kanaArray, num, kanaToExclude) {
    var kanaArrayCopy = [...kanaArray];
    kanaArrayCopy.splice(kanaArray.indexOf(kanaToExclude), 1);
    var newArr = [];
    for(var i = 0; i < num; i++) {
        var element = kanaArrayCopy.randomSyllabary();
        newArr.push(wanakana.toRomaji(element));
        kanaArrayCopy.splice(kanaArrayCopy.indexOf(element), 1);
    }
    newArr.splice(getRandomInt(num + 1), 0, wanakana.toRomaji(kanaToExclude));
    return newArr;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function passTrueIfYouWantToChangeElementClassToHide(element, bool) {
    if(bool) {
        element.classList.remove('visable');
        element.className = 'hide';
    } else {
        element.classList.remove('hide');
        element.className = 'visable';
    }
}