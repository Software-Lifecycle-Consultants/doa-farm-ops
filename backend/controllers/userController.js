const userController = {
    createUser: async (req, res) => {
        // Access posted data from the request body
        const user="user@gmail.com"
        const password="111222"
        const { userName, userPassword } = req.body;
        if (user===userName && password===userPassword) {
            res.json({ message: `${userName}` });
        } else {
            res.json({ message: `Incorrect username or password` });
        }
        
    }
}

module.exports = userController;