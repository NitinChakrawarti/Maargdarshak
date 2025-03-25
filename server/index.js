import { app } from './src/main.js';
import { connectDb } from './src/database/db.js'

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port ${PORT}`);
    });
});

export default app;
