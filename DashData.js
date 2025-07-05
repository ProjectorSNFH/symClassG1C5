// DashData.js

document.addEventListener("DOMContentLoaded", () => {
  // 더미 데이터 정의
  const assessments = [
    { content: "국어 수행평가 준비", created: "2025-06-30" },
    { content: "수학 공지: 다음주 시험", created: "2025-06-20" },
    { content: "과학 프로젝트 발표", created: "2025-06-19" },
    { content: "영어 말하기 대회", created: "2025-06-18" }
  ];

  const duties = [
    { num: 1, name: "이재원" },
    { num: 2, name: "김민수" },
    { num: 3, name: "박지훈" }
  ];

  const lunchMenu = ["현미밥", "소고기국", "마라탕", "꿰바로우"];

  const cleaning = {
    late: [3, 5, 6],
    sweep: [1, 2],
    wipe: [4, 7]
  };

  // 정렬: 생성일 기준 내림차순
  assessments.sort((a, b) => new Date(b.created) - new Date(a.created));

  // DOM에 삽입
  const assessmentContainer = document.getElementById("assessment-container");
  if (assessmentContainer) {
    assessments.forEach(item => {
      const div = document.createElement("div");
      div.textContent = item.content;
      assessmentContainer.appendChild(div);
    });
  }

  const dutiesContainer = document.getElementById("duties-container");
  if (dutiesContainer) {
    duties.forEach(item => {
      const div = document.createElement("div");
      div.textContent = `${item.num}번 ${item.name}`;
      dutiesContainer.appendChild(div);
    });
  }

  const lunchContainer = document.getElementById("lunch-container");
  if (lunchContainer) {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = lunchMenu.join(", ");
    lunchContainer.appendChild(div);
  }

  const cleaningContainer = document.getElementById("cleaning-container");
  if (cleaningContainer) {
    const lateDiv = document.createElement("div");
    lateDiv.innerHTML = `<b>지각:</b> ${cleaning.late.join(", ")}`;

    const sweepDiv = document.createElement("div");
    sweepDiv.innerHTML = `<b>쓸기:</b> ${cleaning.sweep.join(", ")}`;

    const wipeDiv = document.createElement("div");
    wipeDiv.innerHTML = `<b>닦기:</b> ${cleaning.wipe.join(", ")}`;

    cleaningContainer.append(lateDiv, sweepDiv, wipeDiv);
  }
});