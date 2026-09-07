# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Create React App single-page display app for a physical digital signage kiosk at a GRITHub community hub (currently hardcoded to the George, ZA location). It's meant to run unattended on a screen showing the time, a current/upcoming event banner, WiFi details with QR code, weather, load-shedding info, and a periodic video ad overlay. There is no routing and no login — one fixed layout.

## Commands

Package manager is Yarn (`yarn.lock` is present).

- `yarn start` — run the dev server (react-scripts)
- `yarn build` — production build to `build/` (gitignored)
- `yarn test` — run tests via react-scripts/Jest in watch mode (no test files currently exist in the repo despite testing-library being installed)

There is no separate lint script; ESLint runs via the `react-app` config bundled with `react-scripts` (see `.eslintrc.js`, which just sets `root: true`).

## Environment variables

CRA only exposes env vars prefixed `REACT_APP_` to client code via `process.env`. `.env` is gitignored.

- `REACT_APP_ACCUWEATHER_API_KEY` — used in `src/services/weather.service.js`.
- Note: `src/services/loadshedding.service.js` reads `process.env.eskomSePush_key`, which is **not** `REACT_APP_`-prefixed and will be `undefined` in the built client bundle. This service is currently unused (see below), so this hasn't been fixed.

## Architecture

**Composition root:** `src/App.js` wraps everything in a single `@tanstack/react-query` `QueryClientProvider` (default `staleTime` 30 min, no refetch on window focus — appropriate for an always-on kiosk) and lays out fixed header/footer sections:
- header: `Event` + `Time`
- footer: `Wifi` + `Weather`
- plus a full-screen `VideoAd` overlay sibling

**Config lives in one place:** `src/lib/constants.js` is the single source of truth for hub-specific data — hub name, WiFi SSID/password, lat/lon, EskomSePush area id (`hubs.george`), AccuWeather location id and endpoint URLs, supported locales, and the full set of inline SVG weather-icon path data keyed by AccuWeather icon phrase (consumed by `Weather/WeatherIcon.jsx`). Adding a new hub/location means adding an entry to `hubs` and wiring a way to select it (there is currently no hub-selection mechanism — `hubs.george` is imported directly wherever needed).

**Services (`src/services/*.service.js`):** thin axios wrappers, one per external API:
- `weather.service.js` — AccuWeather hourly/daily forecast endpoints.
- `loadshedding.service.js` — EskomSePush load-shedding API. Currently unused/dead code — `LoadsheddingForecast/index.jsx` has its data-fetching `useEffect` commented out and only renders static branding.

**Components (`src/components/<Name>/`):** each is `index.jsx` co-located with a `*.module.scss` (Sass + CSS Modules, imported as `Style` and referenced via `Style.xxx`). `Weather/` is the one component with sub-files (`CurrentWeather.jsx`, `ThreeDayForecast.jsx`, `WeatherIcon.jsx`) composed under `Weather/index.jsx`.

**Data fetching pattern:** components that need remote data call `useQuery` directly (e.g. `CurrentWeather.jsx`), scoped with a per-hub query key (`hubs.george.name + ".current_weather"`) and their own `refetchInterval`. There's no shared data layer beyond the one `QueryClient` — each component owns its own query.

**Time handling:** `src/custom_hooks/useClock.js` ticks every second via `setInterval`, converts to a hub-local `Intl`/`toLocaleString` timezone (`Africa/Johannesburg` by default), and returns formatted `time`/`date` plus raw hour/minute numbers. `VideoAd/index.jsx` was designed to use this clock to trigger playback at a fixed minute mark each hour and force a page reload once an hour (kiosk auto-refresh) — that scheduling logic is currently commented out, so the video element renders but never auto-shows.

**Known disabled/in-progress code:** several components have significant logic commented out rather than removed (`VideoAd`, `LoadsheddingForecast`, an old Firebase import in `Event/index.jsx`). When touching these areas, check whether the commented code represents an intended-but-unfinished feature before deleting it.
