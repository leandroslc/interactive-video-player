const ManifestUrl = 'manifest.json';
const LocalhostUrls = ['127.0.0.1', 'localhost'];

function isLocal() {
  return !!~LocalhostUrls.indexOf(window.location.hostname);
}

async function main() {
  const manifest = await (await fetch(ManifestUrl)).json();

  const host = isLocal()
    ? manifest.localHost
    : manifest.productionHost;

  const network = new Network({
    host,
    hostTag: manifest.hostTag,
    resolutionTag: manifest.fileResolutionTag,
  });

  const videoComponent = new VideoComponent();
  const videoPlayer = new VideoMediaPlayer({
    manifest,
    network,
  });

  videoPlayer.initializeCodec();
  videoComponent.initializePlayer();
}

window.onload = main
