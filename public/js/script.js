
var country_lbl=document.getElementById("ctry_name")
var search_btn=document.getElementById("weather-btn")
var info_div=document.querySelector(".info")




const request = require("request")

const geocode = ( address , callback) => {

    const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address +  ".json?access_token=pk.eyJ1IjoiaXNsYW0yODQiLCJhIjoiY2wwamEzNmFhMGFtNTNkb3pqaXk4bXNnYSJ9.qYlrWIqo41gXgNNc4h8yIw"

  request ({url : geocodeUrl , json : true} , (error , response) => {
     
    if (error){
        callback ("unable to connect geocode service" , undefined)
    }else if (response.body.message)  {
        callback (response.body.message , undefined )
    } else if (response.body.features.length == 0) {
         callback("Unable to find location" , undefined)
    } else {

        callback(undefined , {
             longtitude : response.body.features[0].center[0],
             latitude : response.body.features[0].center[1]
        } )
       
    }
  })
}


const express = require("express")
const app = express()

const port = process.env.PORT || 3000


search_btn.addEventListener("click", function() {

    var location = country_lbl.value()
    console.log(location);
    country_lbl.value()=""
    info_div.style.display="none"
    geocode( location , (error , data) => {


        
        if(error !==undefined){
            app.get ('/' , (req,res) => {
                res.render('index' , {
                    title : "HOME",
                    error : error
                })
            })
            app.listen(port, () => {
                
                })
            
        }
        else{
            app.get ('/' , (req,res) => {
                res.render('index' , {
                    title : "HOME",
                    longtitude : data.longtitude,
                    latitude:data.latitude
                })
            })
            app.listen(port, () => {
               
                })
        }
    })


});
