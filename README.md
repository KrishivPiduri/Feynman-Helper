# 🧠 Feynman Helper

**Feynman Helper** is a minimalist web app designed to help users deeply understand any topic using the **Feynman Technique** — a method of learning by teaching. It guides users through a structured series of steps to solidify their understanding of any concept.

## ✨ Features

- 🔐 **Google Authentication** — simple, fast login via Google
- 🗂️ **Personal Dashboard** — create, view, edit, and delete learning topics
- 🧾 **Feynman Flow** — guided process including:
  1. Outline
  2. Refine
  3. Explain
  4. Scrutinize
  5. Save
  6. Recall
- ☁️ **Firebase Integration** — user data is saved and retrieved in real-time
- 🌌 **Starfield UI** — modern, responsive design with subtle visual delight

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/feynman-helper.git
cd feynman-helper
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

Create a project in [Firebase Console](https://console.firebase.google.com):

- Enable **Google Authentication**
- Enable **Cloud Firestore**
- Copy your Firebase config and replace the placeholder in `firebase.js`

```js
// firebase.js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

> 🔒 Your Firebase config **can safely be public** — just make sure Firestore rules are correctly set up to protect user data.

### 4. Run the app

```bash
npm start
```

Go to `http://localhost:3000` in your browser.

## 🔐 Security & Deployment Notes

- Your Firebase config is public by design.
- **Set Firestore rules** to secure user data:
  ```
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /users/{userId}/topics/{topicId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
  ```
- Deploy to [Vercel](https://vercel.com/) or [Firebase Hosting](https://firebase.google.com/docs/hosting) for easy production hosting.

## 🧱 Built With

- React
- Firebase (Auth + Firestore)
- Tailwind CSS
- OpenAI API (simulated)
- Google OAuth

## 🙋 Contributing

Contributions, issues, and feature requests are welcome!  
Just fork the project and submit a pull request with a clear description.

## 📄 License

This project is licensed under the MIT License.

---

> _“If you can’t explain it simply, you don’t understand it well enough.” – Richard Feynman_


Let me know if you'd like to include badge icons, demo links, or deployment instructions too.