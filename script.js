/* =========================================================
   #projectC
   Complete JavaScript
========================================================= */


/* =========================================================
   USER DATA
========================================================= */

const userData = {

    gender: "",

    name: "",

    relationshipStatus: "",

    wantsRelationship: "",

    boyPreference: "",

    meetDate: "",

    contactType: "",

    contactInfo: ""

};
/* =========================================================
   AUTO SAVE / SESSION TRACKING
========================================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzXENoRj_ZA_YWSw0pTObnCMKPIr63kP_-XRYpBf-TbzK1ikdd6LybIgpWhCkfL18Ip/exec";


let sessionId =
    localStorage.getItem("projectC_session_id");


if (!sessionId) {

    sessionId =
        "SC-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 9);

    localStorage.setItem(
        "projectC_session_id",
        sessionId
    );

}


/* Save progress */

function saveProgress(step) {

    const data = {

        sessionId:
            sessionId,

        timestamp:
            new Date().toISOString(),

        gender:
            userData.gender || "",

        name:
            userData.name || "",

        relationshipStatus:
            userData.relationshipStatus || "",

        wantsRelationship:
            userData.wantsRelationship || "",

        boyPreference:
            userData.boyPreference || "",

        meetDate:
            userData.meetDate || "",

        contactType:
            userData.contactType || "",

        contactInfo:
            userData.contactInfo || "",

        lastStep:
            step || ""

    };


    fetch(
        GOOGLE_SCRIPT_URL,
        {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body:
                JSON.stringify(data)

        }
    )
    .catch(() => {

        console.log(
            "Progress save failed."
        );

    });

}


/* Save immediately when page is being closed */

function saveBeforeExit() {

    const data = {

        sessionId:
            sessionId,

        timestamp:
            new Date().toISOString(),

        gender:
            userData.gender || "",

        name:
            userData.name || "",

        relationshipStatus:
            userData.relationshipStatus || "",

        wantsRelationship:
            userData.wantsRelationship || "",

        boyPreference:
            userData.boyPreference || "",

        meetDate:
            userData.meetDate || "",

        contactType:
            userData.contactType || "",

        contactInfo:
            userData.contactInfo || "",

        lastStep:
            currentStep || "Unknown"

    };


    const blob =
        new Blob(
            [JSON.stringify(data)],
            {
                type:
                    "text/plain;charset=utf-8"
            }
        );


    navigator.sendBeacon(
        GOOGLE_SCRIPT_URL,
        blob
    );

}


/* Current step */

let currentStep = "Opened";


/* Browser/tab close */

window.addEventListener(
    "pagehide",
    saveBeforeExit
);


/* Mobile browser background */

document.addEventListener(
    "visibilitychange",
    function() {

        if (
            document.visibilityState ===
            "hidden"
        ) {

            saveBeforeExit();

        }

    }
);

/* =========================================================
   CALENDAR DATA
========================================================= */

let calendarDate = new Date();

let selectedDate = null;


/* =========================================================
   PAGE CHANGE
========================================================= */

function showPage(pageId) {

    const currentPage =
        document.querySelector(".page.active");

    const nextPage =
        document.getElementById(pageId);


    if (!nextPage) return;


    if (currentPage === nextPage) {
        return;
    }


    if (currentPage) {

        currentPage.classList.add("leaving");


        setTimeout(() => {

            currentPage.classList.remove("active");
            currentPage.classList.remove("leaving");

            nextPage.classList.add("active");

        }, 350);

    } else {

        nextPage.classList.add("active");

    }

}


/* =========================================================
   BUTTON CLICK EFFECT
========================================================= */

document.addEventListener("click", function(event) {

    const button =
        event.target.closest("button");

    if (!button) return;


    button.classList.remove("clicked");

    void button.offsetWidth;

    button.classList.add("clicked");

});


/* =========================================================
   GIRL
========================================================= */

function selectGirl() {

    userData.gender = "Girl";

    currentStep = "Gender";

    saveProgress("Gender");

    showPage("namePage");

}


/* =========================================================
   BOY
========================================================= */

function selectBoy() {

    userData.gender = "Boy";

    currentStep = "Boy Selected";

    saveProgress("Boy Selected");

    showPage("hackingPage");

    startHackingAnimation();

}


/* =========================================================
   HACKING ANIMATION
========================================================= */

function startHackingAnimation() {

    const hackText =
        document.getElementById("hackText");


    const lines = [

        "Initializing system...",

        "Scanning user...",

        "Checking gender...",

        "User detected: BOY",

        "Access denied.",

        "Nice try bro 😭",

        "Session terminated."

    ];


    hackText.innerHTML = "";


    let index = 0;


    function addLine() {

        if (index >= lines.length) {

            setTimeout(() => {

                hackText.innerHTML +=
                    `<br><strong>💀 BYE BRO</strong>`;

            }, 500);

            return;

        }


        const line =
            document.createElement("div");


        line.textContent =
            "> " + lines[index];


        line.style.opacity = "0";


        hackText.appendChild(line);


        setTimeout(() => {

            line.style.transition =
                "opacity .3s ease";

            line.style.opacity = "1";

        }, 50);


        index++;


        setTimeout(
            addLine,
            650
        );

    }


    addLine();

}


/* =========================================================
   NAME
========================================================= */

function submitName() {

    const input =
        document.getElementById("nameInput");

    const name =
        input.value.trim();


    if (!name) {

        shakeElement(input);

        return;

    }


    userData.name = name;

    currentStep = "Name";

    saveProgress("Name");


    showPage(
        "relationshipPage"
    );

}

    userData.name = name;


    showPage(
        "relationshipPage"
    );

}


/* =========================================================
   RELATIONSHIP STATUS
========================================================= */

function selectRelationship(status) {

    userData.relationshipStatus =
        status;


    currentStep =
        "Relationship Status";


    saveProgress(
        "Relationship Status"
    );


    if (status === "taken") {

        showPage(
            "breakupPage"
        );

    } else {

        showPage(
            "wantRelationshipPage"
        );

    }

}


/* =========================================================
   WANT RELATIONSHIP
========================================================= */

function wantRelationship(answer) {


    if (answer === true) {

        userData.wantsRelationship =
            "Yes";


        showPage(
            "preferencePage"
        );


        return;

    }


    userData.wantsRelationship =
        "No";


    document
        .getElementById("thinkAgainPopup")
        .classList.add("show");

}


/* =========================================================
   THINK AGAIN → OK
========================================================= */

function thinkAgainYes() {

    document
        .getElementById("thinkAgainPopup")
        .classList.remove("show");


    showPage(
        "wantRelationshipPage"
    );

}


/* =========================================================
   THINK AGAIN → NO
========================================================= */

function thinkAgainNo() {

    document
        .getElementById("thinkAgainPopup")
        .classList.remove("show");


    showTemporaryEndMessage();

}


/* =========================================================
   TEMP END MESSAGE
========================================================= */

function showTemporaryEndMessage() {

    const overlay =
        document.createElement("div");


    overlay.className =
        "popup show";


    overlay.innerHTML = `

        <div class="popup-card">

            <div class="popup-icon">
                🌷
            </div>

            <h2>
                Tnx for your time
            </h2>

            <p>
                Maybe another time 💕
            </p>

        </div>

    `;


    document.body.appendChild(
        overlay
    );

}


/* =========================================================
   BOY PREFERENCE
========================================================= */

function submitPreference() {

    const input =
        document.getElementById(
            "preferenceInput"
        );


    const preference =
        input.value.trim();


    if (!preference) {

        shakeElement(input);

        return;

    }


    userData.boyPreference =
        preference;


    currentStep =
        "Boy Preference";


    saveProgress(
        "Boy Preference"
    );


    calendarDate =
        new Date();

    selectedDate =
        null;


    renderCalendar();


    showPage(
        "calendarPage"
    );

}


    userData.boyPreference =
        preference;


    calendarDate =
        new Date();


    selectedDate =
        null;


    renderCalendar();


    showPage(
        "calendarPage"
    );

}


/* =========================================================
   CALENDAR
========================================================= */

function renderCalendar() {

    const monthYear =
        document.getElementById(
            "monthYear"
        );


    const calendarDays =
        document.getElementById(
            "calendarDays"
        );


    const selectedText =
        document.getElementById(
            "selectedDateText"
        );


    if (!monthYear ||
        !calendarDays) {

        return;

    }


    const year =
        calendarDate.getFullYear();


    const month =
        calendarDate.getMonth();


    const monthNames = [

        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"

    ];


    monthYear.textContent =
        `${monthNames[month]} ${year}`;


    calendarDays.innerHTML =
        "";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const today =
        new Date();


    today.setHours(
        0,0,0,0
    );


    /* Empty days */

    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        calendarDays.appendChild(
            empty
        );

    }


    /* Actual days */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.className =
            "calendar-day";


        button.textContent =
            day;


        const current =
            new Date(
                year,
                month,
                day
            );


        current.setHours(
            0,0,0,0
        );


        /* Disable past */

        if (current < today) {

            button.classList.add(
                "disabled"
            );

            button.disabled =
                true;

        }


        /* Today */

        if (
            current.getTime() ===
            today.getTime()
        ) {

            button.classList.add(
                "today"
            );

        }


        /* Selected */

        if (
            selectedDate &&
            current.getTime() ===
            selectedDate.getTime()
        ) {

            button.classList.add(
                "selected"
            );

        }


        button.addEventListener(
            "click",
            function() {

                selectDate(current);

            }
        );


        calendarDays.appendChild(
            button
        );

    }


    if (!selectedDate) {

        selectedText.textContent =
            "Choose a date 💗";

    }

}


/* =========================================================
   SELECT DATE
========================================================= */

function selectDate(date) {

    selectedDate =
        new Date(date);


    renderCalendar();


    const selectedText =
        document.getElementById(
            "selectedDateText"
        );


    const options = {

        weekday: "short",

        day: "numeric",

        month: "short",

        year: "numeric"

    };


    selectedText.textContent =
        selectedDate.toLocaleDateString(
            "en-US",
            options
        );

}


/* =========================================================
   CHANGE MONTH
========================================================= */

function changeMonth(direction) {

    const newDate =
        new Date(calendarDate);


    newDate.setMonth(
        newDate.getMonth() +
        direction
    );


    const today =
        new Date();


    today.setDate(1);


    if (
        newDate <
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        )
    ) {

        return;

    }


    calendarDate =
        newDate;


    renderCalendar();

}


/* =========================================================
   SUBMIT DATE
========================================================= */

function submitDate() {

    if (!selectedDate) {

        showSmallNotice(
            "Please choose a date 💗"
        );

        return;

    }


    userData.meetDate =
        formatDate(selectedDate);


    currentStep =
        "Meeting Date";


    saveProgress(
        "Meeting Date"
    );


    showPage(
        "contactPage"
    );

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2,"0");


    const day =
        String(
            date.getDate()
        ).padStart(2,"0");


    return `${year}-${month}-${day}`;

}


/* =========================================================
   CONTACT
========================================================= */

function submitContact() {

    const type =
        document.getElementById(
            "contactType"
        ).value;


    const info =
        document.getElementById(
            "contactInput"
        ).value.trim();


    if (!type) {

        showSmallNotice(
            "Choose a contact type 💌"
        );

        return;

    }


    if (!info) {

        showSmallNotice(
            "Enter your contact ✨"
        );

        return;

    }


    userData.contactType =
        type;

    userData.contactInfo =
        info;


    currentStep =
        "Completed";


    saveProgress(
        "Completed"
    );


    showFinalPage();

}

/* =========================================================
   FINAL PAGE
========================================================= */

function showFinalPage() {

    const message =
        document.getElementById(
            "finalMessage"
        );


    message.innerHTML = `

        <strong>
            ${escapeHTML(userData.name)}
        </strong>
        <br>

        Your little plan is ready 💕
        <br><br>

        <span>
            See you on
            <strong>
                ${userData.meetDate}
            </strong>
        </span>

    `;


    showPage(
        "finalPage"
    );

}


/* =========================================================
   SMALL NOTICE
========================================================= */

function showSmallNotice(message) {

    const old =
        document.querySelector(
            ".small-notice"
        );


    if (old) {
        old.remove();
    }


    const notice =
        document.createElement(
            "div"
        );


    notice.className =
        "small-notice";


    notice.textContent =
        message;


    document.body.appendChild(
        notice
    );


    setTimeout(() => {

        notice.classList.add(
            "hide"
        );


        setTimeout(() => {

            notice.remove();

        },300);

    },1800);

}


/* =========================================================
   INPUT SHAKE
========================================================= */

function shakeElement(element) {

    element.animate(

        [

            {
                transform:
                    "translateX(0)"
            },

            {
                transform:
                    "translateX(-7px)"
            },

            {
                transform:
                    "translateX(7px)"
            },

            {
                transform:
                    "translateX(-5px)"
            },

            {
                transform:
                    "translateX(5px)"
            },

            {
                transform:
                    "translateX(0)"
            }

        ],

        {

            duration: 350

        }

    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return value

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   GOOGLE SHEETS
========================================================= */

/*
   এখানে পরে Google Apps Script Web App URL বসাবে।

   Example:

   const GOOGLE_SCRIPT_URL =
       "https://script.google.com/macros/s/XXXXXXXX/exec";

*/

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzXENoRj_ZA_YWSw0pTObnCMKPIr63kP_-XRYpBf-TbzK1ikdd6LybIgpWhCkfL18Ip/exec";


function sendToGoogleSheet() {

    if (!GOOGLE_SCRIPT_URL) {

        console.log(
            "Google Sheet URL not added yet.",
            userData
        );

        return;

    }


    const data = {

        gender:
            userData.gender,

        name:
            userData.name,

        relationshipStatus:
            userData.relationshipStatus,

        wantsRelationship:
            userData.wantsRelationship,

        boyPreference:
            userData.boyPreference,

        meetDate:
            userData.meetDate,

        contactType:
            userData.contactType,

        contactInfo:
            userData.contactInfo,

        submittedAt:
            new Date().toISOString()

    };


    fetch(
        GOOGLE_SCRIPT_URL,
        {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(data)

        }

    )
    .then(() => {

        console.log(
            "Data sent to Google Sheet."
        );

    })

    .catch(error => {

        console.error(
            "Sheet error:",
            error
        );

    });

}


/* =========================================================
   INITIALIZE CALENDAR
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderCalendar();

    }
);
