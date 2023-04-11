import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const Interview = () => {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-lg">
        <p className="mb-5">TechTalQ</p>
        <MainContainer>
          <ChatContainer>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
                  sentTime: "just now",
                  sender: "Joe",
                  direction: "incoming",
                  position: "normal",
                }}
              />
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </main>
  );
};

export default Interview;
