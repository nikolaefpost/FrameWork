    const validator = require('validator');
    const express = require('express');
    const path = require('path');
    const {v4} = require('uuid')
    const app =  express();

    let CONTACTS = [
        {id: v4(), name: 'Ed', value: '0939824980', marked: false}
    ]

    app.use(express.json())


// GET
    app.get('/api/v1/users', (req, res)=>{
        setTimeout(()=>{
            res.status(200).json(CONTACTS)
        },1000)
    })

// POST
    app.post('/api/v1/users', (req, res)=>{

        if (req.body.name.length<2)
            return res.status(206).json({massage: 'the user must have a name greater than two characters'})
        if (!validator.isMobilePhone(req.body.value, 'uk-UA'))
            return res.status(206).json({massage: 'enter a number in the format "0-- -------"'})
       const contact = {...req.body, id: v4(), marked: false}
        CONTACTS.push(contact)
        res.status(201).json(contact)
    })

// DELETE
    app.delete('/api/v1/users:id', (req, res)=>{
        CONTACTS = CONTACTS.filter(c=> c.id !== req.params.id)
        res.status(200).json({massage: 'contact has been deleted'})
    })

// PUT
    app.put('/api/v1/users:id', (req, res)=>{
        if (req.body.name.length<2)
            return res.status(206).json({massage: 'the user must have a name greater than two characters'})
        if (!validator.isMobilePhone(req.body.value, 'uk-UA'))
            return res.status(206).json({massage: 'enter a number in the format "0-- -------"'})
       const idx = CONTACTS.findIndex(c=>c.id === req.params.id)
        CONTACTS[idx] = req.body
        res.json(CONTACTS[idx])
    })


    app.use(express.static(path.resolve(__dirname, 'client')));

    app.get('*', (req, res)=>{
        res.send(path.resolve(__dirname, 'client', 'index.html'));
    })

    app.listen(80, ()=> console.log('Server has been started on port 80...'));