


export async function signup(req, res) {
    const { email, password, fullName } = req.body;
    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields ar required" });
        }
        if (password.lenth < 6) {
            return res.status(400).json({ message: "must be 6 digits " });

        }
        const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!emailFormat.test(email)) {
            return res.status(400).json({ message: "invailid mail" });
        }
const existemail = await User.findOne({email});
if (existemail){
     return res.status(400).json({ message: "already exist!" });

}

    } catch (error) {

    }
    res.send("signup Routes");
}
export async function login(req, res) {
    res.send("login Routes");
}

export async function logout(req, res) {
    res.send("logout Routes");
}