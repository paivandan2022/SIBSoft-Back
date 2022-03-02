

const signin = (req, res) => {
    //ccccc
    const username = req.query.username
    const password = req.query.password
    // go to query
    dbConnection.execute("SELECT * FROM bb_user where user_name={username} and password={password}")
    .then(( results) => {
        res.send(results[0])
    })
    .catch(error => {
        return res.status(200).json({message: 'error'}) 
    })
    
    // if (false) {
    //     return res.status(200).json({message: 'success'})   
    // } else {
    //     return res.status(500).json({message: 'unsuccess'})   
    // }




}

const logout = (req, res) => {

}


module.exports = {
    signin,
    logout
}