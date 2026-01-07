function startTest() {
  const speedEl = document.getElementById("speed");
  speedEl.textContent = "Testing...";

  const startTime = new Date().getTime();
  const image = new Image();
  const cacheBuster = "?nnn=" + Math.random();
  const testUrl = "https://speed.hetzner.de/10MB.bin" + cacheBuster;

  let downloadedBytes = 0;

  fetch(testUrl).then(response => {
    const reader = response.body.getReader();
    return new ReadableStream({
      start(controller) {
        function push() {
          reader.read().then(({done, value}) => {
            if (done) {
              controller.close();
              return;
            }
            downloadedBytes += value.length;
            push();
          });
        }
        push();
      }
    });
  }).then(() => {
    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;
    const bitsLoaded = downloadedBytes * 8;
    const speedMbps = (bitsLoaded / duration) / (1024 * 1024);
    const result = speedMbps.toFixed(2) + " Mbps";

    speedEl.textContent = result;
    saveHistory(result);
  }).catch(() => {
    speedEl.textContent = "Error";
  });
}

function saveHistory(value) {
  let history = JSON.parse(localStorage.getItem("netxHistory")) || [];
  history.unshift(value);
  if (history.length > 5) history.pop();
  localStorage.setItem("netxHistory", JSON.stringify(history));
  showHistory();
}

function showHistory() {
  let history = JSON.parse(localStorage.getItem("netxHistory")) || [];
  let list = document.getElementById("history");
  list.innerHTML = "";
  history.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

showHistory();
