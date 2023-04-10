import { NextApiRequest, NextApiResponse } from "next";
import clients from "@libs/server/clients";
import withHandler, { ResponseType } from "@libs/server/witHandler";
import twilio from "twilio";
import smtpTransport from "@libs/server/email";
const twiloClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOEKN);
async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { phone, email } = req.body;
    const user = phone ? { phone: +phone } : email ? { email } : null;
    if (!user) return res.status(400).json({ ok: false });
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const token = await clients.token.create({
        data: {
            payload,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: "Anonymous",
                        ...user,
                    },
                },
            },
        },
    });
    if (phone) {
        /*     const message = await twiloClient.messages.create({
            messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
            to: process.env.MY_PHONE!,
            body: `your login token is ${payload}`,
        });
        console.log(message); */
    }

    if (email) {
        /*     const mailOptions = {
            from: process.env.MAIL_ID,
            to: email,
            subject: " Carrot-Market Authentication Email",
            text: `Authentication Code : ${payload}`,
        };
        const result = await smtpTransport.sendMail(
            mailOptions,
            (error, responses) => {
                if (error) {
                    console.log(error);
                    return null;
                } else {
                    console.log(responses);
                    return null;
                }
            } 
        );
        smtpTransport.close();
        console.log(result);*/
    }
    return res.json({
        ok: true,
    });
}
export default withHandler({ method: "POST", handler });
