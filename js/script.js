/* ===================================================
   ASSIGNMENT #4 & #5: ADVANCED JAVASCRIPT & DOM
   Team: Vertex | Group: SE-2505
   =================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ---------------------------------------------------
    // 1. SOUND EFFECT GENERATOR (Web Audio API - No broken MP3s!)
    // ---------------------------------------------------
    function playNotificationSound(type = "chime") {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioCtx();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === "chime") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.18); // A5
            } else {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(440, ctx.currentTime);
            }

            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch (err) {
            console.log("Audio play blocked or unsupported.");
        }
    }

    const soundBtn = document.getElementById("playSoundBtn");
    if (soundBtn) {
        soundBtn.addEventListener("click", function () {
            playNotificationSound("chime");
            this.style.transform = "scale(1.1)";
            setTimeout(() => this.style.transform = "scale(1)", 200);
        });
    }


    // ---------------------------------------------------
    // 2. LIVE DATE, TIME & TIME-OF-DAY GREETING (Switch)
    // ---------------------------------------------------
    const dateTimeElement = document.getElementById("currentDateTime");
    const greetingElement = document.getElementById("timeGreeting");

    function updateDateTimeAndGreeting() {
        const now = new Date();

        if (dateTimeElement) {
            const datePart = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
            const timePart = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            dateTimeElement.textContent = `📅 ${datePart} | 🕒 ${timePart}`;
        }

        if (greetingElement) {
            const hour = now.getHours();
            let timePeriod = "";

            if (hour >= 5 && hour < 12) timePeriod = "morning";
            else if (hour >= 12 && hour < 18) timePeriod = "afternoon";
            else timePeriod = "evening";

            // Switch Statement Requirement
            switch (timePeriod) {
                case "morning":
                    greetingElement.textContent = "☀️ Good Morning! Time for Espresso.";
                    break;
                case "afternoon":
                    greetingElement.textContent = "☕ Good Afternoon! Enjoy a Flat White.";
                    break;
                case "evening":
                    greetingElement.textContent = "🌙 Good Evening! Try our Decaf Roast.";
                    break;
                default:
                    greetingElement.textContent = "☕ Welcome to Aroma Blend!";
            }
        }
    }
    updateDateTimeAndGreeting();
    setInterval(updateDateTimeAndGreeting, 1000);


    // ---------------------------------------------------
    // 3. DAY / NIGHT THEME SWITCH (Works across ALL pages!)
    // ---------------------------------------------------
    const darkModeBtn = document.getElementById("darkModeBtn");

    if (localStorage.getItem("coffeeTheme") === "dark") {
        document.body.classList.add("dark-mode");
        if (darkModeBtn) darkModeBtn.textContent = "☀️ Light Mode";
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            
            localStorage.setItem("coffeeTheme", isDark ? "dark" : "light");

            this.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
            playNotificationSound("click");
        });
    }


    // ---------------------------------------------------
    // 4. OBJECTS, METHODS, ARRAYS, HOF (.filter, .map) & SWITCH
    // ---------------------------------------------------
    const menuItems = [
        {
            id: 1,
            name: "Double Espresso",
            category: "espresso",
            price: 900,
            desc: "Rich crema with dark chocolate and hazelnut notes.",
            img: "img/gallery-1.jpg",
            getFormattedPrice: function () { return this.price + " ₸"; }
        },
        {
            id: 2,
            name: "V60 Pour-Over",
            category: "espresso",
            price: 1300,
            desc: "Clean filter coffee highlighting floral Ethiopian bergamot.",
            img: "img/gallery-3.jpg",
            getFormattedPrice: function () { return this.price + " ₸"; }
        },
        {
            id: 3,
            name: "Caramel Latte Art",
            category: "milk",
            price: 1500,
            desc: "Velvety steamed milk with house-made salted caramel.",
            img: "img/gallery-2.jpg",
            getFormattedPrice: function () { return this.price + " ₸"; }
        },
        {
            id: 4,
            name: "Iced Nitro Cold Brew",
            category: "milk",
            price: 1600,
            desc: "16-hour cold extraction infused with sweet vanilla cream.",
            img: "img/gallery-5.jpg",
            getFormattedPrice: function () { return this.price + " ₸"; }
        },
        {
            id: 5,
            name: "Butter Croissant",
            category: "bakery",
            price: 1100,
            desc: "Flaky golden French pastry baked fresh every morning.",
            img: "img/gallery-4.jpg",
            getFormattedPrice: function () { return this.price + " ₸"; }
        },
        {
            id: 6,
            name: "Cinnamon Cream Roll",
            category: "bakery",
            price: 1400,
            desc: "Warm spiced roll topped with Madagascar vanilla glaze.",
            img: "img/gallery-7.jpg",
            getFormattedPrice: function () { return this.price + " ₸"; }
        }
    ];

    const catalogGrid = document.getElementById("dynamicCatalogGrid");
    const filterBtns = document.querySelectorAll(".filter-btn");

    function renderCatalog(categoryFilter) {
        if (!catalogGrid) return;

        let filteredList = [];

        switch (categoryFilter) {
            case "espresso":
            case "milk":
            case "bakery":
                filteredList = menuItems.filter(item => item.category === categoryFilter);
                break;
            case "all":
            default:
                filteredList = menuItems;
                break;
        }

        const placeholderGif = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        const cardsHTML = filteredList.map(item => `
            <div class="col-12 col-md-6 col-lg-4 catalog-item-col">
                <div class="card h-100 shadow-sm border-0 dynamic-product-card">
                    <img data-src="${item.img}" src="${placeholderGif}" class="lazy-img card-img-top" alt="${item.name}" style="height: 190px; object-fit: cover;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <h5 class="card-title fw-bold mb-0" data-original="${item.name}">${item.name}</h5>
                                <span class="badge bg-warning text-dark fs-6">${item.getFormattedPrice()}</span>
                            </div>
                            <p class="card-text text-muted small" data-original="${item.desc}">${item.desc}</p>
                        </div>
                        <a href="pricing.html" class="btn btn-sm btn-outline-warning fw-bold mt-3">Order Item</a>
                    </div>
                </div>
            </div>
        `).join("");

        catalogGrid.innerHTML = cardsHTML + '<p id="noSearchResults" class="text-center text-muted fw-bold my-4" style="display:none;">😕 No matching coffee or bakery items found.</p>';

        if (window.triggerLazyLoad) window.triggerLazyLoad();
    }

    if (catalogGrid) {
        renderCatalog("all");

        filterBtns.forEach(btn => {
            btn.addEventListener("click", function () {
                filterBtns.forEach(b => {
                    b.classList.remove("btn-warning");
                    b.classList.add("btn-outline-warning");
                });
                this.classList.remove("btn-outline-warning");
                this.classList.add("btn-warning");

                const category = this.getAttribute("data-category");
                renderCatalog(category);
                playNotificationSound("click");
            });
        });
    }


    // ---------------------------------------------------
    // 5. 5-STAR RATING SYSTEM & READ MORE TOGGLE
    // ---------------------------------------------------
    const stars = document.querySelectorAll(".star-item");
    const ratingFeedback = document.getElementById("ratingFeedback");

    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener("click", function () {
                const ratingValue = parseInt(this.getAttribute("data-value"));

                stars.forEach(s => {
                    const sVal = parseInt(s.getAttribute("data-value"));
                    if (sVal <= ratingValue) {
                        s.classList.add("selected");
                        // Event-triggered JS Animation
                        s.style.transform = "scale(1.3)";
                        setTimeout(() => s.style.transform = "scale(1)", 220);
                    } else {
                        s.classList.remove("selected");
                    }
                });

                if (ratingFeedback) {
                    ratingFeedback.textContent = `⭐ Thank you! You rated us ${ratingValue} out of 5 stars!`;
                }
                playNotificationSound("chime");
            });
        });
    }

    const readMoreBtn = document.getElementById("readMoreBtn");
    const moreStoryText = document.getElementById("moreStoryText");

    if (readMoreBtn && moreStoryText) {
        readMoreBtn.addEventListener("click", function () {
            moreStoryText.classList.toggle("open");
            const isOpen = moreStoryText.classList.contains("open");
            this.textContent = isOpen ? "Read Less" : "Read More";
        });
    }


    // ---------------------------------------------------
    // 6. KEYBOARD NAVIGATION FOR MENU (Works immediately!)
    // ---------------------------------------------------
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    if (navLinks.length > 0) {
        document.addEventListener("keydown", function (e) {
            if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

            if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                e.preventDefault();
                const currentIndex = Array.from(navLinks).indexOf(document.activeElement);

                if (currentIndex === -1) {
                    navLinks[0].focus();
                } else if (e.key === "ArrowRight") {
                    const nextIndex = (currentIndex + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                } else if (e.key === "ArrowLeft") {
                    const prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                }
            }
        }); 
    }


    // ---------------------------------------------------
    // 7. FAQ ACCORDION (Smooth CSS Class Toggle)
    // ---------------------------------------------------
    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach(button => {
        button.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector(".faq-icon");
            const isOpen = answer.classList.contains("open");

            document.querySelectorAll(".faq-answer").forEach(ans => ans.classList.remove("open"));
            document.querySelectorAll(".faq-icon").forEach(ic => ic.textContent = "+");

            if (!isOpen) {
                answer.classList.add("open");
                if (icon) icon.textContent = "−";
            }
        });
    });


    // ---------------------------------------------------
    // 8. POPUP SUBSCRIPTION MODAL
    // ---------------------------------------------------
    const openPopupBtn = document.getElementById("openPopupBtn");
    const closePopupBtn = document.getElementById("closePopupBtn");
    const popupModal = document.getElementById("subscriptionPopup");
    const popupForm = document.getElementById("popupForm");
    const popupSuccess = document.getElementById("popupSuccess");

    if (openPopupBtn && popupModal) {
        openPopupBtn.addEventListener("click", () => popupModal.style.display = "flex");
        closePopupBtn.addEventListener("click", () => popupModal.style.display = "none");

        popupModal.addEventListener("click", function (e) {
            if (e.target === popupModal) popupModal.style.display = "none";
        });

        if (popupForm) {
            popupForm.addEventListener("submit", function (e) {
                e.preventDefault();
                const nameVal = document.getElementById("popupName").value.trim();
                const emailVal = document.getElementById("popupEmail").value.trim();
                const nameErr = document.getElementById("popupNameErr");
                const emailErr = document.getElementById("popupEmailErr");

                if (nameErr) nameErr.textContent = "";
                if (emailErr) emailErr.textContent = "";
                popupSuccess.style.display = "none";

                let isValid = true;
                const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s'-]{2,50}$/;
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!namePattern.test(nameVal)) {
                    if (nameErr) nameErr.textContent = "Enter a valid name (letters only).";
                    isValid = false;
                }
                if (!emailPattern.test(emailVal)) {
                    if (emailErr) emailErr.textContent = "Enter a valid email address.";
                    isValid = false;
                }

                if (isValid) {
                    playNotificationSound("chime");
                    popupSuccess.style.display = "block";
                    popupSuccess.textContent = `🎉 Thanks, ${nameVal}! Coupon sent to ${emailVal}`;
                    setTimeout(() => {
                        popupModal.style.display = "none";
                        popupSuccess.style.display = "none";
                        popupForm.reset();
                    }, 2500);
                }
            });
        }
    }


    // ---------------------------------------------------
    // 9. FORM VALIDATION, RESET BUTTON (.forEach) & CALLBACK
    // ---------------------------------------------------
    const valForm = document.getElementById("validationForm");
    const resetFormBtn = document.getElementById("resetFormBtn");

    // Reset button requirement: querySelectorAll('input').forEach(input => input.value = '')
    if (resetFormBtn && valForm) {
        resetFormBtn.addEventListener("click", function () {
            valForm.querySelectorAll("input, textarea").forEach(input => {
                input.value = "";
            });
            valForm.querySelectorAll(".error-msg").forEach(err => {
                err.textContent = "";
            });
            const successAlert = document.getElementById("formSuccessAlert");
            if (successAlert) successAlert.style.display = "none";
        });
    }

    // Callback helper for async form submission
    function handleFormSuccessCallback(userName, callback) {
        setTimeout(() => {
            callback(`✅ Welcome, ${userName}! Account registered securely.`);
        }, 300);
    }

    if (valForm) {
        valForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameVal = document.getElementById("valName").value.trim();
            const emailVal = document.getElementById("valEmail").value.trim();
            const passVal = document.getElementById("valPassword").value;
            const confirmVal = document.getElementById("valConfirmPass").value;

            const nameErr = document.getElementById("nameError");
            const emailErr = document.getElementById("emailError");
            const passErr = document.getElementById("passError");
            const confirmErr = document.getElementById("confirmPassError");
            const successAlert = document.getElementById("formSuccessAlert");

            nameErr.textContent = "";
            emailErr.textContent = "";
            passErr.textContent = "";
            confirmErr.textContent = "";
            successAlert.style.display = "none";

            let isValid = true;
            const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s'-]{2,50}$/;
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (nameVal === "") {
                nameErr.textContent = "Full name is required.";
                isValid = false;
            } else if (!namePattern.test(nameVal)) {
                nameErr.textContent = "Name must contain only letters.";
                isValid = false;
            }

            if (emailVal === "") {
                emailErr.textContent = "Email address is required.";
                isValid = false;
            } else if (!emailPattern.test(emailVal)) {
                emailErr.textContent = "Please enter a valid email address.";
                isValid = false;
            }

            if (passVal.length < 6) {
                passErr.textContent = "Password must be at least 6 characters.";
                isValid = false;
            } else if (/\s/.test(passVal)) {
                passErr.textContent = "Password cannot contain spaces.";
                isValid = false;
            } else if (!/[A-Za-z]/.test(passVal) || !/[0-9]/.test(passVal)) {
                passErr.textContent = "Password must include letters and numbers.";
                isValid = false;
            }

            if (confirmVal === "" || passVal !== confirmVal) {
                confirmErr.textContent = "Passwords do not match!";
                isValid = false;
            }

            if (isValid) {
                playNotificationSound("chime");
                handleFormSuccessCallback(nameVal, function (message) {
                    successAlert.textContent = message;
                    successAlert.style.display = "block";
                    valForm.reset();
                });
            }
        });
    }

});

/* ===================================================
   ASSIGNMENT #6: JQUERY IMPLEMENTATION (ALL 9 TASKS)
   Team: Vertex | Group: SE-2505
   =================================================== */

$(document).ready(function () {
    // TASK 0: Setup & Console Check
    console.log("jQuery is ready!");

    // Inject Progress Bar (Task 4) and Toast Container (Task 7) into all pages
    $("body").prepend('<div id="scrollProgressBar"></div>');
    $("body").append('<div id="jqueryToastContainer"></div>');

    if ($("#darkModeBtn").length === 0) {
        const isDarkNow = $("body").hasClass("dark-mode");
        const btnLabel = isDarkNow ? "☀️ Light" : "🌙 Dark";
        $(".navbar-nav").append(`<li class="nav-item ms-lg-2"><button id="navDarkModeBtn" class="btn btn-sm btn-warning fw-bold mt-1">${btnLabel}</button></li>`);
        $(document).on("click", "#navDarkModeBtn", function () {
            $("body").toggleClass("dark-mode");
            const darkState = $("body").hasClass("dark-mode");
            localStorage.setItem("coffeeTheme", darkState ? "dark" : "light");
            $(this).text(darkState ? "☀️ Light" : "🌙 Dark");
        });
    }

    // ---------------------------------------------------
    // TASK 7: Notification System (Floating Toasts)
    // ---------------------------------------------------
    function showToast(message) {
        const $toast = $(`<div class="jq-toast">${message}</div>`);
        $("#jqueryToastContainer").append($toast);
        $toast.fadeIn(300).delay(2500).fadeOut(400, function () {
            $(this).remove();
        });
    }

    // Trigger toast when clicking "Order Item" in catalog
    $(document).on("click", ".dynamic-product-card .btn", function (e) {
        e.preventDefault();
        const itemName = $(this).closest(".card").find(".card-title").text();
        showToast(`☕ "${itemName}" added to your order!`);
    });


    // ---------------------------------------------------
    // TASK 4: Colorful Scroll Progress Bar
    // ---------------------------------------------------
    $(window).on("scroll", function () {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $("#scrollProgressBar").css("width", scrollPercent + "%");
    });


    // ---------------------------------------------------
    // TASK 1, 2 & 3: Improved Live Search, Autocomplete & Full Highlighting
    // ---------------------------------------------------
    const searchSuggestions = [
        "Double Espresso",
        "V60 Pour-Over",
        "Caramel Latte Art",
        "Iced Nitro Cold Brew",
        "Butter Croissant",
        "Cinnamon Cream Roll",
        "Chocolate",
        "Ethiopian",
        "Vanilla"
    ];

    function performLiveSearch(query) {
        const cleanQuery = query.trim().toLowerCase();
        let visibleCount = 0;

        // TASK 1: Live Filter on Catalog Cards
        $("#dynamicCatalogGrid .catalog-item-col").filter(function () {
            const cardText = $(this).text().toLowerCase();
            const isMatch = cardText.indexOf(cleanQuery) > -1;
            $(this).toggle(isMatch);
            if (isMatch) visibleCount++;
        });

        $("#noSearchResults").toggle(visibleCount === 0 && cleanQuery.length > 0);

        $(".dynamic-product-card .card-title, .dynamic-product-card .card-text, .faq-answer").each(function () {
            if (!$(this).attr("data-original")) {
                $(this).attr("data-original", $(this).text());
            }
            const originalText = $(this).attr("data-original");

            if (cleanQuery.length > 0) {
                const escaped = cleanQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(${escaped})`, "gi");
                $(this).html(originalText.replace(regex, '<mark class="search-highlight">$1</mark>'));
            } else {
                $(this).text(originalText);
            }
        });
    }

    $("#coffeeSearchInput").on("keyup focus", function () {
        const val = $(this).val();
        performLiveSearch(val);

        // TASK 2: Autocomplete Suggestions Dropdown
        const $list = $("#autocompleteList");
        $list.empty();

        if (val.trim().length > 0) {
            const matches = searchSuggestions.filter(item =>
                item.toLowerCase().includes(val.trim().toLowerCase())
            );

            if (matches.length > 0) {
                matches.forEach(match => {
                    $list.append(`<div class="autocomplete-item">🔍 ${match}</div>`);
                });
                $list.slideDown(150);
            } else {
                $list.slideUp(150);
            }
        } else {
            $list.slideUp(150);
        }
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".search-wrapper").length) {
            $("#autocompleteList").slideUp(150);
        }
    });

    $(document).on("click", ".autocomplete-item", function () {
        const selectedText = $(this).text().replace("🔍 ", "").trim();
        $("#coffeeSearchInput").val(selectedText);
        $("#autocompleteList").slideUp(150);
        performLiveSearch(selectedText);
        showToast(`🔍 Filtered by "${selectedText}"`);
    });

    $("#clearSearchBtn").on("click", function () {
        $("#coffeeSearchInput").val("");
        $("#autocompleteList").slideUp(150);
        performLiveSearch("");
    });


    // ---------------------------------------------------
    // TASK 5: Animated Number Counter
    // ---------------------------------------------------
    let counterAnimated = false;

    function checkAndAnimateCounters() {
        const $stats = $("#statsSection");
        if ($stats.length === 0 || counterAnimated) return;

        const windowBottom = $(window).scrollTop() + $(window).height();
        const statsTop = $stats.offset().top;

        if (windowBottom > statsTop + 50) {
            counterAnimated = true;
            $(".counter-num").each(function () {
                const $this = $(this);
                const target = parseInt($this.attr("data-target"), 10);

                $({ countNum: 0 }).animate(
                    { countNum: target },
                    {
                        duration: 1800,
                        easing: "swing",
                        step: function () {
                            $this.text(Math.floor(this.countNum) + "+");
                        },
                        complete: function () {
                            $this.text(target + "+");
                        }
                    }
                );
            });
        }
    }
    $(window).on("scroll", checkAndAnimateCounters);
    checkAndAnimateCounters();


    // ---------------------------------------------------
    // TASK 6: Loading Spinner on Submit (Only if Form is Valid!)
    // ---------------------------------------------------
    $("form").on("submit", function () {
        const $form = $(this);
        const $btn = $form.find('button[type="submit"]');

        let hasValidationErrors = false;
        $form.find(".text-danger, .error-msg").each(function () {
            if ($(this).text().trim() !== "") {
                hasValidationErrors = true;
            }
        });

        if (hasValidationErrors) {
            showToast("⚠️ Please fix the errors in the form!");
            return;
        }

        if ($btn.length > 0 && !$btn.prop("disabled")) {
            const originalText = $btn.html();

            $btn.prop("disabled", true);
            $btn.html('<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Please wait...');

            setTimeout(function () {
                $btn.prop("disabled", false);
                $btn.html(originalText);
                showToast("✅ Action processed by server!");
            }, 1200);
        }
    });

    // ---------------------------------------------------
    // TASK 8: Copied to Clipboard Button
    // ---------------------------------------------------
    $("#copyPromoBtn").on("click", function () {
        const $btn = $(this);
        const promoText = $("#promoCodeSnippet").text().trim();

        navigator.clipboard.writeText(promoText).then(function () {
            const originalHTML = $btn.html();
            $btn.html("✓ Copied to clipboard!").removeClass("btn-warning").addClass("btn-success");
            showToast(`📋 Promo code "${promoText}" copied!`);

            setTimeout(function () {
                $btn.html(originalHTML).removeClass("btn-success").addClass("btn-warning");
            }, 2200);
        });
    });


    // ---------------------------------------------------
    // TASK 9: Image Lazy Loading across ALL sections
    // ---------------------------------------------------
    function lazyLoadImages() {
        const windowBottom = $(window).scrollTop() + $(window).height() + 120;

        $(".lazy-img").each(function () {
            const $img = $(this);
            if ($img.is(":visible") && !$img.hasClass("loaded")) {
                const imgTop = $img.offset().top;
                if (windowBottom > imgTop) {
                    const realSrc = $img.attr("data-src");
                    if (realSrc) {
                        $img.attr("src", realSrc).addClass("loaded");
                    }
                }
            }
        });
    }
    window.triggerLazyLoad = lazyLoadImages;
    $(window).on("scroll resize", lazyLoadImages);
    lazyLoadImages();

    $("#valEmail, #valPassword, #valConfirmPass, #popupEmail").on("keydown input", function (e) {
        if (e.key === " ") e.preventDefault();
        this.value = this.value.replace(/\s+/g, "");
    });
    });