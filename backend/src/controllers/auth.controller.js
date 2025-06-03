export async function signup (req, res){
    const {email, password,fullName} =  req.body;
    try{
if(!email || !password || !fullName ){
    return res.status(400).json({ message: "All fields ar required"});
}
    }catch(error){

    }
    res.send("signup Routes");
}
export async function login (req, res){
    res.send("login Routes");
}

export async function logout (req, res){
    res.send("logout Routes");
}