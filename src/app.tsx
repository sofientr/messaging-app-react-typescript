import { useCallback, useState } from 'react';
import './app.css';

import { store } from './assets/store';
import { TextMessage } from './assets/types';

import Conversation from './conversation';

const Header = () => {
  return <header>Kraaft</header>;
};

interface FooterProps {
  handleAddTextMessage: (content: string) => void;
}

const Footer = ({ handleAddTextMessage }: FooterProps) => {
  const [messageContent, setMessageContent] = useState('');
  const handleSendMessage = useCallback(
    function () {
      handleAddTextMessage(messageContent);
      setMessageContent('');
    },
    [handleAddTextMessage, messageContent],
  );

  const handleValueChange = useCallback(function (event) {
    setMessageContent(event.target.value);
  }, []);

  const handleKeyDown = useCallback(
    function (event) {
      if (event.key === 'Enter') {
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <footer>
      <span className="messageInput">
        <input
          type="text"
          value={messageContent}
          onChange={handleValueChange}
          onKeyDown={handleKeyDown}
        />
      </span>
      <span
        className="messageSendButton"
        onClick={handleSendMessage}
        onKeyPress={handleKeyDown}
        role="button"
        tabIndex={0}>
        Envoyer
      </span>
    </footer>
  );
};

const App = () => {
  const { messages: storeMessages, users, currentUserId } = store;
  const [messages, setMessages] = useState(storeMessages);

  function addTextMessage(content: string) {
    const newMessage: TextMessage = {
      id: `newMessage-${messages.length}`,
      type: 'text',
      senderId: store.currentUserId,
      createdAt: new Date().getTime(),
      content,
    };

    setMessages((oldMessages) => [newMessage, ...oldMessages]);
  }

  return (
    <div className="app">
      <Header />
      <Conversation
        className="conversation"
        {...{ messages, users, currentUserId }}
      />
      <Footer handleAddTextMessage={addTextMessage} />
    </div>
  );
};

export default App;
