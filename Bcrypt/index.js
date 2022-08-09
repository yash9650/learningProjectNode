const bcrypt = require('bcrypt');

// const hashingFx = async (pw)=>{
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw,salt);
//     console.log(hash);
// }

const hashingFx = async (pw)=>{
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw,12);
    console.log(hash);
}

const verifyPasswrd = async (pw,hashedPassword) => {
    const result = await bcrypt.compare(pw,hashedPassword);
    if(result){
        console.log('Logged In');
    }else{
        console.log('Wrong Password');
    }
}

// hashingFx('monkey');
verifyPasswrd('monkey','$2b$12$Wizl02cgIcsl1A2mE0XBdOXOpWyhtOGNV9pkP4pEeysdOom6CvmGu');

