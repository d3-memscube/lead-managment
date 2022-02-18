const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const leadModel = require('./models/LeadSchema');
const { response } = require("express");
const csv = require('csv-parser')
const fs = require('fs')
const results = [];
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))



app.use(bodyParser.json())

app.use(cors())

mongoose.connect('mongodb+srv://souviksaha541:souvik2000saha@cluster0.qllo7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.post('/post/leads', async (req, res) => {
    const lead = new leadModel(req.body);

    try {
        await lead.save();
        res.send(lead);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/list/leads', async (req, res) => {
    const leads = await leadModel.find({});

    try {
        res.send(leads);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/get/lead', async (req, res) => {
    const {id} = req.query;
    console.log(id);
    const leads = await leadModel.find({ _id: id});

    try {
        res.send(leads);
        console.log(leads);
    } catch (err) {
        res.status(500).send(err);
        console.log('error', err);
    }
});

app.put('/patch/lead/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const { title, firstName, lastName, email, assignee, leadStatus, leadSource, leadRating, phone, companyName, industry, addressLine2, addressLine1, city, state, country, zipcode} = req.body;

    const query = { _id: id };
    const leads = await leadModel.findOneAndUpdate(query, {
        "$set": {
            "title": title,
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "assignee": assignee,
            "leadStatus": leadStatus,
            "leadSource": leadSource,
            "leadRating": leadRating,
            "phone": phone,
            "companyName": companyName,
            "industry": industry,
            "addressLine2": addressLine2,
            "city": city,
            "state": state,
            "zipcode": zipcode,
            "copuntry": country,
            "addressLine1": addressLine1,
        }
    });

    try {
        res.send(leads);
        console.log(leads);
    } catch (err) {
        res.status(500).send(err);
        console.log('error', err);
    }
});

app.post('/post/lead/bulk', async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const leads = await leadModel.collection.insertMany(data);
        res.send(leads);
        console.log(leads);
    } catch (err) {
        res.status(500).send(err);
        console.log('error', err);
    }
})

app.post('/convert/tojson', async (req, res) => {
    const {data} = req.body;
    fs.createReadStream(data).pipe(csv()).on('data', (data) => results.push(data)).on('end', () => {
        console.log('results', results);
        res.send(results);
    });
})

app.delete('/delete/lead/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);

    const leads = await leadModel.findOneAndDelete({ _id: id });

    try {
        res.send('Lead Deleted Successfully');
        console.log(leads);
    } catch (err) {
        res.status(500).send(err);
        console.log('error', err);
    }
})

app.listen(port, () => {
    console.log(`App listening on ${port}`)
});