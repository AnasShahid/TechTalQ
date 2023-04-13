import { ChatGPTMessage } from "@/constant/constant";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "POST") {
      const newMsg = await chatGPTHandler(req);
      return res.status(200).json({
        data: newMsg.choices[0].message,
      });
    }
  } catch (error) {
    return res.status(401).json({ error });
  }
}

const chatGPTHandler = async (req: NextApiRequest): Promise<Response> => {
  const body = await JSON.parse(req.body);

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
  };

  const { skills, yearsOfExperience, jobRole, jobDescription } = body.userInfo;

  const messages: ChatGPTMessage[] = [
    {
      role: "system",
      content: `You are a friendly technical interviewer with name TechTalQ, 
      and you will take a short mock interview and 
      will ask total 2 questions and verify answers from 
      the user and give the feedback to the user after. 
      Start by welcoming, asking candidate's name and guiding how the process will go. 
      you are always friendly, kind, and inspiring and thoughtful responses to the user.
      All questions should be based on ${skills} with ${yearsOfExperience} years of experience and job role ${jobRole}. 
      `,
    },
    {
      role: "user",
      content: `Hi`,
    },
  ];
  messages.push(...body?.messages);

  const payload: any = {
    model: process.env.OPENAI_API_MODEL,
    messages: messages,
    temperature: 0.2,
  };

  const response = await fetch(
    `${process.env.OPENAI_API_BASE_URL}/v1/chat/completions`,
    {
      headers: requestHeaders,
      method: "POST",
      body: JSON.stringify(payload),
    }
  );
  const resData = await response.json();

  return resData;
};
