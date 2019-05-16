const request =  require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1c21520690d5e652a31636551eb0d5e0/'+latitude+',' + longitude

    //request({url : url, json : true}, (error, response)=>{
    request({url, json : true}, (error, { body })=>{    //Using shorthand property on url and destructuring on response
        if (error){
            callback('Unable to connect to weather service', undefined)
        //}else if(response.body.error){
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
        
            
    })
}

module.exports = forecast