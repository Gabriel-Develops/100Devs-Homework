document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
    let choice = document.querySelector('input').value.split(' ').join('%20')
    let url = `https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://imsea.herokuapp.com/api/1?q=${choice}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)

        document.querySelector('section').innerHTML = ''

        let uniqData = Array.from(new Set(data.results))
        console.log('unique', new Set(data.results))

        uniqData.forEach(element => {
            let image = document.createElement('img')
            image.src = element
            image.setAttribute('class', 'masonry-item')
            document.querySelector('section').appendChild(image)
        })
    })
    .catch((error) => {
    console.error('Error:', error);
    })
}