/* eslint-disable no-underscore-dangle */

import express from 'express';
import sessions from 'express-session';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Routes path
import router from './routes/web.js';

// Init app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Template
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../src/resources/views'));
app.set('layout', 'layout');
app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(sessions({
    secret: process.env.APP_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Routes
app.use('/', express.static('public'), router);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, (err) => {
    if (err) console.error(err);
    console.log(`Homepage hosted here: http://localhost:${PORT}/`);
});

export default app;
