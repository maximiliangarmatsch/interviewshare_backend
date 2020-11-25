exports.audio = async function (req, res, next) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.')
  }
  const mimeType = req.files.audio.mimetype.split('/')[0]
  console.log(mimeType)
  if (mimeType != 'audio') {
    res.status(205).send({ Error: 'Unauthorized File Type' })
  } else {
    const fileName = Date.now() + '-' + req.files.audio.name
    const destination = 'public/uploads/audio/' + fileName
    const file = req.files.audio
    file.mv(destination, function (err) {
      if (err) return res.status(500).send(err)
      res.status(200).send({ message: 'File Stored Successfully' })
    })
  }
}
