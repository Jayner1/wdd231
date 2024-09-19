document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    const copyrightYearSpan = document.getElementById("copyrightYear");
    if (copyrightYearSpan) {
        copyrightYearSpan.textContent = currentYear;
    }

    const lastModifiedDate = new Date(document.lastModified);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedLastModified = lastModifiedDate.toLocaleDateString('en-US', options);

    const lastModifiedSpan = document.getElementById("lastModified");
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modified: ${formattedLastModified}`;
    }

    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");

        hamburger.classList.toggle("open");
    });
});
