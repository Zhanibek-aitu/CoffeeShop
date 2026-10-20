/* ===================================================
   ASSIGNMENT #4: JAVASCRIPT LOGIC
   Team: Vertex | Group: SE-2505
   =================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ---------------------------------------------------
    // TASK 5: Live Current Date and Time Display
    // ---------------------------------------------------
    const dateTimeElement = document.getElementById("currentDateTime");

    function updateDateTime() {
        if (!dateTimeElement) return;
        const now = new Date();

        // Options for formatting: "October 9, 2026, 10:45:12 AM"
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        };
        dateTimeElement.textContent = "🕒 " + now.toLocaleDateString("en-US", options);
    }
    updateDateTime();
    setInterval(updateDateTime, 1000); // Live update every second


    // ---------------------------------------------------
    // TASK 4: Change Background Color dynamically
    // ---------------------------------------------------
    const themeBtn = document.getElementById("themeColorBtn");
    const colors = ["#fcf9f2", "#f2efe9", "#e8e1d5", "#fdfbf7", "#f3ece2"];
    let colorIndex = 0;

    if (themeBtn) {
        themeBtn.addEventListener("click", function () {
            // Cycle through predefined warm coffee colors
            colorIndex = (colorIndex + 1) % colors.length;
            document.body.style.backgroundColor = colors[colorIndex];
        });
    }


    // ---------------------------------------------------
    // TASK 2: Accordion for FAQ Sections (Smooth Toggle)
    // ---------------------------------------------------
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(button => {
        button.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector(".faq-icon");

            // Check if already open
            const isOpen = answer.style.display === "block";

            // Close all answers first (Accordion behavior)
            document.querySelectorAll(".faq-answer").forEach(ans => ans.style.display = "none");
            document.querySelectorAll(".faq-icon").forEach(ic => ic.textContent = "+");

            // Toggle current
            if (!isOpen) {
                answer.style.display = "block";
                if (icon) icon.textContent = "−";
            }
        });
    });


    // ---------------------------------------------------
    // TASK 3: Popup Subscription Form (Modal)
    // ---------------------------------------------------
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const popupModal = document.getElementById("subscriptionPopup");
    const popupForm = document.getElementById("popupForm");
    const popupSuccess = document.getElementById("popupSuccess");

    if (openPopupBtn && popupModal) {
        // Open modal
        openPopupBtn.addEventListener("click", function () {
            popupModal.style.display = "flex";
        });

        // Close modal via (X) button
        closePopupBtn.addEventListener("click", function () {
            popupModal.style.display = "none";
        });

        // Close modal when clicking outside the box
        popupModal.addEventListener("click", function (e) {
            if (e.target === popupModal) {
                popupModal.style.display = "none";
            }
        });

        // Handle subscription submit
        if (popupForm) {
            popupForm.addEventListener("submit", function (e) {
                e.preventDefault();
                popupSuccess.style.display = "block";
                popupForm.reset();
                setTimeout(() => {
                    popupModal.style.display = "none";
                    popupSuccess.style.display = "none";
                }, 2000);
            });
        }
    }


    // ---------------------------------------------------
    // TASK 1: Comprehensive Form Validation
    // ---------------------------------------------------
    const valForm = document.getElementById("validationForm");

    if (valForm) {
        valForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Stop page refresh

            // Elements
            const name = document.getElementById("valName");
            const email = document.getElementById("valEmail");
            const pass = document.getElementById("valPassword");
            const confirmPass = document.getElementById("valConfirmPass");

            // Error containers
            const nameErr = document.getElementById("nameError");
            const emailErr = document.getElementById("emailError");
            const passErr = document.getElementById("passError");
            const confirmErr = document.getElementById("confirmPassError");
            const successAlert = document.getElementById("formSuccessAlert");

            // Clear previous errors
            nameErr.textContent = "";
            emailErr.textContent = "";
            passErr.textContent = "";
            confirmErr.textContent = "";
            successAlert.style.display = "none";

            let isValid = true;

            // 1. Name validation
            if (name.value.trim() === "") {
                nameErr.textContent = "Full name is required.";
                isValid = false;
            }

            // 2. Email format validation (Regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === "") {
                emailErr.textContent = "Email address is required.";
                isValid = false;
            } else if (!emailPattern.test(email.value.trim())) {
                emailErr.textContent = "Please enter a valid email (e.g. name@domain.com).";
                isValid = false;
            }

            // 3. Password length validation (Min 6 chars)
            if (pass.value.length < 6) {
                passErr.textContent = "Password must be at least 6 characters long.";
                isValid = false;
            }

            // 4. Password confirmation matching
            if (confirmPass.value === "") {
                confirmErr.textContent = "Please confirm your password.";
                isValid = false;
            } else if (pass.value !== confirmPass.value) {
                confirmErr.textContent = "Passwords do not match!";
                isValid = false;
            }

            // If all checks pass
            if (isValid) {
                successAlert.style.display = "block";
                valForm.reset();
            }
        });
    }

});