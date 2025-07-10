const SERVER_URL = "https://symclassnodeserver.onrender.com";

async function verifyLogin() {
  const res = await fetch(`${SERVER_URL}/check-session`, {
    credentials: "include"
  });
  const data = await res.json();

  if (!data.loggedIn) {
    alert("로그인 세션이 만료되었습니다.");
    location.href = "index.html";
  } else {
    // 세션 유지됨 → 사용자 정보 필요 시 사용
    window.userRole = data.role;
    window.userName = data.name;
    window.userNumber = data.number;

    document.getElementById("userButton").textContent = `${data.number}번 ${data.name} ▾`;
  }
}

document.addEventListener("DOMContentLoaded", verifyLogin);

document.querySelector("#userMenu a").addEventListener("click", async () => {
  await fetch(`${SERVER_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });
  location.href = "index.html";
});