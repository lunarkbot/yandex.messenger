import renderAvatar from './avatar.tmpl.js';
import Block from '../../utils/block.ts';
import { TProps } from 'types';

export default class Avatar extends Block {
    constructor(props: TProps) {
        super('div', props);
    }

    render(): string {
        return renderAvatar(this.props);
    }
}
