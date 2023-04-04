import { NextApiRequest, NextApiResponse } from "next";
import clients from "@libs/server/clients";
import withHandler, { ResponseType } from "@libs/server/witHandler";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    console.log(token);
    res.status(200).end();
}
export default withHandler("POST", handler);
