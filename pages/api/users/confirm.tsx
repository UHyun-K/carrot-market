import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import clients from "@libs/server/clients";
import withHandler, { ResponseType } from "@libs/server/witHandler";

/* declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
} */
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { token } = req.body;
    const exists = await clients.token.findUnique({
        //prisma
        where: {
            payload: token,
        },
        /*    include: { user: true }, */ //dosen't neeed now
    });
    if (!exists) return res.status(404).end();
    /*     req.session.user = {
        id: exists.userId,
    };
    await req.session.save(); */
    console.log(req.session);
    console.log(token);
    res.status(200).end();
}
export default withIronSessionApiRoute(withHandler("POST", handler), {
    cookieName: "carrotsession",
    password: "fkdjiwkfjisldkkflfijkd15321535132d1fd1w35e1f",
});
