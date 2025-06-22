// const express = require('express');
// const cors = require('cors');
// const mongoose = require("mongoose");
// const User = require('./Models/User');
// const Post = require('./Models/Post');
// const bcrypt = require('bcrypt');
// const app = express();
// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
// const multer = require('multer');
// const uploadMiddleware = multer({ dest: 'uploads/' });
// const fs = require('fs');

// const salt = bcrypt.genSaltSync(10);
// const secret = 'praveen secret';

// app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
// app.use(express.json());
// app.use(cookieParser());
// app.use('/uploads', express.static(__dirname + '/uploads'));

// mongoose.connect('mongodb+srv://praveen:test123@cluster0.evnhfsw.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
//     .then((result) => app.listen(3015))
//     .catch((err) => console.log(err))

// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//     return jwt.sign({ id }, 'praveen secret', {
//         expiresIn: maxAge
//     })
// }

// app.post('/register', async (req,res) => {
//   const {username,password} = req.body;
//   try{
//     const userDoc = await User.create({
//       username,
//       password:bcrypt.hashSync(password,salt),
//     });
//     res.json(userDoc);
//   } catch(e) {
//     console.log(e);
//     res.status(400).json(e);
//   }
// });

// app.post('/login', async (req,res) => {
//   /* const {username,password} = req.body;
//   const userDoc = await User.findOne({username});
//   const passOk = bcrypt.compareSync(password, userDoc.password);
//   const maxAge = 3*24*60*60
//   if (passOk) {
//     jwt.sign({username,id:userDoc._id}, secret, {
//         expiresIn: maxAge
//     })
//       res.cookie('token', token, {httpOnly: true}).json({
//         id:userDoc._id,
//         username,
//       });
//     } */
//    const {username, password} = req.body
//    try {
//         const user = await User.login(username, password)
//         const token = createToken(user._id);
//         res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 })
//         res.status(201).json({ user: user._id})
//    }
//    catch {
//         res.status(400).json({errors})
//    }
// });

// app.get('/profile', async (req,res) => {
//   /* const {token} = req.cookies;
//   jwt.verify(token, secret, {}, (err,info) => {
//     if (err) {
//         return res.status(401).json({ error: "Invalid or expire token" })
//     }
//     res.json(info);
//   }); */
//   const { jwt: token } = req.cookies;

//   if (!token) {
//     return res.status(401).json({ error: 'No token, unauthorized' });
//   }

//   jwt.verify(token, secret, {}, async (err, decodedToken) => {
//     if (err) {
//       return res.status(401).json({ error: 'Invalid or expired token' });
//     }

//     try {
//       const user = await User.findById(decodedToken.id).select('username');
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
//       res.json({ id: user._id, username: user.username });
//     } catch (error) {
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
// })
// app.post('/logout', (req,res) => {
//   res.cookie('jwt', '', {maxAge: 1}).json('ok');
// });

// app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
//   const {originalname,path} = req.file;
//   const parts = originalname.split('.');
//   const ext = parts[parts.length - 1];
//   const newPath = path+'.'+ext;
//   fs.renameSync(path, newPath);

//   const {token} = req.cookies;
//   jwt.verify(token, secret, {}, async (err,info) => {
//     if (err) throw err;
//     const {title,summary,content} = req.body;
//     const postDoc = await Post.create({
//       title,
//       summary,
//       content,
//       cover:newPath,
//       author:info.id,
//     });
//     res.json(postDoc);
//   });

// });

// app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
//   let newPath = null;
//   if (req.file) {
//     const {originalname,path} = req.file;
//     const parts = originalname.split('.');
//     const ext = parts[parts.length - 1];
//     newPath = path+'.'+ext;
//     fs.renameSync(path, newPath);
//   }

//   const {token} = req.cookies;
//   jwt.verify(token, secret, {}, async (err,info) => {
//     if (err) throw err;
//     const {id,title,summary,content} = req.body;
//     const postDoc = await Post.findById(id);
//     const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
//     if (!isAuthor) {
//       return res.status(400).json('you are not the author');
//     }
//     await postDoc.update({
//       title,
//       summary,
//       content,
//       cover: newPath ? newPath : postDoc.cover,
//     });

//     res.json(postDoc);
//   });

// });

// app.get('/post', async (req,res) => {
//   res.json(
//     await Post.find()
//       .populate('author', ['username'])
//       .sort({createdAt: -1})
//       .limit(20)
//   );
// });

// app.get('/post/:id', async (req, res) => {
//   const {id} = req.params;
//   const postDoc = await Post.findById(id).populate('author', ['username']);
//   res.json(postDoc);
// })

/* const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const User = require('./Models/User');
const Post = require('./Models/Post');
const bcrypt = require('bcrypt');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const salt = bcrypt.genSaltSync(10);
const secret = 'praveen secret';

app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://praveen:test123@cluster0.evnhfsw.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0');

app.post('/register', async (req,res) => {
  const {username,password} = req.body;
  try{
    const userDoc = await User.create({
      username,
      password:bcrypt.hashSync(password,salt),
    });
    res.json(userDoc);
  } catch(e) {
    console.log(e);
    res.status(400).json(e);
  }
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
  const {originalname,path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length - 1];
  const newPath = path+'.'+ext;
  fs.renameSync(path, newPath);

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,summary,content} = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover:newPath,
      author:info.id,
    });
    res.json(postDoc);
  });

});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    await postDoc.update({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(postDoc);
  });

});

app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.listen(4000); */


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./Models/User');
const Post = require('./Models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');

const app = express();
const uploadMiddleware = multer({ dest: 'uploads/' });
const JWT_EXPIRY = 3 * 24 * 60 * 60; // 3 days in seconds

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

// MongoDB Connection
mongoose.connect('mongodb+srv://praveen:test123@cluster0.evnhfsw.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => app.listen(3015, () => console.log('Server running on port 3015')))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Token Creation
const createToken = (id) => {
  return jwt.sign({ id }, 'praveen secret', { expiresIn: JWT_EXPIRY });
};

// Routes
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, 10),
    });
    res.status(201).json(userDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');
    const passOk = bcrypt.compareSync(password, user.password);
    if (!passOk) throw new Error('Wrong password');
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: JWT_EXPIRY * 1000 });
    res.json({ id: user._id, username });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/profile', (req, res) => {
  const { jwt: token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'No token, unauthorized' });
  jwt.verify(token, 'praveen secret', {}, (err, decodedToken) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    res.json({ id: decodedToken.id });
  });
});

app.post('/logout', (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }).json('Logged out');
});

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const { originalname, path } = req.file;
  const ext = originalname.split('.').pop();
  const newPath = `${path}.${ext}`;
  fs.renameSync(path, newPath);

  const { jwt: token } = req.cookies;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  
  jwt.verify(token, 'praveen secret', {}, async (err, decodedToken) => {
    if (err) return res.status(401).json({ error: 'Invalid token' });
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: decodedToken.id,
    });
    res.json(postDoc);
  });
});

app.get('/post', async (req, res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
});