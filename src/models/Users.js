const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//encriptar contrasena
UsuarioSchema.methods.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password,salt);
    return hash;
}

//compara las contrasenas del bd con la del schema
UsuarioSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('usuarios',UsuarioSchema);