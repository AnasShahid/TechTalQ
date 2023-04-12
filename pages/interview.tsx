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
import { useEffect } from "react";

const Interview = () => {
  const router = useRouter();
  useEffect(() => {
    const params = router.query;
    if (!router.isReady) return;
    console.log("params", params);
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
  }, [router.isReady]);

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
