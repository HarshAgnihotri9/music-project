# 🎵 TuneX – Music Streaming Platform

TuneX is a modern music streaming web application that allows users to search, stream, and enjoy their favorite songs seamlessly. It leverages **RapidAPI** to fetch music data and deliver a smooth listening experience.

---

## 🚀 Features

* 🔍 **Search Songs** – Find songs, artists, and albums instantly
* 🎧 **Music Streaming** – Play songs directly in the browser
* 📃 **Song Details** – View artist, album, and duration info
* ⚡ **Fast API Integration** – Powered by RapidAPI
* 📱 **Responsive Design** – Works on desktop and mobile devices
* 🎵 **Multiple Quality Options** – Supports different audio bitrates

---

## 🛠️ Tech Stack

**Frontend:**

* HTML
* CSS / Tailwind CSS
* JavaScript / React

**Backend (optional):**

* Node.js
* Express.js

**API:**

* RapidAPI (for music data)

---

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/tunex.git
```

2. Navigate to the project directory:

```bash
cd tunex
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file and add your RapidAPI key:

```env
REACT_APP_RAPID_API_KEY=your_api_key_here
```

5. Start the development server:

```bash
npm start
```

---

## 🔑 API Integration

TuneX uses **RapidAPI** to fetch music data such as:

* Song search results
* Audio streaming URLs
* Artist and album details

Example API call:

```javascript
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'example-api-host'
  }
};

fetch('https://example-api-host/search?query=song_name', options)
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## 📁 Project Structure

```
tunex/
│── public/
│── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── index.js
│── .env
│── package.json
│── README.md
```

---

## 🎯 Future Improvements

* ❤️ Add favorites / playlists
* 🔐 User authentication
* 📥 Offline downloads
* 🎶 Personalized recommendations
* 🔊 Volume & equalizer controls

---

## 🐛 Known Issues

* Some songs may not play due to API restrictions
* Playback issues on certain browsers
* Rate limits from RapidAPI

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed by **Harsh Agnihotri**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!

---
