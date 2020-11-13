class VideoMediaPlayer {
  constructor({ manifest, network, videoComponent }) {
    this.manifest = manifest;
    this.network = network;
    this.videoComponent = videoComponent;

    this.videoElement = null;
    this.sourceBuffer = null;
    this.selected = {};
    this.selections = [];
    this.activeItem = {};
    this.videoDuration = 0;
  }

  initializeCodec() {
    this.videoElement = document.getElementById('video');

    if (!this.supportsMediaSource()) {
      this.error('Your browser does not support Media Source Extensions');
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
      const selected = this.selected = this.manifest.getInitialVideo();

      this.sourceBuffer = mediaSource.addSourceBuffer(this.manifest.codec);

      mediaSource.duration = this.videoDuration;

      await this.fileDownload(selected.url);

      setInterval(this.waitForQuestions.bind(this), 200);
    };
  }

  waitForQuestions() {
    const currentTime = parseInt(this.videoElement.currentTime, 10);
    const option = this.selected.at === currentTime;

    if (!option) {
      return;
    }

    if (this.activeItem.url === this.selected.url) {
      return;
    }

    this.activeItem = this.selected;
    this.videoComponent.configureModal(this.selected.options);
  }

  async nextChunk(data) {
    const key = data.toLowerCase();
    const selected = this.manifest.getVideo(key);

    this.selected = {
      ...selected,

      // Adjusts the time in which the modal will show
      at: parseInt(this.videoElement.currentTime + selected.at, 10),
    };

    this.manageLag(selected);

    // Plays the rest of the video while the new video is being downloaded
    this.videoElement.play();

    await this.fileDownload(selected.url);
  }

  manageLag(selected) {
    if (!!~this.selections.indexOf(selected.url)) {
      selected.at += 5;
    } else {
      this.selections.push(selected.url);
    }
  }

  async getCurrentFileResolution() {
    const smallestVideo = this.manifest.getSmallestVideo();

    const fileUrl = this.network.parseURL({
      url: smallestVideo.url,
      fileResolution: this.manifest.lowestResolution,
    });

    return await this.network.getProperResolution(fileUrl);
  }

  async fileDownload(url) {
    const fileResolution = await this.getCurrentFileResolution();

    const fileUrl = this.network.parseURL({
      url,
      fileResolution,
    });

    this.setVideoPlayerDuration(fileUrl);

    const data = await this.network.fetchFile(fileUrl);

    return this.processBufferSegments(data);
  }

  setVideoPlayerDuration(fileUrl) {
    const bars = fileUrl.split('/');
    const [_, videoDuration] = bars[bars.length - 1].split('-');

    this.videoDuration += parseFloat(videoDuration);
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
