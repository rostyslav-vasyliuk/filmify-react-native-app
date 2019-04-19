const { User } = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const signUp = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!email || !password || !firstname || !lastname) {
      return res.status(422).json({ message: 'Please, fill up all fields!' });
    }
    
    let user = await User.findOne({ email });
    if (user) return res.status(422).json({ message: 'User with this email already exists!' });

    user = new User({ firstname, lastname, email, password });
    
    const salt = bcrypt.genSaltSync(10);
    user.password = await bcrypt.hashSync(password, salt);
    await user.save();

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
      }
    });

    const mailOptions = {
      to: email,
      from: process.env.USER_EMAIL,
      subject: 'Happy to see you ' + firstname,
      html: `
      <div>
        <h1>Hello ${firstname} ${lastname}!</h1>
        <hr>
        <h2>We are very happy that you joined Filmify! Have a pleasure using our app!</h2>
        <h4>If you have some recomendations send your advise to this mail!</h4>
        <h5>(c)Filmify, 2019</h5>
      <div>`
    };

    smtpTransport.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    });

    const token = user.generateAuthToken();

    user.token = token;
    
    res.json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(422).json({ message: 'Email and password are required!' });
    
    let user = await User.findOne({ email });
    
    if (!user) return res.status(400).json({ message: 'Invalid email or password!' });

    const validPassword = await bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password!' });

    const token = user.generateAuthToken();

    user.token = token;

    const obj = {
      user: user,
      token: token,
    }

    return res.status(200).json(obj);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserByToken = async (req, res) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decoded.id);
    
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

const setPushToken = async (req, res) => {
  try {
    const { user_id, pushToken } = req.body;
    const user = await User.findById(user_id);
    user.pushToken = pushToken;
    await user.save();
    return res.status(200).send({ message: 'Token setted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

const uploadImage = async (req, res) => {
  try {
    let user = await User.findById(req.body.id);
    user.image = req.file.filename;

    await user.save();
    
    return res.status(200)
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { signUp, signIn, getUserByToken, uploadImage, setPushToken };
