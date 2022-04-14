document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
    const choice = document.querySelector('input').value.split(' ').join('_')
    const url = 'https://gtfo-cors--timmy_i_chen.repl.co/get?url=https://www.xeno-canto.org/api/2/recordings?query=' + choice
    console.log(url)

    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
            console.log(data.recordings[0])

            // Clear containers content
            document.querySelector('#container').innerHTML = ''

            // Add audio element
            let audio = document.createElement('audio')
            document.querySelector('#container').appendChild(audio)
            audio.setAttribute('controls', '')
            audio.setAttribute('autoplay', '')
            audio.src = data.recordings[0].file

            // Add name of bird
            document.querySelector('h2').innerText = data.recordings[0].en

            // Add location of bird
            let location = document.createElement('div')
            location.innerHTML = `<div class="mapouter"><div class="gmap_canvas"><iframe width="1080" height="540" id="gmap_canvas" src="https://maps.google.com/maps?q=${data.recordings[0].lat},%20${data.recordings[0].lng}&t=k&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org"></a><br><style>.mapouter{position:relative;text-align:right;height:540px;width:1080px;}</style><a href="https://www.embedgooglemap.net">google maps embed api</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:540px;width:1080px;}</style></div></div>`
            // `<div class="mapouter"><div class="gmap_canvas"><iframe width="1080" height="540" id="gmap_canvas" src="https://maps.google.com/maps?q=${data.recordings[0].lat},%20${data.recordings[0].lng}&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://123movies-to.org"></a><br><style>.mapouter{position:relative;text-align:right;height:540px;width:1080px;}</style><a href="https://www.embedgooglemap.net">google maps embed api</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:540px;width:1080px;}</style></div></div>`
            document.querySelector('#container').appendChild(location)
            console.log(location.innerHTML)

            // Add location header
            let locationHeader = document.createElement('h2')
            locationHeader.innerText = `Location: ${data.recordings[0].loc}`
            document.querySelector('#container').appendChild(locationHeader)
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
}