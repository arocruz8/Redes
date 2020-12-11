
//conexion a la base de datos
const mongoose = require('mongoose');


//conectar a la b.d con mongodb atlas a partir de un cluster
//mongoose.connect('mongodb://localhost/p2PruebaWeb',{ 
//  mongoose.connect("mongodb+srv://arocruz8:arocruz1997*@cluster0-hsy9p.mongodb.net/test",{ 
    mongoose.connect("mongodb+srv://arocruz:redes2020@clusterloginredes.nkggq.mongodb.net/testRedes",{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false})
  .then(db => console.log('Base de datos conectada'))
  .catch(err => console.log(err));



