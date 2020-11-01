class Network {
  constructor({ host, hostTag, resolutionTag }) {
    this.host = host;
    this.hostTag = hostTag;
    this.resolutionTag = resolutionTag;
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
}
