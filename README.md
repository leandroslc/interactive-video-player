
<h1 align="center">Interactive Video Player</h1>

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
