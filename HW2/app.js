    const express = require('express');
    const path = require('path');
    const app =  express();

    const CONTACTS = [
        {id: 1, name: 'Ed', value: '0939824980', marked: false}
    ]










    app.use(express.static(path.resolve(__dirname, 'client')));

    app.get('*', (req, res)=>{
        res.send(path.resolve(__dirname, 'client', 'index.html'));
    })

    // let users = [];
    // app.post('/api/v1/users', (req, res) => {
    //     let user = req.query.user;
    //     users.push(user);
    //     res.status(200).send('ok');
    // });
    //
    // app.get('/api/v1/users', (req, res) =>{
    //     res.status(200).send(users.toString());
    // })

    app.listen(80, ()=> console.log('Server has been started on port 80...'));