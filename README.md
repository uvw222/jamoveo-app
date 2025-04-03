# JaMoveo Web Application

JaMoveo is a full‑stack web application built to enhance band rehearsals by enabling real‑time collaboration and song sharing among members. The app offers a modern, phone music player–inspired design that provides an engaging and intuitive user experience.

## Features

- **Home & Navigation:**  
  Visitors land on a home page with a design inspired by a phone music player. They click “Start” to sign up or log in. Once the user clicks “Start,” they see the sign-up page along with a side menu (burger menu).

- **Role-Based Navigation:**  
  After signing in, the sidebar offers navigation options that differ based on the user’s role:
  - **Regular Users:** See the “Player” page.
  - **Admins:** Can access dedicated pages such as “Admin” and “Results.”

- **Songs Database:**  
  The app uses a static JSON file as its songs database. When an admin selects a song from the search results, the song’s chords and lyrics are broadcast to all connected devices via Socket.IO.  
  - **Smart Display:** Vocalists (users who are singers) see only the lyrics, while other musicians see both chords and lyrics.

## Technology Stack

- **Client:**  
  Built with React and styled with a modern, responsive design. Deployed on [Vercel](https://vercel.com).

- **Server:**  
  Built using Node.js/Express with Socket.IO for real‑time functionality. Hosted on [Railway](https://railway.app).

## How It Works

1. **Getting Started:**  
   Visitors land on the home page and click “Start” to be directed to the sign-up page with a sidebar menu.

2. **Sign Up / Log In:**  
   Users register or log in, and based on their role, the side menu (burger menu) provides navigation:
   - **Regular Users** are taken to the Player page.
   - **Admins** have access to the Admin and Results pages.

3. **Live Session:**  
   When an admin selects a song from the search results, the song (with chords and lyrics) is broadcast to all devices. Vocalists see only the lyrics while other musicians see both chords and lyrics.

## Deployment

- **Client:** [https://jamoveo-app.vercel.app](https://jamoveo-app.vercel.app)  
- **Server:** Hosted on Railway

---

This setup provides a modern, responsive experience that can be easily shared with band members and collaborators.
