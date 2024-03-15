let wasMuted = false;
const adSecondsRe =
  /\(\s?(?<remainingMinutes>\d+)\s{0,2}:\s{0,2}(?<remainingSeconds>\d+)\s?\)/;

const monitorForAds = async () => {
  const videoContainer = document.querySelector(".persistent-player");
  if (!videoContainer) {
    return;
  }
  const matches = adSecondsRe.test(videoContainer.innerText);
  if (matches && !wasMuted) {
    console.log("Ad is active on", window.location.href);
    await chrome.runtime.sendMessage({ type: "adIsActive" });
    wasMuted = true;
  } else if (!matches && wasMuted) {
    console.log("Ad is no longer active on", window.location.href);
    await chrome.runtime.sendMessage({ type: "adIsInactive" });
    wasMuted = false;
  }
};

window.addEventListener("load", () => {
  setInterval(monitorForAds, 100);
});
