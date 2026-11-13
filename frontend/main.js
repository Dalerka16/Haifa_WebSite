/*dropdown window*/
let dropdown_window = document.querySelector('.dropdown-window')

function show_dropdown() {
    /*loading the courses from db*/
    dropdown_window.style.display = 'flex'
}

function hide_dropdown() {
    dropdown_window.style.display = 'none'
}

let input = document.querySelector('.search-input')
input.addEventListener('click', show_dropdown)

window.addEventListener(
    'click',
    (evt) => {
        let target = evt.target
        if (!target.matches('.search-input')) {
            hide_dropdown()
        }
    },
    false)

dropdown_window.addEventListener(
    'click',
    (evt) => {
        if (evt.target.matches('li')) {
            let chosen_courses = document.querySelector('.chosen-courses')
            let course_being_chosen = evt.target.parentNode.removeChild(evt.target)
            if (chosen_courses.querySelector('ul').children.length === 0) {
                let def_text = document.querySelector('.default-text')
                def_text.style.display = 'none'
            }
            course_being_chosen.classList.add('chosen-course')
            chosen_courses.querySelector('ul').appendChild(course_being_chosen)
        }
    },
    false)


/*Calendar build*/
const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי']
let calendar = document.querySelector('.calendar-container')
let t = 8
for (let i = 0; i < 78; ++i) {
    let child = document.createElement('div')
    child.setAttribute('class', 'cell')
    if (i < 6 && i > 0) {
        child.classList.add(`day-of-the-week`)
        child.innerHTML = days[i - 1]
        if(i===5)
            child.classList.add(`top-left-corner`)
    } else if (i % 6 === 0 || i % 6 === 5) {
        if (i % 6 === 0 && i !== 0) {
            child.classList.add(`time-of-the-day`)
            child.innerHTML = `${t++}:00`
            if(i===72)
                child.classList.add(`bottom-right-corner`)
        }else if(i===0)
            child.classList.add(`top-right-corner`)
        else if(i===77)
            child.classList.add(`bottom-left-corner`)
    }

    calendar.appendChild(child)
}


/*sessions*/
const sessions = []
