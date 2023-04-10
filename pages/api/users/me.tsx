import { NextApiRequest, NextApiResponse } from "next";
import clients from "@libs/server/clients";
import withHandler, { ResponseType } from "@libs/server/witHandler";
import { withApiSession } from "@libs/server/withSession";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
}
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const profile = await clients.user.findUnique({
        where: { id: req.session.user?.id },
    });
    res.json({
        ok: true,
        profile,
    });
}
export default withApiSession(
    withHandler({
        method: "GET",
        handler,
    })
);
