const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Organization=require('../models/organization');
const jwt = require('jsonwebtoken');
const md5=require('md5')
const Event = require("../models/events")
const Slots = require("../models/slots");
const Bookedslot = require("../models/bookedslot");
const DistributedRation=require("../models/distributedRation");
const Ration=require("../models/ration")
require("dotenv/config");

const app = express(); 
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
const router = express.Router();
//getting all events
router.get("/events", async(req,res)=>{
    const events = await Event.find({});
    return res.json(events);
});

//all slots from perticular event
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

//booking slot 
router.patch("/events/:id/slots/:sid", async (req, res) => {
    try {
        const eventId = req.params.id
        const slot_id = req.params.sid
        const slot = await Slots.findOne({
            _id: slot_id
        })
        const currentTime = new Date();
        if (currentTime < slot.end_time && currentTime >= slot.start_time) {
            if (slots.limit > 0) {
                await Slots.updateOne({
                    _id: slot_id,
                },{ $inc: {
                    limit: -1,
                }})
                const newbookedslot=new Bookedslot({
                    user:req.user._id,
                    slot:slot_id
                })
               const bookedSlot= await newbookedslot.save();
                res.send(bookedSlot).status(200)
            }
            
        }
        // const slots = await Slots.updateOne({})
    }catch(err){
        res.send(err).status(400);
    }
})

//buy Ration
router.post("/events/:id/slots/:sid/rations/:rid",async(req,res)=>{
    const quantity=req.body.quantity;
    const ration_id=req.params.rid;
    const event_id=req.params.id;

    const ration = await Ration.findOne({
        _id: ration_id
    })

    if (ration.stock >= quantity) {
        const rationupdate=await Ration.updateOne({_id:ration_id},{
            $inc:{
                stock:-quantity
            }
        })
        const insetbill=new DistributedRation({
            user:User.id,
            ration:ration_id,
            event:event_id,
            quantity:quantity
        })
    }
   
})

router.post("/")

module.exports = router;
