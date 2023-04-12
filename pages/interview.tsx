import {
  ChatContainer,
  ConversationHeader,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type MessageData = {
  msg: string;
  role: ROLES;
};

const enum ROLES {
  USER = "USER",
  SYSTEM = "SYSTEM",
}

type Params = {
  skill: string;
  yearsOfExperience: string;
  jobDescription: string;
};

const Interview = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    const params = router.query;
    if (!router.isReady) return;
    if (
      params.skill === undefined ||
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

  const getChatData = async (msgList: MessageData[]) => {
    const response = await fetch("/api/interview", {
      method: "POST",
      body: JSON.stringify({ userInfo, messages: msgList }),
    });
    const { data } = await response.json();
    if (data) {
      const msgData = getNewMsgList(data, msgList);
      setMessages(msgData);
    }
  };

  const onSend = async (data: MessageData) => {
    const msgData = getNewMsgList(data, messages);
    setMessages(msgData);
    getChatData(msgData);
  };

  const getNewMsgList = (data: MessageData, messages: any[]) => {
    return [
      ...messages,
      {
        msg: data.msg,
        role: data.role,
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
            <MessageList>
              {messages &&
                messages.map((msg: MessageData) => {
                  return (
                    <Message
                      model={{
                        message: msg.msg,
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
                onSend({ msg: innerHtml, role: ROLES.USER });
              }}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </main>
  );
};

export default Interview;
