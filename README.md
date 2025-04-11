🎬 CinePlay Hub
About
CinePlay Hub is your ultimate companion for discovering and streaming movies and TV shows. It aggregates content from multiple streaming platforms, offering a seamless and intuitive interface powered by the TMDB API.

Whether you're on your phone or desktop, CinePlay Hub helps you browse, search, and curate your favorite titles—all in one place.

✨ Features
🎬 Modern Interface – Browse movies and shows with a sleek, responsive UI

🔍 Powerful Search – Instantly find content across multiple types

📱 Mobile-Optimized – Fully responsive design with touch gesture support

🗂️ Category-Based Browsing – Quickly discover content by genre or type

💾 Personal Watchlist – Save and manage your favorite titles

📢 Announcement Banner – Easily configurable banner for important updates

🌙 Smooth UI – Fluid animations with beautiful transitions

⚡ High Performance – Built using React and Vite for speed and efficiency

🚀 Getting Started
Prerequisites
Node.js 22.x or higher

npm 10.x or higher

A TMDB API Key – Get yours here

🔧 Installation
sh
Copy
Edit
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd cineplay-hub

# Install dependencies
npm install

# Create and configure environment variables
cp .env.example .env
# Open `.env` and insert your TMDB API key

# Start the development server
npm run dev
🌐 API Configuration
Visit TMDB to obtain an API key

Duplicate .env.example as .env

Replace the placeholder with your actual API key

🛠️ Tech Stack
Built using cutting-edge technologies for performance, scalability, and developer experience:

Vite – Lightning-fast build tool

TypeScript – Typed JavaScript for better reliability

React – Component-based frontend framework

shadcn/ui – Accessible and aesthetic UI components

Tailwind CSS – Utility-first styling framework

React Query – Efficient data fetching and caching

Framer Motion – Smooth, elegant animations

React Router – Dynamic client-side routing

🌍 Deployment Options
✅ Netlify (Recommended)
Fork the repository

Link it to Netlify

Configure build settings:

Build Command: npm run build

Publish Directory: dist

Set environment variables

Deploy!

⚠️ Vercel (Not Recommended)
Fork and import into Vercel

Add environment variables

Deploy

🧩 GitHub Pages
Update vite.config.ts with your base URL

Run npm run build

Deploy the dist/ folder

🔥 Firebase Hosting
sh
Copy
Edit
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
📢 Managing Announcement Banner
Customize announcements via public/config/announcement.json:

json
Copy
Edit
{
  "enabled": true,
  "message": "Your message here",
  "link": "/optional/url",
  "backgroundColor": "#2B8CBE",
  "textColor": "#FFFFFF"
}
To Update:
Edit the file with your desired message

Deploy changes to your host

Users will see the new banner within 1 hour (cache is configurable)

Users can dismiss the banner. Dismissal state is stored in local storage.

🤝 Contributing
We welcome contributions! Here's how to get started:

Fork the repository

Create a new branch: git checkout -b feature/improvement

Make your changes

Commit: git commit -am 'Add new feature'

Push: git push origin feature/improvement

Create a Pull Request

Guidelines
Use TypeScript

Follow the existing component structure

Prefer shadcn/ui components

Handle errors gracefully

Keep bundle size in mind

Write clear commit messages

Add tests and update documentation when necessary

Follow the Code of Conduct

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.

🧾 Code of Conduct
We are committed to fostering a positive and inclusive community. Please read our Code of Conduct before contributing.

🛠️ Support
Need help?

Check the Issues tab

Visit the Documentation (if available)

See if the issue exists in the original version

Open a new issue with the following:

Node.js and npm versions

Browser and version

Error logs

Reproduction steps

Expected vs. actual behavior

🙏 Acknowledgments
Thanks to TMDB for the content API

Kudos to shadcn/ui for the amazing UI library

Special thanks to all embedded services used

📎 Notes for CinePlay Users
The project directory tree is available in the root directory

The file sw.js in /public and the ad snippet in index.html are related to advertisements.

To disable ads: remove sw.js and the ad-related code from index.html.

Keeping them helps support us financially. Thank you!

Redirects from video servers originate from third-party sites, not CinePlay itself.
