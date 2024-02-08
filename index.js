const express = require("express");

const port = 4000;
const app = express();

app.use(express.json());

const users = [{ id: 1, name: "Nino", cost:400 }];

app.get("/api/users", (req, res) => {
  res.json({ success: true, data: users });
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === Number(id));
  if(!user){
    res.status(400);
    res.json({success: false, data: null});
  }
  res.send({ success: true, data: user });
});
app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});


app.post('/api/users', (req, res) => {
    const user = req.body;
    const lastId = users[users.length - 1]?.id;
    user.id = lastId ? lastId + 1 : 1;
    users.push(user);
    res.send({success: true, data: user});
});


app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((u) => u.id === Number(id));
    console.log('index:', index);
    if(index === -1){
        res.status(400);
        res.send({
            success: false, 
            data: null, 
            message: `User with ${id} not found`,
        });
    }
    const user = users[index];
    users = users.filter((u) => u.id !== Number(id));
    res.send({success: true, data: user, message: "User deleted"});
});

app.put('/api/users/:id', (req, res) => {
    const userData = req.body;
    const {id} = req.params;
    const index = users.findIndex((u) => u.id === Number(id));
    let user = users[index];
    user = {
        ...user,
        ...userData,
    };
    users[index] = user;
    res.json({success: true, data: user, message: "User ubdated"});

});







//C - create
//R - get
//U - update
//D - delete