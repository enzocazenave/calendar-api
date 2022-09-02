const { response } = require("express");
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {
    const events = await Event.find().populate('user', 'name');

    res.json({
        ok: true,
        events
    }) ;
}

const createEvent = async(req, res = response) => {

    const event =  new Event(req.body);
    
    try {
        event.user = req.uid;
        const savedEvent = await event.save();

        res.json({
            ok: true,
            event: savedEvent
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {   
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento con ese id no existe'
            });
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para editar este evento'
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const newEventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        res.json({
            ok: true,
            event: newEventUpdated
        })
    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento con ese id no existe'
            })
        }

        if (event.user.toString()  !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true,
        })


    } catch(error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}