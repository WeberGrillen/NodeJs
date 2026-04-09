import { Router } from 'express';

const router = Router();

const restaurants = ["Sultan", "Sheik", "Hero (Not heroin)","Poullet"]

router.get('/api/restaurants', (req, res) => {
    res.send({ data: restaurants });
})



export default router;