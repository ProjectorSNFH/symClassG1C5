// 이미 로그인된 세션이면 대시보드로 이동
fetch("https://symclassnodeserver.onrender.com/me", {
  method: "GET",
  credentials: "include"
})
.then(res => res.json())
.then(data => {
  if (data.loggedIn) {
    // 이미 로그인 상태이므로 바로 대시보드로 이동
    location.href = "DashBoard.html";
  }
})
.catch(err => {
  console.error("세션 확인 실패", err);
});

document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://symclassnodeserver.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 세션 유지를 위한 설정
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        if (response.status === 403) {
          loginBlock(); // 중복 로그인 차단
        } else if (response.status === 401) {
          loginWrong(); // 아이디/비번 틀림
        } else {
          loginFail(); // 기타 에러
        }
        return;
      }

      const data = await response.json();

      // 로그인 성공 시 사용자 정보 저장
      sessionStorage.setItem("userName", data.name);
      sessionStorage.setItem("userNumber", data.number);
      sessionStorage.setItem("userRole", data.role);
      sessionStorage.setItem("userId", username);

      // 메인 페이지로 이동
      location.href = "DashBoard.html";
    } catch (error) {
      console.error("Login error:", error);
      loginFail(); // 서버 연결 실패
    }
  });