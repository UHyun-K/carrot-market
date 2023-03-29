import { NextApiRequest, NextApiResponse } from "next";
import clients from "../../libs/clients";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await clients.user.create({
        data: {
            email: "hi",
            name: "hi",
        },
    });
    res.json({
        ok: true,
    });
}
