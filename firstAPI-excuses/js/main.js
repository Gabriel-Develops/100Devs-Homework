document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
    const choice = document.querySelector('select').value

    let count = Math.trunc(document.querySelector('input').value)
    if (count < 1) {
        count = 1
    } else if (count > 10) {
        count = 10
    }

    const url = `https://excuser.herokuapp.com/v1/excuse/${choice}/${count}`

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            clearExcuses()
            addExcuses(data)
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}

function clearExcuses() {
    let div = document.querySelector('div')
    let children = Array.from(div.childNodes)

    if (children.length > 0)
        div.innerHTML = ''
}

function addExcuses(data) {
    data.forEach(element => {
        let h2 = document.createElement('h2')
        h2.innerText = element.excuse
        document.querySelector('div').insertAdjacentElement('beforeend', h2)
    })
}