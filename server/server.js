const express = require('express');
const app = express();

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '1216',
    database: 'food'
});

app.get('/', (req, res) => {
    res.send("Hello world");
});
/* //user signup 
app.post('/signup', function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailaddress = req.body.emailaddress;
    const password = req.body.password;
    const address = req.body.address;

    db.query('INSERT INTO user (fistname, lastname, emailaddress, password, address) values(?,?,?,?,?)', 
        [firstName, lastName, emailaddress, password, address],
        (err, result) => {
            if (err) {
                console.error(err);
            } else{
                res.send("values Inserted");
            }
        }
    );
}); */


app.listen(3001, () => {
    console.log("Your server is running on port 3001");
});

