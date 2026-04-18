const router = require('express').Router();
const auth = require('../middleware/auth.middleware');
const ctrl = require('../controllers/task.controller');
const validate = require('../middleware/validate.middleware');
const { taskValidator } = require('../validators/task.validator');

router.post('/', auth, taskValidator, validate, ctrl.createTask);
router.get('/', auth, ctrl.getTasks);
router.get('/:id', auth, ctrl.getTask);
router.put('/:id', auth, taskValidator, validate, ctrl.updateTask);
router.delete('/:id', auth, ctrl.deleteTask);

module.exports = router;