const MESSAGES = require('../../domain/messages');

module.exports = (handler, action) => async (req, res) => {
  try {
    const { params, body } = req;

    const result = await handler[action]({ ...params, ...body });

    const { status } = result;
    
    res.status(status).send(result)
  } catch (err) {
    res.status(500).send(MESSAGES.route.error)
  }
};
