import { IBlock } from 'types';

export default function render(query: string, block: IBlock) {
  const root = document.querySelector(query);

  if (!root) return;
  // clearNode(root);

  root.appendChild(block?.getContent());
  block.dispatchComponentDidMount();

  return root;
}
