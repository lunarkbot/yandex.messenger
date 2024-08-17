import renderModal from './modal.tmpl.js';
import Block from '../../../../utils/classes/core/block.ts';
import { TProps } from 'types';
import Input from '../../../../components/input/index.ts';
import Button from '../../../../components/button/index.ts';
import styles from './modal.module.css';

export default class Modal extends Block {
    constructor(props: TProps) {
        const input = new Input({
          name: props.inputName,
          placeholder: props.inputPlaceholder,
        });

        const button = new Button({
          type: 'submit',
          text: props.buttonText,
        });

        super({
          tagName: 'div',
          props: {
            ...props,
            input,
            button,
          },
          className: [styles.modal, `modal_${props.id}`],
          events: {
            click: (event: Event) => {
              const target = event.target as HTMLElement;
              if (target
                && (target.classList.contains(styles.close)
                || !target.closest(`.${styles.modalContent}`))
              ) {
                this.hideModal();
              }
            }
          }
        });
    }

    public showModal() {
      const modal = this.getContent();
      modal.classList.add(styles.modalActive);
    }

    public hideModal() {
        const modal = this.getContent();
        modal.classList.remove(styles.modalActive);
    }

    render(): string {
        return renderModal(this.props);
    }
}
