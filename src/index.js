async function main() {
  const player = videojs('video');
  const ModalDialog = videojs.getComponent('ModalDialog');
  const modal = new ModalDialog(player, {
      temporary: false,
      closeable: true
  });

  player.addChild(modal);

}

window.onload = main
