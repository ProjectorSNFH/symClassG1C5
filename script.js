let userButton;

(async () => {
  try {
    const res = await fetch("https://symclassnodeserver.onrender.com/me", {
      method: "GET",
      credentials: "include"
    });
    const data = await res.json();

    if (!data.loggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      location.href = "index.html";
      return;
    } else {
      userButton = document.getElementById('userButton');
      if (userButton) {
        userButton.textContent = `${data.user.number}번 ${data.user.name} 학생`;
      }
    }



    const userRole = data.user.role || "";
    const path = location.pathname;

    // adminpanel.html 접근 제한
    if (path.includes("adminpanel")) {
      if (userRole === "NAS") {
        alert("권한이 부족합니다. 대시보드로 이동합니다.");
        location.href = "DashBoard.html";
      } else if (!["ADM", "DTM_A", "DTM_I", "DTM_O", "BDM"].includes(userRole)) {
        alert("로그인이 필요한 서비스입니다.");
        location.href = "index.html";
      }
      return;
    }

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

    function loadScript(path) {
      const script = document.createElement("script");
      script.src = path;
      script.defer = true;
      document.head.appendChild(script);
    }

    const filename = location.pathname.split("/").pop();

    switch (filename) {
      case "DashBoard.html":
        loadScript("DashData.js");
        break;
      case "board.html":
        loadScript("boardData.js");
        break;
      case "datacenter.html":
        loadScript("dataCenter.js");
        break;
      case "manage_audio.html":
        loadScript("manage_audio.js");
        break;
      case "manage_image.html":
        loadScript("manage_image.js");
        break;
      case "manage_other.html":
        loadScript("manage_other.js");
        break;
      case "manage_bdm.html":
        loadScript("manage_bdm.js");
        loadScript("manage_bdm2.js");
        break;
    }

    document.body.style.visibility = "visible";

  } catch (err) {
    alert("세션 확인 중 문제가 발생했습니다.");
    location.href = "";
  }
})();
const userMenu = document.getElementById('userMenu');

let isLocked = false;

// 호버로 열림
userButton.addEventListener('mouseenter', () => {
  if (!isLocked) {
    userMenu.classList.add('visible');
  }
});
userButton.addEventListener('mouseleave', () => {
  if (!isLocked) {
    setTimeout(() => {
      if (!userMenu.matches(':hover')) {
        userMenu.classList.remove('visible');
      }
    }, 100);
  }
});

// 메뉴 안에 있을 때도 유지
userMenu.addEventListener('mouseenter', () => {
  if (!isLocked) {
    userMenu.classList.add('visible');
  }
});
userMenu.addEventListener('mouseleave', () => {
  if (!isLocked) {
    userMenu.classList.remove('visible');
  }
});

// 클릭 시 고정
userButton.addEventListener('click', (e) => {
  e.stopPropagation();
  isLocked = !isLocked;
  if (isLocked) {
    userMenu.classList.add('visible');
  } else {
    userMenu.classList.remove('visible');
  }
});

// 다른 곳 클릭 시 닫기
document.addEventListener('click', (e) => {
  if (isLocked && !userMenu.contains(e.target) && !userButton.contains(e.target)) {
    isLocked = false;
    userMenu.classList.remove('visible');
  }
});

  /*const roleDisplay = {
    ADM: "총관리자",
    DTM_A: "데이터센터-오디오",
    DTM_I: "데이터센터-이미지",
    DTM_O: "데이터센터-기타",
    BDM: "대시보드 및 게시판 관리자",
    NAS: "일반 사용자"
  };*/