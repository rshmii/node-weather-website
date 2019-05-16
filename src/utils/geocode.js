const request =  require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?limit=2&access_token=pk.eyJ1IjoicmFzaG1pbXV0aGEiLCJhIjoiY2p1aWpzMzVyMHdrczQ0c2FmbWNzazdvbCJ9.AEmrQUvILj_ioO1oHkgvhw'

    //request({url: url, json: true}, (error, response) => {  
    request({url, json: true}, (error, { body }) => {   //Using shorthand property on url and destructuring on response
        if (error){
            callback('Unable to connect to location service!', undefined)
        //}else if(response.body.features.length === 0) {
        }else if(body.features.length === 0) {
        callback('Unable to find location! Try another search', undefined)
        }else {
            callback(undefined, {
                // longitude : response.body.features[0].center[0],
                // latitude : response.body.features[0].center[1],
                // location : response.body.features[0].place_name
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
    }
})

}

module.exports = geocode