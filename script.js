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