# TaskFlow – Smart TODO Manager

A responsive React + Vite task manager for planning your day. Tasks are saved in the browser's local storage, so they remain available after refresh.

## Features

- Add tasks with the button or Enter; blank tasks are ignored.
- Complete and restore tasks, delete individual tasks with confirmation, or clear completed tasks.
- Filter the list by all, in-progress, or completed tasks.
- View live task totals and a completion progress bar.
- Persist tasks in local storage on the current browser and device.
- Deploy automatically to GitHub Pages on pushes to `main`.

## Run locally

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The Vite base path is set to `/taskflow-todo/`, so use `taskflow-todo` as the GitHub repository name for the included Pages configuration.

1. Push this project to the `main` branch of a GitHub repository named `taskflow-todo`.
2. In the repository settings, open **Pages** and select **GitHub Actions** as the build and deployment source.
3. The included workflow builds and publishes the app on each push to `main`. You can also start it from the repository's **Actions** tab.

