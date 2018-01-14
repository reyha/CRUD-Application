var update = document.getElementById('update')
var del = document.getElementById('delete')

update.addEventListener('click', function () {
  // Send PUT Request here
    fetch('list', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'priority':'None',
            'item': 'This is done!',
            'date': ''
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
  fetch('list', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'priority': 'Low'
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
