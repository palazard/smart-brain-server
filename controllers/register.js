const handleRegister = (req, res, db, bcrypt)=>{
    
    const {email, name, password} = req.body;
    if (!email || !name || !password){
        return res.status(400).json('incorrect form submission')
    }

    bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
            res.status(400).json("error processing data")
        } else {
            const password=hash;
            db.transaction(trx=>{
                trx.insert({
                    hash: password,
                    email: email
                })
                .into("login")
                .returning('email')
                .then(loginEmail=>{
                    return trx.insert({
                        name: name,
                        email: loginEmail[0].email,
                        joined: new Date()
                    })
                    .into('users')
                    .returning('*')
                    .then(user => res.json(user[0]))
                })
                .then(trx.commit)
                .catch(trx.rollback);
             })
             .catch(err=> res.status(400).json('Unable to register'))
        }
    });

}

module.exports ={
    handleRegister:handleRegister
} 