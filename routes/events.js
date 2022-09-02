/*
    EVENTS ROUTES
    /api/events 
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { fieldValidator } = require("../middlewares/field-validators");
const { validateJWT } = require('../middlewares/jwt-validate');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

router.use(validateJWT);

router.get('/', getEvents);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        fieldValidator
    ], 
    createEvent
);

router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;