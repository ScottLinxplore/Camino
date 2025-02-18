// 登入/報名視窗開關函式
function openBurger() {
    document.getElementById("nav").style.display = "block";
    document.getElementById("burger").style.display = "none";
    document.getElementById("burger2").style.display = "block";
}
function closeBurger() {
    document.getElementById("nav").style.display = "none";
    document.getElementById("burger").style.display = "block";
    document.getElementById("burger2").style.display = "none";
}
function openSignInCanvas() {
    document.getElementById("signInCanvas").style.display = "flex";
}
function closeSignInCanvas() {
    document.getElementById("signInCanvas").style.display = "none";
}
function openVIPCanvas() {
    document.getElementById("VIPCanvas").style.display = "flex";
}
function closeVIPCanvas() {
    document.getElementById("VIPCanvas").style.display = "none";
}
function closeRegisterCanvas() {
    // 如果要做登入檢查，可在此加入判斷，目前直接打開報名視窗
    document.getElementById("registerCanvas").style.display = "none";
}
function openRegisterCanvas() {
    if (signIned == false) {
        openSignInCanvas(); // 如果尚未登入，先打開登入畫面
    } else {
        document.getElementById("registerCanvas").style.display = "flex"; // 已登入才開啟報名畫面
    }
}

// 點擊外部區域關閉對話框
window.onclick = function (event) {
    let signInCanvas = document.getElementById("signInCanvas");
    let registerCanvas = document.getElementById("registerCanvas");
    let VIPCanvas = document.getElementById("VIPCanvas");
    let nav = document.getElementById("nav");
    let burger = document.getElementById("burger");
    if (event.target === signInCanvas) {
        closeSignInCanvas();
    }
    if (event.target === registerCanvas) {
        closeRegisterCanvas();
    }
    if (event.target === VIPCanvas) {
        closeVIPCanvas();
    }
    if (event.target !== nav && event.target !== burger) {
        closeBurger();
    }
};

let signIned = false; // 全域變數，判斷是否登入

// 活動天數對應表
const eventDurations = {
    "camino_frances": 33,
    "sarria_santiago": 7,
    "camino_portugues": 13
};

window.onload = () => {
    // 綁定地圖與 GPX 相關操作
    let radios = document.getElementsByName("routeCheck");
    let gpxDownloadBN = document.getElementById("downloadGPX");
    let gpxs = {
        map1: "gpx/Camino Santiago Francés - Roncesvalles - Santiago de Compostela - GR 65 - Link Epilogo Finisterre y Muxía.gpx",
        map2: "gpx/Do Tours Aventura (Sarria - Santiago de Compostela).gpx",
        map3: "gpx/Camino del Portugues-Aereopuerto de Porto a Santiago 242km 8 etapas.gpx"
    };
    let gpxNames = {
        map1: "CaminoDeFrancais.gpx",
        map2: "SarriaToSantiago.gpx",
        map3: "CaminoDePortugal.gpx"
    };
    let maps = {
        map1: document.getElementById("map1"),
        map2: document.getElementById("map2"),
        map3: document.getElementById("map3")
    };

    function updateMapVisibility() {
        // 先隱藏所有地圖
        Object.values(maps).forEach(map => map.style.display = "none");
        // 找出選中的 radio，顯示對應的地圖與 GPX 連結
        let selectedRadio = document.querySelector('input[name="routeCheck"]:checked');
        if (selectedRadio) {
            maps[selectedRadio.value].style.display = "block";
            gpxDownloadBN.href = gpxs[selectedRadio.value];
            gpxDownloadBN.setAttribute("download", gpxNames[selectedRadio.value]);
        }
    }
    radios.forEach(radio => {
        radio.addEventListener("change", updateMapVisibility);
    });
    updateMapVisibility();

    // 綁定登入按鈕
    document.getElementById("signInBN").addEventListener("click", signIn);

    // 綁定活動日曆更新
    // 請確認 HTML 中有 id="eventDate" 與 id="eventSelect" 以及 id="calendar" 的元素
    let eventDateElem = document.getElementById("eventDate");
    let eventSelectElem = document.getElementById("eventSelect");
    if (eventDateElem && eventSelectElem) {
        eventDateElem.addEventListener("change", updateCalendar);
        eventSelectElem.addEventListener("change", updateCalendar);
    }
};

// 登入功能
function signIn() {
    let email = document.getElementById("keyInEmailBar").value;
    let password = document.getElementById("keyInPasswordBar").value;
    let signInBN = document.getElementById("signIn");
    let VIPInfor = document.getElementById("vipInfor");

    if (email && password) {
        signIned = true;
        alert("登入成功！");
        closeSignInCanvas();
        signInBN.style.display = "none";
        VIPInfor.style.display = "flex";

        // 在 VIPInformation 內顯示使用者的 Email
        VIPInformation.innerHTML =
            `<h2>會員資料</h2>
            <p>Email: ${email}</p>
            <p>姓名: 林敬庭</p>
            <p>連絡電話: 0982323264</p>
            <p>生日: 1999 / 01 / 06</p>
            <p>地址: 台中市西區大墩十一街558號</p>
            <hr>
            <h2>已報名活動</h2>
            `

    } else {
        alert("請輸入電子郵件和密碼！");
    }
}

// 報名提交函式
function submitRegistration() {
    let event = document.getElementById("eventSelect").value;
    let date = document.getElementById("eventDate").value;
    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let phone = document.getElementById("phoneInput").value;
    let notes = document.getElementById("notesInput").value;

    if (!name || !email || !phone || !date) {
        alert("請填寫所有欄位！");
        return;
    }

    // 建立一個新的報名資訊區塊
    let registrationDiv = document.createElement("div");
    registrationDiv.className = "registration-entry";
    registrationDiv.innerHTML = `
     <p><strong>活動:</strong> ${event}</p>
     <p><strong>日期:</strong> ${date}</p>
     <p><strong>姓名:</strong> ${name}</p>
     <p><strong>Email:</strong> ${email}</p>
     <p><strong>電話:</strong> ${phone}</p>
     <p><strong>備註:</strong> ${notes}</p>
     <hr>
    `;

    // 將這筆資訊附加到 VIPInformation 區塊中
    let VIPInformation = document.getElementById("VIPInformation");
    VIPInformation.appendChild(registrationDiv);

    alert(`報名成功！\n活動：${event}\n日期：${date}\n姓名：${name}\nE-mail：${email}\n電話：${phone}\n備註：${notes}`);
    closeRegisterCanvas();
}

// 更新日曆函式
function updateCalendar() {
    let startDate = document.getElementById("eventDate").value;
    let eventType = document.getElementById("eventSelect").value;
    let calendarElem = document.getElementById("calendar");

    if (!startDate || !eventType) {
        if (calendarElem)
            return;
    }
    let duration = eventDurations[eventType];
    let calendarHTML = generateCalendar(startDate, duration);
    if (calendarElem)
        calendarElem.innerHTML = calendarHTML;
    // 同步更新 #vipInforInput 的 CSS 樣式
    let vipInforInput = document.getElementById("vipInforInput");
    if (vipInforInput && window.innerWidth >= 600) {
        vipInforInput.style.display = "inline-block";
        vipInforInput.style.width = "50%";
    }
    let registerContent = document.getElementById("registerContent")
    if (vipInforInput && window.innerWidth <= 600) {
        registerContent.style.height = "200vh"
    }
}

// 依據開始日期與天數生成日曆 HTML
function generateCalendar(startDate, duration) {
    let start = new Date(startDate);
    let end = new Date(start);
    end.setDate(end.getDate() + duration - 1);

    let currentDate = new Date(start);
    let monthDays = {};

    // 將活動日期依月份分類
    while (currentDate <= end) {
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // 月份從0開始
        let date = currentDate.getDate();
        let key = `${year}-${month}`;
        if (!monthDays[key]) {
            monthDays[key] = [];
        }
        monthDays[key].push(date);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    let calendarHTML = "";
    for (let month in monthDays) {
        let [year, monthNumber] = month.split("-");
        calendarHTML += `<div class="calendar-month">
            <h3>${year} 年 ${monthNumber} 月</h3>
            <div class="days">`;
        // 假設每個月最多顯示 31 天
        for (let i = 1; i <= 31; i++) {
            let dayClass = monthDays[month].includes(i) ? "active-day" : "inactive-day";
            calendarHTML += `<span class="${dayClass}">${i}</span>`;
        }
        calendarHTML += `</div></div>`;
    }
    return calendarHTML;
}



