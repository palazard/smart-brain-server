const handleSignin = (req, res, db, bcrypt)=>{

    const {email, password} = req.body;
    if (!email || !password){
        return res.status(400).json('incorrect form submission')
    }

    db('login').where({email:email}).select('hash')
    .then(data=>{
        if (bcrypt.compareSync(password, data[0].hash)){
            return db('users').select('*').where({email:email})
            .then(data=>{
                res.json(data[0])
            })
        } else {
            res.status(400).json("Error login");
        }
    }).catch(err=> res.status(400).json("Error login"));

}

module.exports = {
    handleSignin:handleSignin
}