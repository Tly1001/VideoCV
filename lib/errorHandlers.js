const { notFound, unauthorized } = require('./errorMessages')

function errorHandler(err, req, res, next) {
  console.log('here')
  if (err.name === 'ValidationError') {
    console.log('entered if statement')

    const newErrors = {}
    for (const key in err.errors) {
      newErrors[key] = err.errors[key].message
    }
    return res.status(422).json(newErrors)
  }

  if (err.message === notFound || err.message === { Error: 'Not Found' }) {
    console.log('ping not found')
    return res.status(404).json({ message: 'Not Found' })
  }

  if (err.message === unauthorized) {
    return res.status(401).json({ message: unauthorized })
  }
  
  res.SendStatus(500)
  next(err)
}

module.exports = errorHandler