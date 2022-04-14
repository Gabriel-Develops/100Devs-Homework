//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('#query').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value.split(' ').join('_')
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${choice}`
  console.log(document.querySelector('input').value.split(' ').join('_'))
  console.log(url)

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        document.querySelector('#next').style.display = 'inline-block'
        document.querySelector('#prev').style.display = 'inline-block'

        console.log(data)
        let currentDrink = 0
        printToScreen(data.drinks[currentDrink])

        document.querySelector('#next').addEventListener('click', function() {
          if (currentDrink >= data.drinks.length - 1)
          return
          printToScreen(data.drinks[++currentDrink])
          console.log(data.drinks[currentDrink])
        })

        document.querySelector('#prev').addEventListener('click', function() {
          if (currentDrink <= 0)
            return
          printToScreen(data.drinks[--currentDrink])
        })
      })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

function printToScreen(drink) {
  document.querySelector('h2').innerText = drink.strDrink
  document.querySelector('img').src = drink.strDrinkThumb

  let instructions = drink.strInstructions
  instructions = instructions.split('.')
  if (instructions[instructions.length - 1] === '')
    instructions.pop()

  document.querySelector('#instructions').innerHTML = ''

  let list = document.createElement('ol')
  document.querySelector('#instructions').appendChild(list)

  instructions.forEach(element => {
    let li = document.createElement('li')
    li.innerText = element + '.'
    document.querySelector('ol').appendChild(li)
  })
}

