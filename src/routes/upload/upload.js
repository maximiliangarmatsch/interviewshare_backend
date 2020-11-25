const { audio: UploadAudio } = require('../../Components/upload/audio')

module.exports = function (app) {
  app.post('/upload/audio', UploadAudio)
}
