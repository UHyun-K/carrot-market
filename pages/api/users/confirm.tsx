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
    const { token } = req.body;
    const foundToken = await clients.token.findUnique({
        //prisma
        where: {
            payload: token,
        },
        /*    include: { user: true }, */ //dosen't neeed now
    });
    if (!foundToken) return res.status(404).end(); //return 안 쓰면  typescript가 여기서 끝나는지모르고 밑에까지 이어지는줄 암.
    req.session.user = {
        id: foundToken?.userId,
    };
    await req.session.save();
    await clients.token.deleteMany({
        where: {
            userId: foundToken.userId,
        },
    });

    res.json({
        ok: true,
    });
}
export default withApiSession(withHandler({ method: "POST", handler }));
