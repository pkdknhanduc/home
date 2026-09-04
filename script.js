const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const form = document.querySelector('#appointment-form');
const toast = document.querySelector('#toast');

const brandTextWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let brandTextNode;
while ((brandTextNode = brandTextWalker.nextNode())) {
  brandTextNode.nodeValue = brandTextNode.nodeValue
    .replaceAll('MediCare Plus', 'Nhân Đức')
    .replaceAll('07:30 – 20:00', '09:00 – 18:30')
    .replaceAll('08:00 – 17:00', '09:00 – 17:00')
    .replaceAll('Thứ 7 – Chủ nhật', 'Thứ 7')
    .replaceAll('Phòng khám làm việc từ 09:00 đến 18:30, thứ 2 đến thứ 6; thứ 7 từ 09:00 đến 17:00.', 'Phòng khám làm việc từ 09:00 đến 18:30, thứ 2 đến thứ 6; thứ 7 từ 09:00 đến 17:00.')
}

const hoursHeading = [...document.querySelectorAll('.site-footer h4')]
  .find((heading) => heading.textContent.trim() === 'Giờ làm việc');
if (hoursHeading) {
  hoursHeading.nextElementSibling.innerHTML = '<strong>CN1:</strong></p>Thứ 2, 3, 4, 6: &nbsp; 09:00 – 18:30<br>Thứ 7 -&nbsp; 09:00 – 17:00<br>Chủ nhật -&nbsp; 13:00 – 17:00<br>Thứ 5 - Nghỉ<br><span>Nghỉ trưa: 12:30 – 14:00</span>';
}

const faqAnswer = document.querySelector('.faq-list details p');
if (faqAnswer) {
  faqAnswer.textContent = 'Phòng khám làm việc từ 09:00 đến 18:30, thứ 2 đến thứ 6; thứ 7 và Chủ nhật từ 09:00 đến 17:00. Phòng khám nghỉ trưa từ 12:30 đến 14:00 và nghỉ cả ngày Thứ 5.';
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.innerHTML = 'Đã tiếp nhận yêu cầu <span>✓</span>';
  submitButton.disabled = true;
  toast.classList.add('show');
  form.reset();
  window.setTimeout(() => {
    toast.classList.remove('show');
    submitButton.innerHTML = 'Gửi yêu cầu đặt lịch <span>↗</span>';
    submitButton.disabled = false;
  }, 4500);
});

const reviews = [
  { quote: 'Tôi luôn cảm thấy được lắng nghe và chăm sóc tận tình mỗi lần đến Nhân Đức 2. Không gian sạch sẽ, bác sĩ giỏi và các bạn nhân viên rất dễ thương.', name: 'Nguyễn Trần Trường Tú', meta: 'Bệnh nhân nội khoa · 2 tuần trước', initials: 'TN' },
  { quote: 'Bác sĩ giải thích rất rõ ràng, nhẹ nhàng. Bé nhà mình vốn sợ đi khám nhưng lần này lại hợp tác và vui vẻ suốt buổi.', name: 'Phạm Hoàng Nam', meta: 'Phụ huynh bệnh nhi · 1 tháng trước', initials: 'PH' },
  { quote: 'Quy trình đặt lịch nhanh, không phải chờ lâu. Tôi đặc biệt yên tâm vì kết quả xét nghiệm được tư vấn rất kỹ.', name: 'Vũ Thanh Hà', meta: 'Bệnh nhân tầm soát · 3 tháng trước', initials: 'VT' }
];

document.querySelectorAll('.slider-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const review = reviews[Number(button.dataset.slide)];
    document.querySelector('#quote').textContent = review.quote;
    document.querySelector('#reviewer-name').textContent = review.name;
    document.querySelector('#reviewer-meta').textContent = review.meta;
    document.querySelector('.reviewer-avatar').textContent = review.initials;
    document.querySelectorAll('.slider-btn').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});
const clinicImage = document.querySelector('#clinic-image');

if (clinicImage) {
  const images = [
    'nhanduc2.jpg',
    'nhanduc3.png'
  ];

  let currentImage = 0;

  setInterval(() => {
    currentImage = (currentImage + 1) % images.length;
    clinicImage.src = images[currentImage];
  }, 10000);
}
// ===============================
// BẢNG GIÁ - ĐỌC TRỰC TIẾP TỪ EXCEL
// ===============================

const pricingCategory = document.getElementById("pricing-category");
const pricingSearch = document.getElementById("pricing-search");
const pricingTableBody = document.getElementById("pricing-table-body");
const pricingCount = document.getElementById("pricing-count");

let pricingData = {};

async function loadPricingExcel() {

    try {

        const response = await fetch("./nhanduc2_data.xls");

        if (!response.ok) {
            throw new Error("Không tìm thấy file Excel");
        }

        const arrayBuffer = await response.arrayBuffer();

        const workbook = XLSX.read(arrayBuffer, {
            type: "array"
        });

        pricingData = {};

        workbook.SheetNames.forEach(sheetName => {

            const sheet = workbook.Sheets[sheetName];

            const rows = XLSX.utils.sheet_to_json(sheet, {
                header: 1,
                defval: ""
            });

            const data = [];

            // Excel có 2 dòng đầu là tiêu đề
            for (let i = 2; i < rows.length; i++) {

                const row = rows[i];

                if (!row || row.length === 0) {
                    continue;
                }

                const stt = row[0];
                const ma = row[1];
                const ten = row[2];
                const donVi = row[3];
                const gia = row[4];

                // Bỏ dòng trống
                if (
                    stt === "" &&
                    ma === "" &&
                    ten === ""
                ) {
                    continue;
                }

                data.push({
                    stt: stt,
                    ma: ma,
                    ten: ten,
                    donVi: donVi,
                    gia: gia
                });
            }

            if (data.length > 0) {
                pricingData[sheetName.trim()] = data;
            }

        });

        // Xóa option "Đang tải..."
        pricingCategory.innerHTML = "";

        // Tạo danh sách loại dịch vụ
        Object.keys(pricingData).forEach(category => {

            const option = document.createElement("option");

            option.value = category;
            option.textContent = category;

            pricingCategory.appendChild(option);

        });

        // Hiển thị bảng đầu tiên
        renderPricing();

    } catch (error) {

        console.error("Lỗi đọc Excel:", error);

        pricingCategory.innerHTML =
            '<option value="">Không thể đọc file Excel</option>';

        pricingCount.textContent =
            "Không tìm thấy file nhanduc2_data.xls";

    }

}


function formatPrice(price) {

    if (
        price === null ||
        price === undefined ||
        price === ""
    ) {
        return "Liên hệ";
    }

    const number = Number(
        String(price).replace(/,/g, "")
    );

    if (isNaN(number)) {
        return price;
    }

    return number.toLocaleString("vi-VN") + " đ";
}


function renderPricing() {

    const category = pricingCategory.value;

    const keyword =
        pricingSearch.value
            .trim()
            .toLowerCase();

    let rows = pricingData[category] || [];

    // Tìm kiếm
    if (keyword) {

        rows = rows.filter(item => {

            const ma =
                String(item.ma || "")
                    .toLowerCase();

            const ten =
                String(item.ten || "")
                    .toLowerCase();

            return (
                ma.includes(keyword) ||
                ten.includes(keyword)
            );

        });

    }

    pricingTableBody.innerHTML = "";

    // Không có kết quả
    if (rows.length === 0) {

        pricingTableBody.innerHTML = `
            <tr>
                <td colspan="5"
                    style="
                        text-align:center;
                        padding:40px;
                    ">
                    Không tìm thấy dịch vụ phù hợp.
                </td>
            </tr>
        `;

        pricingCount.textContent = "0 dịch vụ";

        return;
    }

    // Hiển thị dữ liệu
    rows.forEach(item => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.stt}</td>

            <td>${item.ma}</td>

            <td>${item.ten}</td>

            <td>${item.donVi}</td>

            <td>${formatPrice(item.gia)}</td>
        `;

        pricingTableBody.appendChild(tr);

    });

    pricingCount.textContent =
        `Hiển thị ${rows.length.toLocaleString("vi-VN")} dịch vụ`;

}


// Chọn loại dịch vụ
pricingCategory.addEventListener(
    "change",
    renderPricing
);


// Tìm kiếm
pricingSearch.addEventListener(
    "input",
    renderPricing
);


// Đọc Excel
loadPricingExcel();