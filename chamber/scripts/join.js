document.addEventListener("DOMContentLoaded", function () {
    const modalLinks = document.querySelectorAll(".modal-link");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");
    const form = document.querySelector("form");
    const timestampInput = document.getElementById('timestamp');

    function openModal(modal) {
        modal.style.display = "block";
    }

    function closeModal(modal) {
        modal.style.display = "none";
    }

    modalLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetModalId = link.getAttribute("href");
            const targetModal = document.querySelector(targetModalId);
            openModal(targetModal);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modal = button.closest(".modal");
            closeModal(modal);
        });
    });

    window.addEventListener("click", function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    if (form) {
        form.addEventListener('submit', function () {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString(); 
            timestampInput.value = formattedDate; 
        });
    }

    if (window.location.pathname.includes("thankyou.html")) {
        document.getElementById('firstName').textContent = getQueryParam('firstName');
        document.getElementById('lastName').textContent = getQueryParam('lastName');
        document.getElementById('email').textContent = getQueryParam('email');
        document.getElementById('phone').textContent = getQueryParam('phone');
        document.getElementById('organization').textContent = getQueryParam('organization');
        document.getElementById('timestamp').textContent = getQueryParam('timestamp');
        
        document.getElementById('year').textContent = new Date().getFullYear();
    }
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
