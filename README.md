# Pg

SvelteJS + SpectreCSS on client, Derver BFF, LowDB base.json & JWT auth simple headless CMS, bundeled by ESBuild

### Features:

- Dev-mode with livereload
- Production ready web-server
- Middlewares on server side

### Getting started

Just run:

```sh
npx degit valexr/pagy myapp
cd myapp
npm install
npm run dev
```

Then open browser on `http://localhost:1313`, change files in the `src` and watch the changes. 

### Building

Run your application in production mode with `npm start` command.

Or run `npm run build` and optimized application will be in the `dist` directory.  Then you may copy it anywhere and run with `node app.js` inside this directory. 