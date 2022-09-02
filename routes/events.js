/*
    EVENTS ROUTES
    /api/events 
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/jwt-validate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;