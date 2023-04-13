import { ChatGPTMessage, ROLES } from "@/constant/constant";
import {
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Interview = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
  const [userInfo, setUserInfo] = useState<any>();
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);

  useEffect(() => {
    const params = router.query;
    if (!router.isReady) return;
    if (
      params.jobRole === undefined ||
      params.skills === undefined ||
      params.yearsOfExperience === undefined ||
      params.jobDescription === undefined
    ) {
      alert("Missing user information");
      router.replace({
        pathname: "/",
      });
    }
    setUserInfo(params);
  }, [router.isReady]);

  useEffect(() => {
    if (userInfo) getChatData(messages);
  }, [userInfo]);

  const getChatData = async (msgList: ChatGPTMessage[]) => {
    setShowTypingIndicator(true);
    const response = await fetch("/api/interview", {
      method: "POST",
      body: JSON.stringify({ userInfo, messages: msgList }),
    });
    const { data } = await response.json();
    if (data) {
      const msgData = getNewMsgList(data, msgList);
      setMessages(msgData);
    }
    setShowTypingIndicator(false);
  };

  const onSend = async (data: ChatGPTMessage) => {
    const msgData = getNewMsgList(data, messages);
    setMessages(msgData);
    getChatData(msgData);
  };

  const getNewMsgList = (data: ChatGPTMessage, messages: any[]) => {
    return [
      ...messages,
      {
        role: data.role,
        content: data.content,
      },
    ];
  };

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl font-mono text-lg">
        <MainContainer>
          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Content
                userName="TechTalQ"
                className="flex flex-col text-3xl mb-5 border-indigo-900"
              />
            </ConversationHeader>
            <MessageList
              typingIndicator={showTypingIndicator && <TypingIndicator />}
            >
              {messages &&
                messages.map((msg: ChatGPTMessage) => {
                  return (
                    <Message
                      model={{
                        message: msg.content,
                        direction:
                          msg.role === ROLES.USER ? "outgoing" : "incoming",
                        position: "normal",
                      }}
                    />
                  );
                })}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              attachButton={false}
              onSend={(innerHtml: string) => {
                onSend({ role: ROLES.USER, content: innerHtml });
              }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </main>
  );
};

export default Interview;
