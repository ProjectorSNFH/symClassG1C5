//script.js

(async () => {
  try {
    const res = await fetch("https://symclassnodeserver.onrender.com/me", {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();

    if (!data.loggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      // 서버 로그아웃 호출 (세션 파괴)
      await fetch("https://symclassnodeserver.onrender.com/logout", {
        method: "POST",
        credentials: "include"
      });
      location.href = "index.html";
      return;
    } else {
      //로그인 성공시 로딩
    }

    const userRole = data.user.role || "";
    const path = location.pathname;
    const adminLink = document.getElementById('adminLink');
    const userInfo = document.getElementById('userInfo');
    userInfo.textContent = `${data.user.number}번 ${data.user.name} ▾`;

    if (userRole !== "NAS" && userRole !== "") {
      adminLink.style.display = "block";
    }

    // adminpanel.html 접근 제한
    if (path.includes("adminpanel")) {
      if (userRole === "NAS") {
        alert("이 페이지를 이용할 수 없는 권한입니다.. 대시보드로 이동합니다.");
        location.href = "DashBoard.html";
      } else if (!["ADM", "DTM_A", "DTM_I", "DTM_O", "BDM"].includes(userRole)) {
        alert("로그인이 필요한 서비스입니다.");
        location.href = "index.html";
      }
      return;
    }

    console.log(userRole);

    // manage_ 페이지 접근 제한
    if (path.includes("manage_")) {
      if (path.includes("manage_audio") && userRole !== "DTM_A" && userRole !== "ADM") {
        location.href = userRole === "NAS" ? "DashBoard.html" : "index.html";
        return;
      }
      if (path.includes("manage_image") && userRole !== "DTM_I" && userRole !== "ADM") {
        location.href = userRole === "NAS" ? "DashBoard.html" : "index.html";
        return;
      }
      if (path.includes("manage_other") && userRole !== "DTM_O" && userRole !== "ADM") {
        location.href = userRole === "NAS" ? "DashBoard.html" : "index.html";
        return;
      }
      if (path.includes("manage_bdm") && !["BDM", "ADM"].includes(userRole)) {
        location.href = userRole === "NAS" ? "DashBoard.html" : "index.html";
        return;
      }
    }

    // 로그아웃 링크 처리
    const logoutLink = document.querySelector("a[href='logout']");
    if (logoutLink) {
      logoutLink.addEventListener("click", async (e) => {
        e.preventDefault();
        await fetch("https://symclassnodeserver.onrender.com/logout", {
          method: "POST",
          credentials: "include"
        });
        sessionStorage.clear();
        location.href = "index.html";
      });
    }

    //내 정보 페이지 데이터 표시
    if (path.includes("myinfo.html")) {
      const studentAuth = document.getElementById('studentAuth');
      const studentNum = document.getElementById('studentNum');
      const studentName = document.getElementById('studentName');
      studentAuth.textContent = `${userRole}`;
      studentNum.textContent = `${data.user.number}번`;
      studentName.textContent = `환영합니다, ${data.user.name}님`;
    }

    function loadScript(path) {
      const script = document.createElement("script");
      script.src = path;
      script.defer = true;
      document.head.appendChild(script);
    }

    document.body.style.visibility = "visible";

  } catch (err) {
    alert("세션 확인 중 문제가 발생했습니다.");
    location.href = "/";
  }
})();

// 자동 로그아웃 체크
setInterval(async () => {
  try {
    const res = await fetch("https://symclassnodeserver.onrender.com/me", {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();

    if (!data.loggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      // 서버 로그아웃 호출 (세션 파괴)
      await fetch("https://symclassnodeserver.onrender.com/logout", {
        method: "POST",
        credentials: "include"
      });
      location.href = "index.html";
    }
  } catch (err) {
    console.error("세션 체크 중 오류:", err);
  }
}, 10000); // 10초마다 확인



/*const roleDisplay = {
  ADM: "총관리자",
  DTM_A: "데이터센터-오디오",
  DTM_I: "데이터센터-이미지",
  DTM_O: "데이터센터-기타",
  BDM: "대시보드 및 게시판 관리자",
  NAS: "일반 사용자"
};*/