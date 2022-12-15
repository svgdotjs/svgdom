import request from 'request'

export const getFileBufferFromURL = (url, cb) => {
  var options = {
    url,
    method: 'get',
    encoding: null
  }

  console.log('Requesting image..')
  request(options, function (error, response, body) {
    if (error) {
      throw error
    } else {
      console.log('Response: StatusCode:', response && response.statusCode)
      console.log('Response: Body: Length: %d. Is buffer: %s', body.length, (body instanceof Buffer))
      cb(body)
    }
  })
}
