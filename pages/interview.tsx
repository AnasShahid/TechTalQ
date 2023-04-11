import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

const Interview = () => {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-lg">
        <MainContainer>
          <ChatContainer>
            <ConversationHeader className="bg-black">
              <ConversationHeader.Content
                userName="TechTalQ"
                className="flex flex-col items-center justify-center text-xl"
              />
            </ConversationHeader>
            <MessageList>
              <Message
                model={{
                  message: "Hello my friend",
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
