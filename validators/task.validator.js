const { body } = require('express-validator');

exports.taskValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date'),
  body('status')
    .optional()
    .isIn(['pending', 'completed'])
    .withMessage('Invalid status'),
];