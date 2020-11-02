class Network {
  constructor({ host, manifest }) {
    this.host = host;
    this.hostTag = manifest.hostTag;
    this.resolutionTag = manifest.fileResolutionTag;
    this.resolutions = manifest.resolutions;
    this.lowestResolution = manifest.lowestResolution;
  }

  parseURL({ url, fileResolution }) {
    return url
      .replace(this.resolutionTag, fileResolution)
      .replace(this.hostTag, this.host);
  }

  async fetchFile(url) {
    const response = await fetch(url);

    return response.arrayBuffer();
  }

  async getProperResolution(fileUrl) {
    const requestStartTime = Date.now();

    const response = await fetch(fileUrl);
    await response.arrayBuffer();

    const requestEndTime = Date.now();

    const elapsedTimeInMs = requestEndTime - requestStartTime;

    const item = this.resolutions.find(item => {
      return item.start <= elapsedTimeInMs && item.end >= elapsedTimeInMs;
    });

    return item
      ? item.resolution
      : this.lowestResolution;
  }
}
