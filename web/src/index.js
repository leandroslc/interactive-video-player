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
    manifest,
  });

  const selectOptionAction = (data) => {
    videoPlayer.nextChunk(data);
    videoComponent.closeModal();
  };

  const videoComponent = new VideoComponent({
    videoId: 'video',
    modalTemplateId: 'video-modal-template',
    selectOptionAction,
  });

  const videoPlayer = new VideoMediaPlayer({
    manifest,
    network,
    videoComponent,
  });

  videoPlayer.initializeCodec();
  videoComponent.initializePlayer();
}

window.onload = main
