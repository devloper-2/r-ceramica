/**
 * services/contact.ts — Contact form submission service.
 *
 * Called from the /api/contact route handler (server-side only).
 * Never import this in client components.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<void> {
  // TODO: Wire up SMTP (nodemailer) or a transactional email service (Resend, SendGrid)
  // Example with Resend:
  // await resend.emails.send({
  //   from: "noreply@rceramica.com",
  //   to: process.env.CONTACT_TO_EMAIL!,
  //   subject: `New enquiry from ${payload.name}`,
  //   text: payload.message,
  // });
  void payload;
}
