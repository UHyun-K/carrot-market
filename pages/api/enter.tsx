import { NextApiRequest, NextApiResponse } from "next";
import clients from "@libs/server/clients";
import withHandler from "@libs/server/witHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    res.status(200).end();
}
export default withHandler("POST", handler);
