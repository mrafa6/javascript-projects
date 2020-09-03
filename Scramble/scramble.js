const msg = document.querySelector('.msg');
const wordShow = document.querySelector('.word');
const guess = document.querySelector('input');
const btn = document.querySelector('#start');
const score = document.querySelector('.score');
const ansReveal = document.querySelector('#reveal');

let isPlaying = false;
let puzzleWord = undefined;
let wordsToShow = undefined;
let totalScore = 0;

//let wordCollection = ['decorate', 'blow',  'cart', 'enthusiastic', 'heap','lead','crayon','number','puffy','report','hospitable'];
let word2 = ["machine","spooky","relax","habitual","toad","mammoth","false","painstaking","destroy","compare",
"sulky","small","rhetorical","desk","enjoy","shade","shock","observe","defeated","record","yam","vacation","jellyfish",
"upset","lamp","damage","tail","hollow","careless","protest"];

const newWord = () => {
    let random = Math.floor(Math.random() * word2.length);
    return word2[random];
}

const scrambleWords = word => {
    let wordArr = word.split("");
    let returnWord = [];
    let count = wordArr.length;
    for(let i = 0;i<count; i++){
        //console.log(wordArr.join());
        let random = Math.floor(Math.random() * wordArr.length);
        //console.log(`value of i ${i} and ${random}`);
        returnWord.push(wordArr.splice(random, 1));
        //wordArr.splice(i, 1);
        //console.log(`return word ${returnWord.join()}`);

    }
    return returnWord.join("");

}

ansReveal.addEventListener('click',function () {
    wordShow.innerHTML = puzzleWord;
    msg.innerHTML = "Correct answer is"
    msg.style.color = "#26f526";
    ansReveal.style.display = "none";
    btn.innerHTML = 'Next word';
    isPlaying = false;
    guess.classList.toggle('hidden');
})

btn.addEventListener('click',function(){
    if(!isPlaying){
        guess.value = "";
        isPlaying = true;
        btn.innerHTML = 'Guess';
        guess.classList.toggle('hidden');
        msg.style.display = "none";
        puzzleWord = newWord();
        //console.log(puzzleWord);
        wordsToShow = scrambleWords(puzzleWord);
        wordShow.innerHTML = wordsToShow;
        
    }else{
        let ans = guess.value;
        //console.log(`guessed text ${ans} and puzzled word is ${puzzleWord}` );
        const result = a => {
            const r = a.localeCompare(puzzleWord, undefined, { sensitivity: 'base' });
            return r == 0 ?true:false;
        }
        //console.log(result(ans));
        msg.innerHTML = result(ans) ? "Right Answer" : "Try Again";
        
        if(result(ans)){
            ansReveal.style.display = "none";
            btn.innerHTML = 'Next word';
            isPlaying = false;
            msg.style.display = "block";
            msg.style.color = "#26f526";
            guess.classList.toggle('hidden');
            wordShow.innerHTML = ans;
            totalScore += ans.length;
            score.innerHTML = totalScore;
        }else{
            ansReveal.style.display = "block";
            wordShow.innerHTML = wordsToShow;
            msg.style.display = "block";
            msg.style.color = "#e8102be8";
            guess.value = "";
            btn.innerHTML = 'Try Again';
            totalScore -= ans.length;
            score.innerHTML = totalScore;
        }

    }
})