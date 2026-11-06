# Is it TOU?

A small, dependency-free PWA with a centered Yes or No.

- **Yes / soft green:** weekdays before 2 PM and from 10 PM onward, plus all weekend.
- **No / soft red:** weekdays from 2 PM up to 10 PM.
- All times and weekdays use **GMT+8**, regardless of your device's timezone.

Run `npm start` and open http://localhost:5173. Run `npm test` to check the schedule.

Run `npm run build` to copy the deployable files into `dist/`. No dependencies are required.

For Cloudflare Pages, connect the GitHub repository and use:

- Production branch: `main`
- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: leave blank

No environment variables or server are needed. See [Cloudflare's static HTML deployment guide](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

The service worker enables offline use after the first successful visit. Install through your browser's install action, or use Share → Add to Home Screen on iOS. Service workers require HTTPS or localhost.

The temporary preview buttons let you check either color. “Use current time” returns to the live schedule; reloading also resets the preview.

When changing cached files, increment the cache version in `sw.js`. Updates activate after the previous app's tabs are closed.
