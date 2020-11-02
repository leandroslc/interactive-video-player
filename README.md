
<h1 align="center">Interactive Video Player</h1>
<p align="center">
  <span>A simple interactive video player based on Netflix's Bandersnatch.<span>
  <br />
  <span>
    <strong>Semana <em>JavaScript Expert</em></strong> by
    <a href="https://erickwendel.com.br">Erick Wendel</a>
  </span>
</p>

<div align="center">
  <img src="./assets/home.png" alt="Video player demo" width="70%" />
</div>


## :rocket: Getting started
- Install [NodeJS](https://nodejs.org), if needed.
- Install dependencies using `npm install`.
- Run `npm run assets -- "<path to videos' directory>"` to start the static server.
- And run `npm start` to start the site.


## :clapper: Rendering videos
To render the videos in different resolutions (720p, 360p), follow these steps:

- Download _ffmpeg_ and _ffprobe_ from [ffmpeg.org](https://ffmpeg.org) or [ffbinaries.com](https://ffbinaries.com). Make sure they are in your system path.

- Run the `video-convert` script (using [PowerShell](https://github.com/PowerShell/PowerShell)):
  ```powershell
  ./scripts/video-convert.ps1 -MediaPath "<path to videos>"
  ```


## :book: References
- [Netflix JavaScript Talks - Making Bandersnatch](https://www.youtube.com/watch?v=WLqc0EX8Bmg&feature=youtu.be)
- [Video Encoding and Browser Codec Compatibility](https://gist.github.com/Vestride/278e13915894821e1d6f)
- [YouTube streaming best practices](https://support.google.com/youtube/answer/2853702?hl=en)
- [W3C Media Source Extensions&trade;](https://www.w3.org/TR/media-source)
- [Media Source Compatibility](https://caniuse.com/mediasource)
- [Fragmented MP4](https://stackoverflow.com/questions/35177797/what-exactly-is-fragmented-mp4fmp4-how-is-it-different-from-normal-mp4)
- [Building a Media Player (_using DASH_)](https://www.youtube.com/watch?v=CPFE34ngysU)

---
<small>
  The video.js theme is a modified version based on a <a href="https://codepen.io/benjipott/pen/JELELN">skin by Benjamin Pott</a>.
</small>
