// dataCenter.js

document.addEventListener("DOMContentLoaded", () => {
    const data = [
        {
            uploader: "이재원",
            uploadDate: "2025-06-20",
            fileName: "과학 프로젝트 자료.zip",
            description: "형식: 실험 결과보고서 포함",
            type: "other"
        },
        {
            uploader: "김민수",
            uploadDate: "2025-06-21",
            fileName: "수학 추가문제.pdf",
            description: "5단원 심화 문제",
            type: "other"
        },
        {
            uploader: "박지훈",
            uploadDate: "2025-06-22",
            fileName: "국어 발표자료.pptx",
            description: "조별 발표용 PPT",
            type: "other"
        },
        {
            uploader: "최수연",
            uploadDate: "2025-06-19",
            fileName: "듣기평가_6월.mp3",
            description: "영어 듣기 자료",
            type: "audio"
        },
        {
            uploader: "한지원",
            uploadDate: "2025-06-23",
            fileName: "역사 이미지 자료.png",
            description: "시대별 유물 이미지",
            type: "image"
        }
    ];

    const tbody = document.querySelector(".datacenter-table tbody");
    const filterInputs = document.querySelectorAll("input[name='file-filter']");
    const sortCriteria = document.getElementById("sort-criteria");
    const sortOrder = document.getElementById("sort-order");

    function renderTable() {
        let filtered = [...data];

        const selectedFilter = document.querySelector("input[name='file-filter']:checked").value;
        if (selectedFilter === "audio") {
            filtered = filtered.filter(item => item.type === "audio");
        } else if (selectedFilter === "image") {
            filtered = filtered.filter(item => item.type === "image");
        } else if (selectedFilter === "exclude") {
            filtered = filtered.filter(item => item.type !== "audio" && item.type !== "image");
        }

        const criteria = sortCriteria.value;
        const order = sortOrder.value;

        filtered.sort((a, b) => {
            let aVal, bVal;
            if (criteria === "created") {
                aVal = new Date(a.uploadDate);
                bVal = new Date(b.uploadDate);
                return order === "asc" ? aVal - bVal : bVal - aVal;
            } else if (criteria === "content") {
                aVal = a.fileName.toLowerCase();
                bVal = b.fileName.toLowerCase();
                return order === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            } else if (criteria === "uploader") {
                aVal = a.uploader.toLowerCase();
                bVal = b.uploader.toLowerCase();
                return order === "asc"
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            return 0;
        });

        tbody.innerHTML = "";
        filtered.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
        <td>${item.uploader}</td>
        <td>${item.uploadDate}</td>
        <td>
          <a href="#" class="file-link">
            ${item.fileName}<br>
            (${item.description})
          </a>
        </td>
      `;
            tbody.appendChild(tr);
        });
    }

    filterInputs.forEach(input => input.addEventListener("change", renderTable));
    sortCriteria.addEventListener("change", renderTable);
    sortOrder.addEventListener("change", renderTable);

    sortCriteria.value = "created";
    sortOrder.value = "desc";

    renderTable();
});