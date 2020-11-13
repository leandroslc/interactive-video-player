class Manifest {
  constructor(data) {
    this.hostTag = data.hostTag;
    this.resolutionTag = data.fileResolutionTag;
    this.codec = data.codec;
    this.resolutions = data.resolutions;
    this.lowestResolution = data.lowestResolution;
    this.videos = data.videos;
    this.initialVideo = data.initialVideo;
    this.smallestVideo = data.smallestVideo;
  }

  parseUrl({ url, host, fileResolution }) {
    return url
      .replace(this.resolutionTag, fileResolution)
      .replace(this.hostTag, host);
  }

  getVideo(key) {
    return this.videos[key];
  }

  getInitialVideo() {
    return this.getVideo(this.initialVideo);
  }

  getSmallestVideo() {
    return this.getVideo(this.smallestVideo);
  }
}
