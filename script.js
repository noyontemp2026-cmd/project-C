/* =========================================================
   #projectC
   COMPLETE JAVASCRIPT
========================================================= */


/* =========================================================
   GOOGLE SHEET
========================================================= */

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbzXENoRj_ZA_YWSw0pTObnCMKPIr63kP_-XRYpBf-TbzK1ikdd6LybIgpWhCkfL18Ip/exec";


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

    contactInfo: "",

    lastStep: ""

};


/* =========================================================
   SESSION ID
   One browser session = one Sheet row
========================================================= */

let sessionId =
    sessionStorage.getItem(
        "projectC_session"
    );


if (!sessionId) {

    sessionId =
        "PC-" +
        Date.now() +
        "-" +
        Math.random()
            .toString(36)
            .substring(2, 8);

    sessionStorage.setItem(
        "projectC_session",
        sessionId
    );

}


/* =========================================================
   CALENDAR
========================================================= */

let calendarDate =
    new Date();

let selectedDate =
    null;


/* =========================================================
   CURRENT STEP
========================================================= */

let currentStep =
    "Opened";


/* =========================================================
   GOOGLE SHEET SAVE
========================================================= */

function saveProgress(step) {

    currentStep =
        step || currentStep;

    userData.lastStep =
        currentStep;


    const data = {

        sessionId:
            sessionId,

        timestamp:
            new Date().toISOString(),

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

        lastStep:
            userData.lastStep

    };


    const payload =
        JSON.stringify(data);


    /*
       sendBeacon is used so the request
       can also be sent when the page is
       being closed/backgrounded.
    */

    try {

        const blob =
            new Blob(
                [payload],
                {
                    type:
                        "text/plain;charset=UTF-8"
                }
            );


        const sent =
            navigator.sendBeacon(
                GOOGLE_SCRIPT_URL,
                blob
            );


        if (sent) {

            console.log(
                "Progress saved:",
                currentStep
            );

            return;

        }

    } catch (error) {

        console.log(
            "Beacon failed:",
            error
        );

    }


    /*
       Fallback
    */

    fetch(
        GOOGLE_SCRIPT_URL,
        {

            method: "POST",

            mode: "no-cors",

            headers: {

                "Content-Type":
                    "text/plain;charset=UTF-8"

            },

            body:
                payload,

            keepalive:
                true

        }

    ).catch(
        error => {

            console.log(
                "Save failed:",
                error
            );

        }
    );

}


/* =========================================================
   SAVE BEFORE PAGE/TAB CLOSE
========================================================= */

function saveBeforeExit() {

    saveProgress(
        currentStep
    );

}


window.addEventListener(
    "pagehide",
    saveBeforeExit
);


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
   PAGE CHANGE
========================================================= */

function showPage(pageId) {

    const currentPage =
        document.querySelector(
            ".page.active"
        );


    const nextPage =
        document.getElementById(
            pageId
        );


    if (!nextPage) {

        console.error(
            "Page not found:",
            pageId
        );

        return;

    }


    if (
        currentPage ===
        nextPage
    ) {

        return;

    }


    if (currentPage) {

        currentPage.classList.add(
            "leaving"
        );


        setTimeout(
            function() {

                currentPage.classList.remove(
                    "active"
                );

                currentPage.classList.remove(
                    "leaving"
                );


                nextPage.classList.add(
                    "active"
                );

            },
            350
        );

    }

    else {

        nextPage.classList.add(
            "active"
        );

    }

}


/* =========================================================
   BUTTON ANIMATION
========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const button =
            event.target.closest(
                "button"
            );


        if (!button) {

            return;

        }


        button.classList.remove(
            "clicked"
        );


        void button.offsetWidth;


        button.classList.add(
            "clicked"
        );

    }
);


/* =========================================================
   GIRL
========================================================= */

function selectGirl() {

    userData.gender =
        "Girl";


    saveProgress(
        "Gender"
    );


    showPage(
        "namePage"
    );

}


/* =========================================================
   BOY
========================================================= */

function selectBoy() {

    userData.gender =
        "Boy";


    saveProgress(
        "Boy Selected"
    );


    showPage(
        "hackingPage"
    );


    startHackingAnimation();

}


/* =========================================================
   HACKING ANIMATION
========================================================= */

function startHackingAnimation() {

    const hackText =
        document.getElementById(
            "hackText"
        );


    if (!hackText) {

        return;

    }


    const lines = [

        "Initializing system...",

        "Scanning user...",

        "Checking gender...",

        "User detected: BOY",

        "Access denied.",

        "Nice try bro 😭",

        "Session terminated."

    ];


    hackText.innerHTML =
        "";


    let index =
        0;


    function addLine() {

        if (
            index >=
            lines.length
        ) {

            setTimeout(
                function() {

                    hackText.innerHTML +=
                        "<br><strong>💀 BYE BRO</strong>";

                },
                500
            );

            return;

        }


        const line =
            document.createElement(
                "div"
            );


        line.textContent =
            "> " +
            lines[index];


        line.style.opacity =
            "0";


        hackText.appendChild(
            line
        );


        setTimeout(
            function() {

                line.style.transition =
                    "opacity .3s ease";

                line.style.opacity =
                    "1";

            },
            50
        );


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
        document.getElementById(
            "nameInput"
        );


    const name =
        input.value.trim();


    if (!name) {

        shakeElement(
            input
        );

        return;

    }


    userData.name =
        name;


    saveProgress(
        "Name"
    );


    showPage(
        "relationshipPage"
    );

}


/* =========================================================
   RELATIONSHIP
========================================================= */

function selectRelationship(
    status
) {

    userData.relationshipStatus =
        status;


    saveProgress(
        "Relationship Status"
    );


    if (
        status ===
        "taken"
    ) {

        showPage(
            "breakupPage"
        );

    }

    else {

        showPage(
            "wantRelationshipPage"
        );

    }

}


/* =========================================================
   WANT RELATIONSHIP
========================================================= */

function wantRelationship(
    answer
) {

    if (
        answer ===
        true
    ) {

        userData.wantsRelationship =
            "Yes";


        saveProgress(
            "Wants Relationship: Yes"
        );


        showPage(
            "preferencePage"
        );


        return;

    }


    userData.wantsRelationship =
        "No";


    saveProgress(
        "Wants Relationship: No"
    );


    document
        .getElementById(
            "thinkAgainPopup"
        )
        .classList.add(
            "show"
        );

}


/* =========================================================
   THINK AGAIN → OK
========================================================= */

function thinkAgainYes() {

    document
        .getElementById(
            "thinkAgainPopup"
        )
        .classList.remove(
            "show"
        );


    saveProgress(
        "Think Again"
    );


    showPage(
        "wantRelationshipPage"
    );

}


/* =========================================================
   THINK AGAIN → NO
========================================================= */

function thinkAgainNo() {

    document
        .getElementById(
            "thinkAgainPopup"
        )
        .classList.remove(
            "show"
        );


    saveProgress(
        "Ended - No Relationship"
    );


    showTemporaryEndMessage();

}


/* =========================================================
   TEMP END
========================================================= */

function showTemporaryEndMessage() {

    const overlay =
        document.createElement(
            "div"
        );


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

        shakeElement(
            input
        );

        return;

    }


    userData.boyPreference =
        preference;


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


    if (
        !monthYear ||
        !calendarDays
    ) {

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
        monthNames[month] +
        " " +
        year;


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
        0,
        0,
        0,
        0
    );


    /* Empty spaces */

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


    /* Days */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


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
            0,
            0,
            0,
            0
        );


        /* Past */

        if (
            current <
            today
        ) {

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

                selectDate(
                    current
                );

            }
        );


        calendarDays.appendChild(
            button
        );

    }


    if (
        !selectedDate &&
        selectedText
    ) {

        selectedText.textContent =
            "Choose a date 💗";

    }

}


/* =========================================================
   SELECT DATE
========================================================= */

function selectDate(
    date
) {

    selectedDate =
        new Date(date);


    renderCalendar();


    const selectedText =
        document.getElementById(
            "selectedDateText"
        );


    if (!selectedText) {

        return;

    }


    selectedText.textContent =
        selectedDate.toLocaleDateString(
            "en-US",
            {
                weekday:
                    "short",

                day:
                    "numeric",

                month:
                    "short",

                year:
                    "numeric"
            }
        );

}


/* =========================================================
   CHANGE MONTH
========================================================= */

function changeMonth(
    direction
) {

    const newDate =
        new Date(
            calendarDate
        );


    newDate.setMonth(
        newDate.getMonth() +
        direction
    );


    const today =
        new Date();


    today.setDate(
        1
    );


    const minimum =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );


    if (
        newDate <
        minimum
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
        formatDate(
            selectedDate
        );


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

function formatDate(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

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


    if (!message) {

        return;

    }


    message.innerHTML = `

        <strong>
            ${escapeHTML(
                userData.name
            )}
        </strong>

        <br>

        Your little plan
        is ready 💕

        <br><br>

        <span>

            See you on

            <strong>
                ${escapeHTML(
                    userData.meetDate
                )}
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

function showSmallNotice(
    message
) {

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


    setTimeout(
        function() {

            notice.classList.add(
                "hide"
            );


            setTimeout(
                function() {

                    notice.remove();

                },
                300
            );

        },
        1800
    );

}


/* =========================================================
   INPUT SHAKE
========================================================= */

function shakeElement(
    element
) {

    if (!element) {

        return;

    }


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
            duration:
                350

        }

    );

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value || ""
    )

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
   INITIALIZE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderCalendar();

    }
);
