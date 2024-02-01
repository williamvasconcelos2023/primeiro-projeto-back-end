
const express = require ("express")
const uuid = require ("uuid")

const port = 3000

const app = express()
app.use(express.json())


const users = []


const checkUserid = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex ( user => user.id === id)


    if(index < 0){
        return response.status(404).json({message:"User not found!"})
    }

    request.userIndex = index
    request.userId = id

 next()
}


app.get("/users", (request, response) => {

    return response.json(users)

})

app.post("/users", (request, response) => {
    const {name, age} = request.body

    const user = { id:uuid.v4(), name, age}

    console.log(uuid.v4())
    users.push(user)

    return response.status(201).json(user)

})


app.put("/users/:id", checkUserid, (request, response) => {
    const{name , age} = request.body

    const index = request.userIndex
    const id = request.userId

    const updatedUser = {id, name, age}

    
    users[index] = updatedUser

    return response.json(updatedUser)

})


app.delete("/users/:id", checkUserid, (request, response) => {

    const index = request.userIndex


    users.splice(index, 1)


    return response.status(204).json()

})



app.listen(port, ()=> {
    console.log("Server started on port")})












