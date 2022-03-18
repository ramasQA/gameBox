let $start = document.querySelector("#start");
let $game = document.querySelector("#game");
let $time = document.querySelector("#time");
let $result = document.querySelector("#result");
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $gameTime = document.querySelector('#game-time')

$start.addEventListener("click", startGame);  //события мышли
$game.addEventListener("click", handleBoxClick);
$gameTime.addEventListener('input', setGameTime)  //события вводa
let score = 0;
let isGameStarted = false;

function show($el) {
  $el.classList.remove('hide')
}

function hide($el) {
  $el.classList.add('hide')
}

function startGame() {
  score = 0
  $gameTime.setAttribute('disabled', 'true')
  setGameTime()

  isGameStarted = true;
  $game.style.backgroundColor = "#F5DEB3";
  hide($start) //скрыть кнопку начать .hide in style.css

  let interval = setInterval(function () {
    let time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
      // end game
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}
function setGameScore() {
  $result.textContent = score.toString()
}

function setGameTime() {
  let time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)//скрывать таймер
  hide($resultHeader) // показывать результат
}

function endGame() {
  isGameStarted = false;
  setGameScore()
  $gameTime.removeAttribute('disabled')
  $start.classList.remove('hide')
  $game.innerHTML = '' // clear class
  $game.style.backgroundColor = '#ccc'
  hide($timeHeader) //.classList.add ('hide')  //скрывать таймер
  show($resultHeader) //.classList.remove('hide') // показывать результат
}
function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }
  if (event.target.dataset.box) {
    score++;
    renderBox();

  }
}
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 9)];
  }
  return color;
}

function renderBox() {
  $game.innerHTML = ""; //очистка класса .game, после нажатия на box
  let box = document.createElement("div");
  let boxSize = getRandom(20, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = getRandomColor()
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", true);

  $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
