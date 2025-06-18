require('dotenv').config()
import express from 'express';
import connectDB from './config/connectDB';
import errorHandler from './middleware/errorMiddleware';
import cors from 'cors';
import compression from 'compression'
  
const app = express();
app.set('view engine', 'ejs')
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'https://e-esmart.netlify.app'] }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(compression())
  
const routes = [
  { path: '/api/v1/auth', route: require('./routes/auth.routes') },
  { path: '/api/v1/private', route: require('./routes/private.routes') },
  { path: '/api/v1/users', route: require('./routes/users.routes') },
  { path: '/api/v1/files', route: require('./routes/files.routes') },
  { path: '/api/v1/courses', route: require('./routes/courses.routes') },
  { path: '/api/v1/enrollments', route: require('./routes/enrollments.routes') },
  { path: '/api/v1/courseprogress', route: require('./routes/courseprogress.routes') },
  { path: '/api/v1/generatecertificate', route: require('./routes/generatecertificate.routes') },
  { path: '/api/v1/modules', route: require('./routes/modules.routes') },
  { path: '/api/v1/lectures', route: require('./routes/lectures.routes') },
  { path: '/api/v1/resources', route: require('./routes/resources.routes') },
  { path: '/api/v1/quizzes', route: require('./routes/quizzes.routes') },
  { path: '/api/v1/questions', route: require('./routes/questions.routes') },
  { path: '/api/v1/reviews', route: require('./routes/reviews.routes') },
  { path: '/api/v1/discussions', route: require('./routes/discussions.routes') },
  { path: '/api/v1/replies', route: require('./routes/replies.routes') },
  { path: '/api/v1/votes', route: require('./routes/votes.routes') },
];
  
routes.forEach(({ path, route }) => app.use(path, route));
  
app.use(errorHandler);
  
const PORT = process.env.PORT || 3001;
  
const start = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  
    process.on('unhandledRejection', (err) => {
      console.log(`Logged Error: ${err}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.log(error);
  }
};
  
start();
  
  