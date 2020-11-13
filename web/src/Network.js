class Timer {
  constructor() {
    this.startTime = 0;
    this.elapsedMilliseconds = 0;
  }

  start() {
    this.startTime = Date.now();
  }

  stop() {
    this.elapsedMilliseconds = Date.now() - this.startTime;
  }
}

class Network {
  constructor({ host, manifest }) {
    this.host = host;
    this.manifest = manifest;
    this.resolutions = manifest.resolutions;
    this.lowestResolution = manifest.lowestResolution;
  }

  parseURL({ url, fileResolution }) {
    return this.manifest.parseUrl({
      url,
      fileResolution,
      host: this.host,
    });
  }

  async fetchFile(url) {
    const response = await fetch(url);

    return response.arrayBuffer();
  }

  async getProperResolution(fileUrl) {
    const timer = new Timer();

    timer.start();

    await this.fetchFile(fileUrl);

    timer.stop();

    const elapsedMilliseconds = timer.elapsedMilliseconds;

    const item = this.resolutions.find(item => {
      return item.start <= elapsedMilliseconds && item.end >= elapsedMilliseconds;
    });

    return item
      ? item.resolution
      : this.lowestResolution;
  }
}
