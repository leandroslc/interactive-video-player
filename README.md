
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
  <img align="center" src="./assets/home.png" alt="Video player demo" width="70%" />
</div>


## :rocket: Getting started
1. Install [NodeJS](https://nodejs.org) (if needed).

2. Render the videos _(follow the_ [Rendering videos](#clapper-rendering-videos) _section below)_.

3. Run `npm run assets` to start the static server.

4. And run `npm start` to start the site.

**Note:** You need [Git LFS](https://git-lfs.github.com). If you cloned this repository before installing it, you may need to clone again.


## :clapper: Rendering videos
To render the videos in different resolutions (720p, 360p):

- Download _ffmpeg_ and _ffprobe_ from [ffmpeg.org](https://ffmpeg.org) or [ffbinaries.com](https://ffbinaries.com). Make sure they are in your system path.

- Run the `video-convert` script (using [PowerShell](https://github.com/PowerShell/PowerShell)):
  ```powershell
  ./scripts/video-convert "./assets/sample-videos.zip"
  ```


## :book: References
- [Netflix JavaScript Talks - Making Bandersnatch](https://www.youtube.com/watch?v=WLqc0EX8Bmg&feature=youtu.be)
- [Video Encoding and Browser Codec Compatibility](https://gist.github.com/Vestride/278e13915894821e1d6f)
- [YouTube streaming best practices](https://support.google.com/youtube/answer/2853702?hl=en)
- [W3C Media Source Extensions&trade;](https://www.w3.org/TR/media-source)
- [Media Source Compatibility](https://caniuse.com/mediasource)
- [Fragmented MP4](https://stackoverflow.com/questions/35177797/what-exactly-is-fragmented-mp4fmp4-how-is-it-different-from-normal-mp4)
- [Building a Media Player (_using DASH_)](https://www.youtube.com/watch?v=CPFE34ngysU) <small>(not used here)</small>


---
<sup>
  * Sample videos by Erick Wendel.
</sup>

<br />

<sup>
  * The video.js theme is a modified version based on a <a href="https://codepen.io/benjipott/pen/JELELN">skin by Benjamin Pott</a>.
</sup>
