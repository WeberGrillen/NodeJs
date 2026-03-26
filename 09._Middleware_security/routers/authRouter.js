import { Router } from "express";

const router = Router();


function isAdmin(req, res, next) {
    // this simulates getting the value froma database
    // and/or comparing tokens / sessions
    const isAdmin = true;
    if (isAdmin) {
        req.user = {
            isAdmin,
            username: "Bob"
        };
        return next();
    }
    res.status(403).send({ errorMesage: 'You are not an admin' })
}

router.get('/auth/admin', isAdmin, (req, res) => {
    console.log(req.user);
    res.send({ data: 'You are an Admin, you can see this: 10 active users' })    
});

export default router;