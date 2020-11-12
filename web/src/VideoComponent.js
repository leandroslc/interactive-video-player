class VideoComponent {
  constructor({ videoId, modalTemplateId, selectOptionAction }) {
    this.videoId = videoId;
    this.modalTemplateId = modalTemplateId;
    this.selectOptionAction = selectOptionAction;
    this.modal = {};
  }

  initializePlayer() {
    const player = videojs(this.videoId);
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

      const template = document.getElementById(this.modalTemplateId);
      const htmlModalTemplate = template.content.firstElementChild;
      const htmlModal = htmlModalTemplate.cloneNode(true);

      const firstOptionButton = htmlModal.querySelector('[first-option]');
      const secondOptionButton = htmlModal.querySelector('[second-option]');

      configureOptionButton(firstOptionButton, option1);
      configureOptionButton(secondOptionButton, option2);

      const modalContent = modal.contentEl()
      modalContent.innerHTML = '';
      modalContent.appendChild(htmlModal);
    };
  }

  configureOptionButton(button, option) {
    button.addEventListener('click', this.selectOptionAction.bind(null, option));
    button.innerHTML = option;
  }
}
