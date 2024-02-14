import { render } from "@react-email/render";
import WelcomeTemplate from "../../../emails";
import { Resend } from "resend";

const resend = new Resend("re_dY63FMo2_KwGmSRUzYNufehYN27agbsaj");

export async function POST(request: Request, res: Response) {
	// rate limit
	// authorization

	const { email, userFirstname } = await request.json();

	const { data, error } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: [email],
		subject: "Thank you",
		html: render(WelcomeTemplate({ userFirstname })),
	});

	if (error) {
		return Response.json(error);
	}

	return Response.json({ message: "Email sent successfully" });
}
