class VideoMediaPlayer {
  constructor({ manifest, network }) {
    this.manifest = manifest;
    this.network = network;

    this.videoElement = null;
    this.sourceBuffer = null;
    this.selected = {};
    this.videoDuration = 0;
  }

  initializeCodec() {
    this.videoElement = document.getElementById('video');

    if (!this.supportsMediaSource()) {
      this.error('Your browser does not support MediaSource');
    }

    if (!this.supportsCodec(this.manifest.codec)) {
      this.error(`Your browser does not support the codec: ${this.manifest.codec}`);
    }

    const mediaSource = new MediaSource();

    this.videoElement.src = URL.createObjectURL(mediaSource);

    mediaSource.addEventListener('sourceopen', this.sourceOpenWrapper(mediaSource));
  }

  sourceOpenWrapper(mediaSource) {
    return async() => {
      const selected = this.selected = this.manifest[this.manifest.initialVideo];

      this.sourceBuffer = mediaSource.addSourceBuffer(this.manifest.codec);

      mediaSource.duration = this.videoDuration;

      await this.fileDownload(selected.url);
    };
  }

  async fileDownload(url) {
    const fileUrl = this.network.parseURL({
      url,
      fileResolution: 360,
    });

    this.setVideoPlayerDuration(fileUrl);

    const data = await this.network.fetchFile(fileUrl);

    return this.processBufferSegments(data);
  }

  setVideoPlayerDuration(fileUrl) {
    const bars = fileUrl.split('/');
    const [_, videoDuration] = bars[bars.length - 1].split('-');

    this.videoDuration += videoDuration;
  }

  async processBufferSegments(allSegments) {
    const sourceBuffer = this.sourceBuffer;

    sourceBuffer.appendBuffer(allSegments);

    return new Promise((resolve, reject) => {
      const updateEnd = () => {
        sourceBuffer.removeEventListener('updateend', updateEnd);
        sourceBuffer.timestampOffset = this.videoDuration;

        return resolve();
      };

      sourceBuffer.addEventListener('updateend', updateEnd);
      sourceBuffer.addEventListener('error', reject);
    });
  }

  supportsMediaSource() {
    return !!window.MediaSource;
  }

  supportsCodec(codec) {
    return MediaSource.isTypeSupported(codec);
  }

  error(message) {
    alert(message);
    throw new Error(message);
  }
}
