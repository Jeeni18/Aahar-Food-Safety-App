# Aahar 📱

*Know what you eat*

Aahar is a comprehensive Flutter app that empowers users to make informed and healthy food decisions through intelligent barcode scanning and personalized dietary insights.

## 🎯 Mission

Help users make quick, informed, and healthy food choices by providing instant access to comprehensive food information, dietary compatibility checks, and personalized health insights.

## ✨ Key Features

### 📸 Smart Barcode Scanner
- **Instant Food Recognition**: Scan any food barcode for immediate insights
- **Diet Type Detection**: Quickly identify if products are vegetarian, non-vegetarian, or vegan
- **OpenFoodFacts Integration**: Powered by comprehensive food database

### 🍽️ Dietary Compatibility & Health Insights
- **Dietary Restrictions**: Check compatibility with gluten-free, sugar-free, and diabetic diets
- **Allergen Detection**: Identify potential allergens in food products
- **Health Risk Assessment**: Get warnings for hypertension, cholesterol, and gluten intolerance risks
- **Ingredient Analysis**: Detailed breakdown of food ingredients

### 🧠 AI-Powered Features
- **Mood Prediction**: Understand how foods might affect your mood
- **Intelligent Chatbot**: Ask questions about diet, food labels, nutrients, and nutrition advice
- **Personalized Recommendations**: Get tailored food suggestions based on your profile

### 📚 Daily Health Education
- **Rotating Articles**: Fresh daily content on healthy eating habits
- **Dietary Tips**: Expert advice on nutrition and wellness
- **Health Alerts**: Stay updated on recent food safety and health notifications

### 👤 Personalized Experience
- **User Profile Management**: Store personal dietary preferences and restrictions
- **Theme Customization**: Dark mode and other visual preferences
- **History Tracking**: Keep track of scanned products and insights

## 📱 App Interface Preview

Scroll through the interface screenshots below to get a quick overview of the app design and flow.

<div style="display: flex; overflow-x: auto; gap: 10px;">
  <img src="interface/1.jpeg" width="200"/>
  <img src="interface/2.jpg" width="200"/>
  <img src="interface/3.jpg" width="200"/>
  <img src="interface/4.jpg" width="200"/>
  <img src="interface/5.jpg" width="200"/>
  <img src="interface/6.jpg" width="200"/>
  <img src="interface/7.jpg" width="200"/>
  <img src="interface/8.jpg" width="200"/>
  <img src="interface/9.jpg" width="200"/>
  <img src="interface/10.jpg" width="200"/>
  <img src="interface/11.jpg" width="200"/>
  <img src="interface/12.jpg" width="200"/>
  <img src="interface/13.jpg" width="200"/>
  <img src="interface/14.jpg" width="200"/>
  <img src="interface/15.jpg" width="200"/>
</div>

## 🚀 Getting Started

### Prerequisites
- Flutter SDK (version 3.0 or higher)
- Dart SDK
- Android Studio / VS Code
- An Android/iOS device or emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/aahar.git
   cd aahar
   ```

2. **Install dependencies**
   ```bash
   flutter pub get
   ```

3. **Run the app**
   ```bash
   flutter run
   ```

## 🔧 Configuration

### API Setup
1. **OpenFoodFacts API**: No API key required - uses public OpenFoodFacts database
2. **AI Chatbot (Cohere)**: The Cohere API key is kept **server-side only**. The app sends chat messages to the serverless endpoint [`api/chat.js`](api/chat.js) (`POST /api/chat`), which adds the key and calls Cohere. Never put the key in Flutter code or a bundled `.env` file. The default "Simple Bot (Offline)" mode needs no key.

### Environment Variables

| Variable | Where | Required | Purpose |
|----------|-------|----------|---------|
| `COHERE_API_KEY` | Server (Vercel) | Yes, for Cohere mode | Cohere API key used by `api/chat.js` |
| `ALLOWED_ORIGINS` | Server (Vercel) | No | Comma-separated extra browser origins allowed to call `/api/chat` (local dev only) |

See [`.env.example`](.env.example). Real `.env` / `.env.*` files are git-ignored.

**Production (Vercel):**
1. Vercel dashboard → your project → **Settings → Environment Variables**
2. Add `COHERE_API_KEY` with your key, for the **Production** (and **Preview**, if wanted) environments
3. Redeploy (environment variable changes only apply to new deployments)

**Local development:**
1. Install the Vercel CLI: `npm i -g vercel`, then run `vercel link` once
2. Copy `.env.example` to `.env.local` and set `COHERE_API_KEY` (or run `vercel env pull .env.local`)
3. Set `ALLOWED_ORIGINS=http://localhost:8080` in `.env.local`
4. Start the API: `vercel dev --listen 3000`
5. In another terminal, run the app pointing at it:
   ```bash
   flutter run -d chrome --web-port 8080 --dart-define=CHAT_API_URL=http://localhost:3000/api/chat
   ```

**Mobile builds** (Android/iOS) can't use a relative URL, so pass the deployed endpoint at build time (this URL is not a secret):
```bash
flutter build apk --dart-define=CHAT_API_URL=https://<your-app>.vercel.app/api/chat
```

> Note: Firebase Hosting (also configured in this repo) only serves static files, so `/api/chat` is not available there and the chatbot falls back to offline answers. Use the Vercel deployment for Cohere mode.

### Permissions
The app requires the following permissions:
- **Camera**: For barcode scanning
- **Internet**: For API calls and data fetching
- **Storage**: For caching food data and user preferences

## 📱 How to Use

1. **Scan Products**: Point your camera at any food barcode
2. **Review Insights**: Get instant information about diet compatibility, allergens, and health risks
3. **Check Compatibility**: See if the product matches your dietary restrictions
4. **Ask Questions**: Use the AI chatbot for personalized nutrition advice
5. **Stay Informed**: Read daily articles about healthy eating
6. **Customize Profile**: Set your dietary preferences and health goals

## 🎥 App Demo Video

[![Watch the video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://www.youtube.com/watch?v=YOUR_VIDEO_ID)


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🙏 Acknowledgments

- **OpenFoodFacts**: For providing comprehensive food database
- **Flutter Community**: For amazing packages and support
- **Contributors**: Thank you to all contributors who help make Aahar better

## 📞 Support

For support, email support@aahar.app or join our community discussions.

## 📈 Roadmap

- [ ] Integration with fitness apps
- [ ] Recipe suggestions based on dietary preferences
- [ ] Multi-language support


---

**Made with ❤️ for healthier food choices**
