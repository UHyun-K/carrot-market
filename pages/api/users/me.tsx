import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import clients from "@libs/server/clients";
import withHandler, { ResponseType } from "@libs/server/witHandler";

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
    console.log(req.session.user);
    const profile = await clients.user.findUnique({
        where: { id: req.session.user?.id },
    });
    res.json({
        ok: true,
        profile,
    });
}
export default withIronSessionApiRoute(withHandler("GET", handler), {
    cookieName: "carrotsession",
    password: "fkdjiwkfjisldkkflfijkd15321535132d1fd1w35e1f",
});
