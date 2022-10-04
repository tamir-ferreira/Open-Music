const moveBar = document.querySelectorAll('#range-bar')

moveBar.forEach(input => {
    input.oninput = (event) => {
        let target = event.target
        const min = target.min
        const max = target.max
        const val = target.value

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
    }
})
