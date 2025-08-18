// boardData.js

document.addEventListener("DOMContentLoaded", () => {
  const boardTableBody = document.querySelector(".board-table tbody");

  const boardItems = [
    {
      content: "수학 수행평가",
      dueDate: "2025-08-19",
      createdDate: "2025-2-30",
    },
    {
      content: "기말고사",
      dueDate: "2025-08-19",
      createdDate: "2025-1-30",
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