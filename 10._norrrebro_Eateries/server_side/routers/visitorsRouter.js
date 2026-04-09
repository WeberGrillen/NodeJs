import { Router } from 'express';

const router = Router();

router.get('/api/visitors', (req, res) => {
    res.send({ data: req.session.visitorCount || 0 });
})

router.post('/api/visitors', (req, res) => {
    // If no visitor is 0 set to 1 else plus 1 visitor
    req.session.visitorCount = !req.session.visitorCount ? 1 : req.session.visitorCount + 1
    res.send({ data: req.session.visitorCount });
})

export default router;