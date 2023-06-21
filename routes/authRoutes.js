const passport = require('passport')

module.exports = (app)=>{
    
    app.get('/auth/google', 
    passport.authenticate('google',{
        scope:['profile', 'email']
    }))

    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        (req,res) =>{
            res.redirect('/first')
        }
    )

    app.get('/api/logout',(req, res) => {
        req.logout();
        let content = req.user ? req.user : {message: "you are loggout"}
        res.redirect('/')
    })

    app.get('/api/current_user', (req, res) => {
        let content = req.user ? req.user : null
        // req.session // here is the session
        res.send(content)
    })
}
