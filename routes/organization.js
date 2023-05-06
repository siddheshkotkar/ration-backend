const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Organization=require('../models/organization');
const jwt = require('jsonwebtoken');
const md5=require('md5')
const Event = require("../models/events");
const Ration = require("../models/ration");
const Slots = require("../models/slots");

require("dotenv/config");

const app = express(); 
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
const router = express.Router();
//getting all events
router.get("/events", async(req,res)=>{
    const events = await Event.find({
        organizationId : req.user._id
    })
    return res.json(events);

})

//Creating events
router.post("/events",async(req,res)=>{
    const {start_time, end_time,name} = req.body;
    const event = new Event({
        start_time,
        end_time,
        organizationId: req.user._id,
        name
    })
    try
    {
        const newEvent = await event.save();
        return res.json(newEvent);
    }
    catch(err)
    {
        return res.status(400).json({error: err.message})
    }
});

//Update events
router.put("/events/:id", async(req,res)=>{
    const {start_time, end_time, name} = req.body;
    const id = req.params.id;
    try
    {
        const updatedEvent = await Event.findByIdAndUpdate(id,{
            start_time,
            end_time,
            name
        })
        
        return res.json(updatedEvent);
    }
    catch(err)
    {
        return res.status(400).json({error: err.message})
    }
})

//delete event
router.delete("/events/:id", async(req,res)=>{
 
    const id = req.params.id;
    try
    {
       const deleteEvent = await Event.deleteOne({_id:id})
        
        return res.json(deleteEvent);
    }
    catch(err)
    {
        return res.status(400).json({error: err.message})
    }
})

// get all rations
router.get("/ration", async (req, res) => {
    try {
        const rations = await Ration.find({
            organization: req.user._id
        })
        return res.status(200).json(rations)
    }
    catch(err) {
        return res.status(400).json({error: err.message})
    }
})

//create ration
router.post("/ration", async (req, res) => {
    const {name, type, price, stock, manufacturing_date, expiration_date} = req.body

    try {
        const ration = new Ration({
            name,
            type,
            price,
            stock,
            manufacturing_date,
            expiration_date,
            organization: req.user._id
        })

        const newRation = await ration.save()
        return res.status(200).json(newRation)

    }
    catch(err) {
        return res.status(400).json({error: err.message})
    }
})

//update ration
router.put("/ration/:id", async (req, res) => {
    const {name, type, price, stock, manufacturing_date, expiration_date, organization} = req.body
    const id = req.params.id;

    try {
        const updatedRation = await Ration.findByIdAndUpdate(id, {
            name,
            type,
            price,
            stock,
            manufacturing_date,
            expiration_date,
            organization
        })
        return res.status(200).json(updatedRation)
    }
    catch(err) {
        return res.status(400).json({error: err.message})
    }
})

//delete ration
router.delete("/ration/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedRation = await Ration.deleteOne({
            _id: id
        })
        return res.status(200).json(deletedRation)
    }
    catch(err) {
        return res.status(400).json({error: err.message})
    }
})

//get all slots of perticular event
router.get("/events/:id/slots", async (req, res) => {
    try {
        const eventId = req.params.id
        const slots = await Slots.find({
            event: eventId
        }).populate('rations.ration')

        return res.status(200).json(slots)
    }
    catch(err) {
        return res.status(400).json({error: err.message})
    }
})

//create slots in events
router.post("/events/:id/slots", async (req, res) => {
    try {
        const {start_time, end_time, rations, limit} = req.body;
        const slot = new Slots({
            start_time,
            end_time,
            rations,
            limit
        });
        const newslot = await slot.save();
        return res.status(200).json(newslot)
    } catch (err) {
        return res.status(400).json({error: err.message})
    }
})

//update slots of an event
router.put("/events/:id/slots/:sid", async (req, res) => {
    try {
        const {start_time, end_time, rations, limit} = req.body;
        const slot_id = req.params.sid
        const slot = await Slots.findByIdAndUpdate(slot_id,{
            start_time,
            end_time,
            rations,
            limit
        });
        return res.status(200).json(slot)
    } catch (err) {
        return res.status(400).json({error: err.message})
    }
})

//delete slots sof any event
router.delete("/events/:id/slots/:sid", async (req, res) => {
    try {
        const slot_id = req.params.sid
        const slot = await Slots.deleteOne({
            _id: slot_id,
        });
        return res.status(200).json(slot)
    } catch (err) {
        return res.status(400).json({error: err.message})
    }
})

module.exports = router;