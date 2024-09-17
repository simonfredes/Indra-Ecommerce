import { MercadoPagoConfig, Payment } from "mercadopago";
import { NextRequest } from "next/server";
import { addPayment } from "../bd/data";






export async function POST(request: NextRequest) {
    const client = new MercadoPagoConfig({ accessToken: "APP_USR-8054286611689859-061420-03d72c9dd0217415d53abc9ac36d0dc6-195730350" });
    const secretKey = "ce7456405b3fba35515d10ef3a72e1bacdd6acd0d312524699a6990b2c68966d"
    const body = await request.json().then((data) => data as { data: { id: string } });
    const secret = request.headers.get("x-signature-id");

    //if (secret !== secretKey) {
        //console.log(secret, secretKey)
        //console.log("ENTRE A SECRET IF SECRET IF NACHI")
      //  return Response.json({ success: false })
    //}

    
    const payment = await new Payment(client).get({ id: body.data.id })
     console.log("descropcion del payment", payment.description)
    await addPayment(payment.external_reference||"");

    return Response.json({ success: true })
}



