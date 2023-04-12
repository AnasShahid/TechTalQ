import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    //   const chatGPTUrl = `${process.env.API_KEY}/`;
    //   const fetchData = await fetch(chatGPTUrl);
    //   const result = await fetchData.json();
    if (req.method === "POST") {
      const { userInfo, messages } = JSON.parse(req.body);
      console.log("userInfo", userInfo);

      if (messages.length > 0) {
        console.log("messages", messages);
        return res.status(200).json({
          data: { msg: messages[messages.length - 1].msg, role: "SYSTEM" },
        });
      } else {
        return res.status(200).json({ data: { msg: "Hi", role: "SYSTEM" } });
      }
    }
  } catch (error) {
    return res.status(401).json({ error });
  }
}
