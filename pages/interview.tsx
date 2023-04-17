import { ChatGPTMessage, ROLES } from "@/constant/constant";
import { replaceString } from "@/utils/helper";
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
import initChatMsg from "../data/chat-init.config.json";

const Interview = ({
  initMessages = [],
}: {
  initMessages: ChatGPTMessage[];
}) => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatGPTMessage[]>([]);
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
  }, [router.isReady]);

  useEffect(() => {
    if (initMessages.length > 0) getChatData(messages);
  }, [initMessages]);

  const getChatData = async (msgList: ChatGPTMessage[]) => {
    setShowTypingIndicator(true);
    const response = await fetch("/api/interview", {
      method: "POST",
      body: JSON.stringify({ messages: [...initMessages, ...msgList] }),
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

export async function getServerSideProps(context: any) {
  const { query } = context;

  const { skills, yearsOfExperience, jobRole, jobDescription } = query;

  const initMessages: ChatGPTMessage[] = JSON.parse(
    replaceString(JSON.stringify(initChatMsg), {
      skills: skills.join(","),
      yearsOfExperience,
      jobRole,
      jobDescription: jobDescription
        ? ` and job description is ${jobDescription}`
        : "",
    })
  );

  return {
    props: {
      initMessages,
    }, // will be passed to the page component as props
  };
}

export default Interview;
