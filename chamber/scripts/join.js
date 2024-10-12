document.addEventListener("DOMContentLoaded", function () {
    const modalLinks = document.querySelectorAll(".modal-link");
    const modals = document.querySelectorAll(".modal");
    const closeButtons = document.querySelectorAll(".close");
    const form = document.querySelector("form"); // Reference to the form element
    const timestampInput = document.getElementById('timestamp'); // Reference to the timestamp input

    // Function to open a modal
    function openModal(modal) {
        modal.style.display = "block";
    }

    // Function to close a modal
    function closeModal(modal) {
        modal.style.display = "none";
    }

    // Event listener for modal links
    modalLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetModalId = link.getAttribute("href");
            const targetModal = document.querySelector(targetModalId);
            openModal(targetModal);
        });
    });

    // Event listeners for close buttons
    closeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const modal = button.closest(".modal");
            closeModal(modal);
        });
    });

    // Close modals when clicking outside of them
    window.addEventListener("click", function (event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Populate the timestamp on form submission
    if (form) {
        form.addEventListener('submit', function () {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString(); // Get only the date
            timestampInput.value = formattedDate; // Set current date in the hidden input
        });
    }

    // Displaying the form information (only on thankyou.html page)
    if (window.location.pathname.includes("thankyou.html")) {
        document.getElementById('firstName').textContent = getQueryParam('firstName');
        document.getElementById('lastName').textContent = getQueryParam('lastName');
        document.getElementById('email').textContent = getQueryParam('email');
        document.getElementById('phone').textContent = getQueryParam('phone');
        document.getElementById('organization').textContent = getQueryParam('organization');
        document.getElementById('timestamp').textContent = getQueryParam('timestamp');
        
        // Update the copyright year dynamically
        document.getElementById('year').textContent = new Date().getFullYear();
    }
});

// Function to get query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
