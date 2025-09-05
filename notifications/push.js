const express = require('express');
const router = express.Router();

// Endpoint para push notification
router.post('/push', (req, res) => {
    const { token, message } = req.body;

    if (!token || !message) {
        return res.status(400).json({ error: 'Token and message are required' });
    }

    // Lógica para enviar push notification usando o token e a mensagem

    res.status(200).json({ success: true, message: 'Notification sent successfully' });
});

module.exports = router;