const express = require('express');
const {translate} = require('bing-translate-api')
const fs = require('node:fs');
const app = express();

const port = 3000;

app.use(express.urlencoded({extends: true}))
app.use(express.json())

app.get('/allNamesAndAlternatenames', async (req, res) => {
    try {
        fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(async data => {
            const streams = fs.createWriteStream('namesAndAlternatenames.csv');
            streams.write('name;codnomes\n')
            for (const name of data) {
                for (const codenomes of name.alternate_names) {
                    await translate(codenomes, null, 'pt').then((resp)=>{
                        if(resp.translation == undefined){
                           streams.write('without codnome\n') 
                        } else{
                            
                            streams.write(`${name.name};${resp.translation}\n`)
                        }
                    })
                }
                
            }
            streams.end()
            streams.on('finish', ()=>{
                res.status(200).send('File created successfully')
            })
        })
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Internal server error')
    }
});

app.post('/searchPersonage', async (req, res) => {
    const namePersonage = req.body.namePersonage;
    try {
        fetch('https://hp-api.onrender.com/api/characters')
        .then(response => response.json())
        .then(data => {
            
            let findPersonage = data.find(personage => personage.name.toLowerCase().replace(' ','') == namePersonage.toLowerCase().replace(' ',''))

            if (findPersonage == undefined) {
                res.status(404).send('Personage not found')
            } else {
                res.status(200).send(findPersonage)
            }
          
        })
        
    } catch (error) {
        console.log('Error: ',error);
        res.status(500).send('Internal server error')
    }
});

app.get('/spellsAndDescriptions', async (req, res) =>{
    try {
        fetch('https://hp-api.onrender.com/api/spells')
        .then(response => response.json())
        .then(async data => {
            let translateDescriptions = []

            for (const element of data) {
                   await translate(element.description,null,'pt').then((resp)=>{
                    translateDescriptions.push({
                        name: element.name,
                        description: resp.translation
                    })
                })
            }   
            
            res.status(200).send(translateDescriptions)
         
        })
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Internal server error')
    }
});




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});