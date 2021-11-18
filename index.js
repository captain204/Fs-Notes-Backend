const { response, request } = require('express')
const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

let notes = [
    {
        'id':1,
        'content':"HTML Is Easy",
        'date': "2021-10-30T17:30:31.098Z",
        'important':true
    },
    {
        'id':2,
        'content':"Browser can execute only Javascript",
        'date': "2021-10-30T17:30:31.098Z",
        'important':true
    },
    {
        'id':3,
        'content': "GET and POST are the most important methods of HTTP protocol",
        'date': "2021-10-30T17:30:31.098Z",
        'important':true
    },
    {
        'id':4,
        'content':"Programming is very difficult",
        'date': "2021-10-30T17:30:31.098Z",
        'important':true
    }
]

app.get('/',(request,response) => {
    response.send('<h1>Hello World<h1>')
})

app.get('/api/notes',(request, response)=>{
    response.json(notes)
})

const generatedId = ()=>{
    const maxId = notes.length > 0 
                  ? Math.max(...notes.map(n => n.id))
                  :0
    return maxId + 1
}

app.post('/api/notes',(request,response)=>{
    const body = request.body
    
    if(!body.content){
      return response.status(400).json({
        error:'content missing'
      })
    }

    const note = {
        content:body.content,
        important:body.important || false,
        date:new Date(),
        id:generatedId()
    }

    notes = notes.concat(note)
    console.log(note)
    response.json(note)
})

app.get('/api/notes/:id',(request,response)=>{
    const id = Number(request.params.id)
    const note = notes.find(note=>note.id === id)
    if(note){
        response.json(note)
    }else{
        response.status(404).end() 
    }
})

app.delete('/api/notes/:id',(request,response)=>{
    const id = Number(request.params.id)
    notes = notes.filter(note=>note.id !==id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Sever running on ${PORT}`)
})


