//script.js

//const userButton = document.getElementById('userButton');
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

document.addEventListener("DOMContentLoaded", () => {
  const adminLink = document.getElementById("adminLink");

  const roleDisplay = {
    ADM: "총관리자",
    DTM_A: "데이터센터-오디오",
    DTM_I: "데이터센터-이미지",
    DTM_O: "데이터센터-기타",
    BDM: "대시보드 및 게시판 관리자",
    NAS: "일반 사용자"
  };

  const roleEl = document.getElementById("roleCode");
  let userRole = "ADM";

  if (roleEl) {
    const rawCode = roleEl.textContent.trim();
    userRole = rawCode;
    roleEl.textContent = roleDisplay[rawCode] || "없음";
  }

  if (adminLink && ["ADM", "DTM_A", "DTM_I", "DTM_O", "BDM"].includes(userRole)) {
    adminLink.style.display = "block";
  }

  const roleTextEl = document.getElementById("roleText");
  if (roleTextEl && typeof userRole !== "undefined") {
    roleTextEl.textContent = roleDisplay[userRole] || userRole;
  }


  window.userRole = userRole;
  console.log(window.userRole);
  const allowedAdminRoles = ["ADM", "DTM_A", "DTM_I", "DTM_O", "BDM"];
  const allAllowedRoles = [...allowedAdminRoles, "NAS"];

  const isAdminPage = location.pathname.includes("adminpanel") || 
                      location.pathname.includes("manage_");

  if (isAdminPage) {
    if (!allowedAdminRoles.includes(userRole)) {
      // 뒤로 갈 수 있으면
      if (history.length > 1) {
        history.back();
      } else {
        location.href = "https://www.google.com";
      }
    }
  } else {
    if (!allAllowedRoles.includes(userRole)) {
      alert("로그인이 필요한 서비스입니다.");
      location.href = "Locked.html";  // 또는 로그인 페이지로
    }
  }
});

