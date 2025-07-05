// boardData.js

document.addEventListener("DOMContentLoaded", () => {
  const boardTableBody = document.querySelector(".board-table tbody");

  const boardItems = [
    {
      content: "국어 수행평가 준비\n형식: 발표 / 준비물: PPT",
      dueDate: "2025-06-25",
      createdDate: "2025-06-20",
    },
    {
      content: "수학 공지\n시험범위: 5단원까지",
      dueDate: "2025-06-28",
      createdDate: "2025-06-21",
    },
    {
      content: "과학 프로젝트 발표\n주제별 조별 발표 / 실험영상 포함",
      dueDate: "2025-07-03",
      createdDate: "2025-06-22",
    },
  ];

  function renderTable(items) {
    boardTableBody.innerHTML = ""; // 기존 행 제거

    items.forEach(item => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${item.content.replace(/\n/g, "<br>")}</td>
        <td>${item.dueDate}</td>
        <td>${item.createdDate}</td>
      `;

      boardTableBody.appendChild(tr);
    });
  }

  // 초기 렌더링
  renderTable(boardItems);

  // 정렬 기능 (선택적)
  const criteriaSelect = document.getElementById("sort-criteria");
  const orderSelect = document.getElementById("sort-order");

  function sortAndRender() {
    const criteria = criteriaSelect.value;
    const order = orderSelect.value;

    const sorted = [...boardItems].sort((a, b) => {
      if (criteria === "content") {
        return order === "asc"
          ? a.content.localeCompare(b.content)
          : b.content.localeCompare(a.content);
      } else {
        const dateA = new Date(a[criteria + "Date"]);
        const dateB = new Date(b[criteria + "Date"]);
        return order === "asc" ? dateA - dateB : dateB - dateA;
      }
    });

    renderTable(sorted);
  }

  criteriaSelect.addEventListener("change", sortAndRender);
  orderSelect.addEventListener("change", sortAndRender);
});