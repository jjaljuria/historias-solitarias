import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/historias_solitarias')
.then(()=> {
	console.log('database connected')
})
.catch(err => console.error(err))