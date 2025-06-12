silenthelp/
├── client/ # React Native (Expo)
│ ├── assets/
│ │ └── logo.png
│ ├── components/
│ │ └── HelpCard.js
│ ├── config/
│ │ └── apollo.js
│ ├── context/
│ │ └── AuthContext.js
│ ├── navigation/
│ │ ├── AppNavigator.js
│ │ └── AuthNavigator.js
│ ├── screens/
│ │ ├── LoginScreen.js
│ │ ├── RegisterScreen.js
│ │ ├── HomeScreen.js
│ │ ├── RequestHelpScreen.js
│ │ ├── HistoryScreen.js
│ │ └── SettingsScreen.js
│ ├── services/
│ │ └── socket.js
│ ├── utils/
│ │ └── secureStore.js
│ ├── App.js
│ ├── app.json
│ ├── eas.json
│ ├── index.js
│ └── package.json

├── server/ # Backend (Express + Socket.IO)
│ ├── config/
│ │ ├── mongo.js
│ ├── middlewares/
│ │ ├── authMiddleware.js
│ ├── models/
│ │ ├── UserModel.js # Fungsi akses koleksi
│ │ └── HelpModel.js
│ │ └── PostModel.js
│ │ └── FollowModel.js
│ ├── schemas/
│ │ └── FollowSchema.js
│ │ └── PostSchema.js
│ │ └── UserSchema.js
│ │ └── HelpSchema.js
│ ├── sockets/
│ │ └── socketHandler.js # Integrasi dengan Socket.IO
│ ├── utils/
│ │ ├── jwt.js
│ │ └── bcrypt.js
│ ├── index.js # Entry point
│ ├── .env
│ ├── .gitignore
│ └── package.json

└── README.md
