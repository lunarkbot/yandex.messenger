import store from '../classes/store/store.ts';

export default function updateLastMessageContent(newContent: string) {
  const state = store.getState();
  const chats = state?.chats?.items;
  const currentChat = state?.chat?.active?.id;

  if (!chats || !currentChat) return;

  for (let i = 0; i < chats.length; i++) {
    // Проверяем, совпадает ли ID
    if (chats[i].id === currentChat) {
      if (chats[i].last_message) {
        chats[i].last_message.content = newContent;
      }
      break; // Прерываем цикл после нахождения нужного объекта
    }
  }

  store.set('chats', { items: chats });
}
