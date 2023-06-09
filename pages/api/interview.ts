import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method === "POST") {
      const newMsg: any = await chatGPTHandler(req);
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

  const payload: any = {
    model: process.env.OPENAI_API_MODEL,
    messages: body?.messages,
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
