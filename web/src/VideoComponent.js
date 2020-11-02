class VideoComponent {
  constructor() {
    this.modal = {};
  }

  initializePlayer() {
    const player = videojs('video');
    const ModalDialog = videojs.getComponent('ModalDialog');
    const modal = new ModalDialog(player, {
        temporary: false,
        uncloseable: true,
    });

    player.addChild(modal);

    player.on('play', () => {});

    this.modal = modal;
  }

  configureModal(selected) {
    const modal = this.modal;
    modal.on('modalopen', this.getModalTemplate(selected, modal));
    modal.open();
  }

  closeModal() {
    this.modal.close();
  }

  getModalTemplate(options, modal) {
    return () => {
      const [option1, option2] = options;

      const htmlTemplate = `
      <div class="video-overlay">
        <div class="video-button-wrapper">
          <button class="video-overlay-button" onclick="window.nextChunk('${option1}')">
            ${option1}
          </button>
          <button class="video-overlay-button" onclick="window.nextChunk('${option2}')">
            ${option2}
          </button>
        </div>
      </div>
      `;

      modal.contentEl().innerHTML = htmlTemplate;
    };
  }
}
