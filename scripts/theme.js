const body = document.querySelector('body')
const btnDarkMode = document.querySelector('#btn-dark-mode')

darkModeInit();

function darkModeInit() {
    if (localStorage.getItem('dark-mode')) {
        if (localStorage.getItem('dark-mode') == 'off') {
            btnDarkMode.style.backgroundImage = "url('../../assets/img/darkmode-off.svg')";
            body.classList.remove("dark-mode")
        } else {
            btnDarkMode.style.backgroundImage = "url('../../assets/img/darkmode-on.svg')";
            body.classList.add("dark-mode")
        }
    }
}


btnDarkMode.onclick = () => {
    if (localStorage.getItem('dark-mode') == 'on') {
        btnDarkMode.style.backgroundImage = "url('../../assets/img/darkmode-off.svg')";
        localStorage.setItem('dark-mode', 'off')
    } else {
        btnDarkMode.style.backgroundImage = "url('../../assets/img/darkmode-on.svg')";
        localStorage.setItem('dark-mode', 'on')
    }
    body.classList.toggle("dark-mode")
}