---
title: Welcome to the Crossroads!
date: 2026-11-02
tag: general
excerpt: First blog marking the beginning of this project!
---

I finally did it! I've been thinking about doing this for months now but was too busy (and lazy), but finally got the excuse to do it because I needed a place for my portfolio.

I named this place **"Crossroads"** because I intend to make this place a hub for various aspects of my life. I don't know how much success i'll get in regards to that, but that's for later. <figure class="side"><img src="/public/files/post001/hkStart.jpg" width="600"><figcaption>The beginning of a journey. (Hollow Knight)</figcaption></figure>

### For now, I would like to keep this on record:

I used **Claude** to build this website. Yeah, it's obvious. I took the easy way out since I am too busy (and again, lazy) to build my own site from scratch and that too with fancy css like this. I don't have a domain at this point so I am just using my GitHub to host this page. I hope it suffices for the time being.

But, I learned some stuff even though I didn't make the site myself. Stuff like:
- More about how GitHub.io deployment works
- **Typescript** used for web development is just a strongly-typed superset of JavaScript
- How other people's sites I've been admiring are actually managed behind the scenes
- Useful **markdown** syntax: [reference](https://www.markdownguide.org/basic-syntax/)
- A little something about **Node JS** and how it helps with package management, building and a dev server: <kbd>`npm run dev`</kbd> which runs this site at `localhost:4321`


I have no experience with stuff like Node JS, React JS, or any other backend framework like Django, Flask, FastAPI (basically I am a web dev rookie)
So when I asked Claude how it has used Node JS in the development of this page, this is what it said:

>Yes, but only as a **build tool**. Node.js never runs on your live website.
>
>**Where Node is used**
>
>- **npm (Node's package manager)** installs everything the project depends on, as listed in `package.json`: Astro itself, the font files, the Simple Icons set, and the RSS helper. That's what <kbd>`npm install`</kbd> does.
>- **The dev server.** <kbd>`npm run dev`</kbd> starts a small local Node server that shows your site at `localhost:4321` and refreshes it whenever you save a file.
>- **The build.** <kbd>`npm run build`</kbd> makes Astro (running on Node) do four things:
>  - read your Markdown files and check them against the rules in `content.config.>ts`
>  - convert screenshots to compressed WebP images
>  - generate the RSS feed
>  - turn everything into plain HTML, CSS and a few small JavaScript files in the `dist/` folder
>- **GitHub Actions.** On every push, GitHub starts a temporary machine, installs Node 22, runs that same build, and uploads `dist/` to GitHub Pages.
>
>**What runs on the live site**
>
>Only static files: HTML, CSS, images, fonts and two tiny browser scripts. One switches between screenshots in the game gallery, and the other pauses the card preview videos for visitors who've turned on "reduce motion". There's no server, no database and no Node process. That's why GitHub Pages can host it for free, and why it loads fast and has very little that can be attacked.
>
>**What this means for you**
>
>You need Node 22.22 or newer installed on your computer to run <kbd>`npm run dev`</kbd> and <kbd>`npm run build`</kbd>. Your visitors don't need anything except a browser.

So this is how this page works, basically. I kept this here for my future reference. The reason I am writing this blog is mostly to get an idea how this works. How to effectively use markdown for bold, Blockquotes, code blocks, lists etc. and to get started. Because the first step is indeed the most difficult one in this case.

That's all I can think of for now. If you're reading this. Thanks for showing your interest. Stay tuned, I might post something again someday ;)

**Regards,**  
**Harshit Lakhotia**