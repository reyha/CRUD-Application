var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
  // Send PUT Request here
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Batman',
            'quote': 'I am more powerful'
        })
     })
     .then(res => {
       if (res.ok) return res.json()
     }).then(data => {
  console.log(data)
  window.location.reload()
})
})

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Batman'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})
