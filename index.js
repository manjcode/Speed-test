let speedEl = document.getElementById("speed-el");

function startSpeedTest() {
    speedEl.classList.remove("is-testing");
    // speedEl.classList.remove("is-result");
    speedEl.textContent = "Running test...";
    speedEl.classList.add("is-testing");
    console.log("button clicked");
    const speedTestUrl =
        "https://h3.speed.cloudflare.com/__down?bytes=10000000"; //10MB
    let startTime = performance.now();
    fetch(speedTestUrl)
        .then((response) => {
            console.log("response received");
            return response.blob();
        })
        .then((data) => {
            let endTime = performance.now();
            let durationInMs = endTime - startTime;
            let durationInSeconds = durationInMs / 1000;
            let internetSpeed =
                (data.size * 8) / durationInSeconds / (1024 * 1024);
            setTimeout(() => {
                speedEl.classList.remove("is-testing");
                // speedEl.classList.add("is-result");
                speedEl.style.borderRight = "none";
                console.log(`Your internet speed is ${internetSpeed} Mbps`);
                speedEl.textContent = `Your internet speed is ${internetSpeed.toFixed(2)} Mbps`;
            }, 2500);
        })
        .catch((error) => {
            speedEl.classList.remove("is-testing"); // Stop the loading animation
            speedEl.classList.remove("is-result"); // Just in case
            speedEl.style.borderRight = "none";
            speedEl.textContent = `Test failed.`;
            console.error("Error fetching files.", error);
        });
}
