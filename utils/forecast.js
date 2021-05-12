const request = require('request')

const forecast = (loc, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6c626ee103ab349f897fbc6eaeacd859&query=' + loc

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined," It is currently " + body.current.weather_descriptions + " in " + body.location.name +
                '\r\n The current temperature is ' + body.current.temperature + "°\r\n It feels like " + body.current.feelslike + "°"
            );
        }
    })
}

module.exports = forecast
