const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

const cors = require('cors')

app.use(cors())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(
        `<body>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date()}</p>
        </body>`);
})

app.delete('/api/persons/:id', (request, response) => {
    const id = parseInt(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

function getRandomInt(min, max) {
    // Ensure min and max are integers
    min = Math.ceil(min);
    max = Math.floor(max);
    // Generate random integer within the range [min, max]
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post('/api/persons', (request, response) => {
    const body = request.body
   
    if (!body.name || !body.number) {
        return response.status(400).json({ 
            error: 'name/number missing' 
          })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name already in phonebook' 
          })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: getRandomInt(0, 1000)
    }
  
    persons = persons.concat(person)
  
    response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})