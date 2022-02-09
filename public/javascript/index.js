const charactersAPI = new APIHandler()
// (
//   'https://minions-api.herokuapp.com/characters'
// )

window.addEventListener('load', () => {
  document
    .getElementById('fetch-all')
    .addEventListener('click', function (event) {
      charactersAPI
        .getFullList()
        .then((res) => {
          let text = ''
          res.data.forEach(
            (eachMinion) =>
              (text +=
                '<div class="characters-container">' +
                '<div class="character-info">' +
                '<div class="name">ID: ' +
                eachMinion.id +
                '</div>' +
                '<div class="name">Character Name: ' +
                eachMinion.name +
                '</div>' +
                '<div class="occupation">Character Occupation: ' +
                eachMinion.occupation +
                '</div>' +
                '<div class="cartoon">Is a Cartoon?: ' +
                eachMinion.cartoon +
                '</div>' +
                '<div class="weapon">Character Weapon:' +
                eachMinion.weapon +
                '</div>' +
                '</div>' +
                '</div>')
          )
          document.querySelector('#list').innerHTML = text
        })
        .catch((err) => console.error(err))
    })

  document
    .getElementById('fetch-one')
    .addEventListener('click', function (event) {
      const characterID = document.querySelector('#character-id').value
      charactersAPI
        .getOneRegister(Number(characterID))
        .then((minion) => {
          console.log(minion)

          const inputs = document.querySelectorAll('#edit-character-form input')
          inputs[0].value = minion.data.id
          inputs[1].value = minion.data.name
          inputs[2].value = minion.data.occupation
          inputs[3].value = minion.data.weapon
        })
        .catch((err) => console.error(err))
    })

  document
    .getElementById('delete-one')
    .addEventListener('click', function (event) {
      const characterID = document.querySelector('#character-id-delete').value
      charactersAPI
        .deleteOneRegister(characterID)
        .then(
          () =>
            (document.querySelector('#delete-one').style.backgroundColor =
              'green')
        )
        .catch((err) => {
          document.querySelector('#delete-one').style.backgroundColor = 'red'
          console.log(err)
        })
    })

  document
    .getElementById('edit-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault()
      const inputs = document.querySelectorAll('#edit-character-form input')
      const idMinion = document.querySelectorAll(
        '#edit-character-form input'
      )[0].value

      const minionData = {
        name: inputs[1].value,
        occupation: inputs[2].value,
        weapon: inputs[3].value,
        cartoon: inputs[4].checked,
      }
      console.log(minionData)

      charactersAPI
        .updateOneRegister(idMinion, minionData)
        .then(
          () =>
            (document.querySelector('#send-data').style.backgroundColor =
              'green')
        )
        .catch((err) => {
          console.error(err)(
            (document.querySelector('#send-data').style.backgroundColor = 'red')
          )
        })
    })

  document
    .getElementById('new-character-form')
    .addEventListener('submit', function (event) {
      event.preventDefault()
      const inputs = document.querySelectorAll('#new-character-form input')
      const name = inputs[0].value
      const occupation = inputs[1].value
      const weapon = inputs[2].value
      const cartoon = inputs[3].checked

      const info = { name, occupation, weapon, cartoon }
      console.log(info)
      charactersAPI
        .createOneRegister(info)
        .then(() => {
          document.querySelector('#send-data').style.backgroundColor = 'green'
        })
        .catch((err) => {
          document.querySelector('#send-data').style.backgroundColor = 'red'
          console.log(err)
        })
    })
})
