JaMoveo is a full‑stack web application built to enhance band rehearsals by enabling real‑time collaboration and song sharing among members. 
When visitors land on the app’s home page, inspired by a phonse music player design, they click “Start” to either sign up or log in.
After clicking "Start" the user is seeing the sign up page and a side menu.
After signing in and logging in, the sidebar (burger menu) that appears on the side, is offering navigation options that differ based on the user’s role.
Regular users see the “Player” page while admins can access dedicated pages such as “Admin” and “Results.”

The app uses a static JSON file as its songs database.
When the admin selects a song from the search results, the chosen song’s chords and lyrics are broadcast to all connected devices via Socket.IO.
However, the interface is smart—vocalists (users who are singers) see only the lyrics, while other musicians see both chords and lyrics.

The client-side is built with React and deployed on Vercel, and the server (Node/Express with Socket.IO) is hosted on Railway.
This setup provides a modern, responsive experience that can be easily shared with band members and collaborators.

