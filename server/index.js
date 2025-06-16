import { app } from './src/main.js';
import { connectDb } from './src/database/db.js'
import { envProvider } from './src/constants.js';

const PORT = envProvider.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    });
});

export default app;
