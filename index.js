const express = require('express');
const path = require('path');
const {json} = require("express");
const e = require("express");


const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, 'mapUz');
app.use(express.static(static_path));
app.use(express.urlencoded({extended: true}));


app.set('mapUz engine', 'ejs');




let arrayOfMarker = [];

let currentTime;
setInterval(()=>{
    currentTime = Math.round(new Date().getTime() / 1000);

    if (arrayOfMarker.length !== 0){
        arrayOfMarker.forEach(marker => {
            marker.timer--;
            if (marker.timer <= 1){
                arrayOfMarker.splice(arrayOfMarker.indexOf(marker), 1);

            }
            console.log(marker.timer)
        })

    }

}, 1000)

app.get('/',function(req,res) {
    res.render(__dirname + '/Index.ejs')
});

app.post("/request", (req, res) => {
    let marker = {
        coord: req.body.coords,
        timer: req.body.countTime,
        timeInMoment: req.body.timeInMoment,

    }
   arrayOfMarker.push(marker)

})
app.get('/getCurrentCord',(req, res) => {
     res.send(JSON.stringify(arrayOfMarker[arrayOfMarker.length - 1]))

})
app.get('/getAllCords',(req, res) => {
    if (arrayOfMarker.length !== 0) {
        res.send(arrayOfMarker)
    }

})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})