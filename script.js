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

document.addEventListener("DOMContentLoaded", async () => {
  const adminLink = document.getElementById("adminLink");

  const roleDisplay = {
    ADM: "총관리자",
    DTM_A: "데이터센터-오디오",
    DTM_I: "데이터센터-이미지",
    DTM_O: "데이터센터-기타",
    BDM: "대시보드 및 게시판 관리자",
    NAS: "일반 사용자"
  };

  try {
    const res = await fetch("/me");
    if (!res.ok) throw new Error("Unauthorized");
    const session = await res.json();

    const userRole = session.role;
    window.userRole = userRole;
    localStorage.setItem("userRole", userRole);
    localStorage.setItem("userName", session.name);
    localStorage.setItem("userNumber", session.number);

    const roleEl = document.getElementById("roleCode");
    if (roleEl) {
      roleEl.textContent = roleDisplay[userRole] || "없음";
    }

    const roleTextEl = document.getElementById("roleText");
    if (roleTextEl) {
      roleTextEl.textContent = roleDisplay[userRole] || userRole;
    }

    if (adminLink && ["ADM", "DTM_A", "DTM_I", "DTM_O", "BDM"].includes(userRole)) {
      adminLink.style.display = "block";
    }

    const allowedAdminRoles = ["ADM", "DTM_A", "DTM_I", "DTM_O", "BDM"];
    const allAllowedRoles = [...allowedAdminRoles, "NAS"];
    const isAdminPage = location.pathname.includes("adminpanel") ||
      location.pathname.includes("manage_");

    if (isAdminPage && !allowedAdminRoles.includes(userRole)) {
      alert("접근 권한이 없습니다.");
      location.href = "adminpanel.html";
    } else if (!allAllowedRoles.includes(userRole)) {
      alert("로그인이 필요한 서비스입니다.");
      location.href = "index.html";
    }
  } catch (err) {
    console.warn("세션 없음 또는 인증 실패");
    alert("로그인이 필요합니다.");
    location.href = "index.html";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const number = localStorage.getItem("userNumber");
  const name = localStorage.getItem("userName");
  const userButton = document.getElementById("userButton");

  if (number && name && userButton) {
    userButton.firstChild.textContent = `${number}번 ${name} ▾`;
  }
});
