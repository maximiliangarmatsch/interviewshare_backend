require('crypto').randomBytes(64, function (err, buffer) {
  if (err) throw err
  const randomSecret = buffer.toString('hex')
  console.log(randomSecret)
})
