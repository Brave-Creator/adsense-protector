let clickCount = 0;
const MAX_CLICKS = 3;
const REDIRECT_URL = "https://ecrm.police.go.kr";

const WARNING_MESSAGE =
  "애드센스 연속 클릭 3회 클릭으로 무효트래픽 공격으로 간주하여 IP 추적을 진행합니다.\n악의적인 광고 클릭을 멈추시겠습니까? 계속 진행시 (사이버범죄 신고시스탬 ECRM)으로 연결됩니다.";

function isAdsenseAd(element) {
  if (!element) return false;
  const tagName = element.tagName;
  const src = element.src || "";
  const dataAdClient = element.getAttribute?.("data-ad-client") || "";
  return (
    (tagName === "IFRAME" && src.includes("google")) ||
    (tagName === "INS" && dataAdClient.includes("pub-"))
  );
}

function addClickCount() {
  let storedCount = parseInt(localStorage.getItem("adsenseClickCount") || "0");
  if (storedCount < MAX_CLICKS) {
    storedCount++;
    localStorage.setItem("adsenseClickCount", storedCount.toString());
  }

  if (storedCount >= MAX_CLICKS) {
    const confirmed = confirm(WARNING_MESSAGE);
    if (!confirmed) {
      localStorage.setItem("adsenseClickCount", "0");
      window.location.href = REDIRECT_URL;
    }
  }
}

document.addEventListener("click", () => {
  const active = document.activeElement;
  if (isAdsenseAd(active)) {
    addClickCount();
  }
});
