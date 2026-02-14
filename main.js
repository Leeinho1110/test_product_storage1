const LOTTO_MIN = 1;
const LOTTO_MAX = 45;
const LOTTO_SIZE = 6;

const countInput = document.getElementById("count");
const drawButton = document.getElementById("draw-button");
const resultList = document.getElementById("result-list");

function drawLottoNumbers() {
  const pool = Array.from({ length: LOTTO_MAX - LOTTO_MIN + 1 }, (_, idx) => idx + LOTTO_MIN);

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool
    .slice(0, LOTTO_SIZE)
    .sort((a, b) => a - b)
    .map((num) => String(num).padStart(2, "0"));
}

function clearResults() {
  resultList.innerHTML = "";
}

function renderError(message) {
  clearResults();
  const li = document.createElement("li");
  li.className = "error";
  li.textContent = message;
  resultList.appendChild(li);
}

function renderResults(count) {
  clearResults();

  for (let setIndex = 1; setIndex <= count; setIndex += 1) {
    const numbers = drawLottoNumbers();
    const li = document.createElement("li");
    li.textContent = `${setIndex}회차: ${numbers.join(" ")}`;
    resultList.appendChild(li);
  }
}

function onDrawClick() {
  const count = Number.parseInt(countInput.value, 10);

  if (!Number.isInteger(count) || count < 1) {
    renderError("생성 세트 수는 1 이상의 정수여야 합니다.");
    return;
  }

  renderResults(count);
}

drawButton.addEventListener("click", onDrawClick);
renderResults(1);