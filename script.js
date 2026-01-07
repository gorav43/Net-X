let historyList = document.getElementById("history");
let speedText = document.getElementById("speed");

function startTest() {
  speedText.innerText = "Testing...";
  
  let startTime = Date.now();
  let image = new Image();
  let fileSize = 5000000; // 5MB

  image.onload = function () {
    let endTime = Date.now();
    let duration = (endTime - startTime) / 1000;
    let speedMbps = ((fileSize * 8) / duration / 1024 / 1024).toFixed(2);

    speedText.innerText = speedMbps + " Mbps";
    addToHistory(speedMbps);
  };

  image.onerror = function () {
    speedText.innerText = "Error";
  };

  // Random image for download test
  image.src = "https://picsum.photos/2000/2000?rand=" + Math.random();
}

function addToHistory(speed) {
  let li = document.createElement("li");
  let time = new Date().toLocaleTimeString();
  li.innerText = time + " - " + speed + " Mbps";
  historyList.prepend(li);
}

function toggleTheme() {
  document.body.classList.toggle("light");
  document.body.classList.toggle("dark");
}
