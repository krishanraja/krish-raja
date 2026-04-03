import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const ALLOWED_ORIGINS = [
  "https://www.krishraja.com",
  "https://krishraja.com",
  "https://krish-raja.lovable.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") ?? "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface ContactFormData {
  name: string;
  email: string;
  serviceType: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, serviceType, message }: ContactFormData = await req.json();

    console.log('Received contact form submission:', { name, email, serviceType });

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Store in booking_requests table
    const { data: bookingData, error: dbError } = await supabase
      .from('booking_requests')
      .insert({
        contact_name: name,
        contact_email: email,
        service_type: serviceType,
        service_title: getServiceTitle(serviceType),
        specific_needs: message,
        status: 'pending',
        priority: 'medium'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store contact request');
    }

    console.log('Contact request stored:', bookingData.id);

    // Send confirmation email to visitor
    const confirmationEmail = await resend.emails.send({
      from: "Krish Raja <hello@krishraja.com>",
      to: [email],
      subject: "Thank you for reaching out - Next steps for your AI transformation",
      html: generateConfirmationEmail(name, serviceType),
    });

    if (confirmationEmail.error) {
      console.error('Confirmation email error:', confirmationEmail.error);
    } else {
      console.log('Confirmation email sent:', confirmationEmail.data?.id);
    }

    // Send notification email to admin
    const notificationEmail = await resend.emails.send({
      from: "Contact Form <hello@krishraja.com>",
      to: ["hello@krishraja.com"],
      subject: `New Contact: ${serviceType} inquiry from ${name}`,
      html: generateNotificationEmail(name, email, serviceType, message, bookingData.id),
    });

    if (notificationEmail.error) {
      console.error('Notification email error:', notificationEmail.error);
    } else {
      console.log('Notification email sent:', notificationEmail.data?.id);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Contact request submitted successfully",
        bookingId: bookingData.id
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "An unexpected error occurred"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function getServiceTitle(serviceType: string): string {
  const serviceTitles: Record<string, string> = {
    strategy: "AI Strategy & Advisory Consultation",
    workshop: "Executive AI Workshop",
    coaching: "Strategic AI Coaching Program",
    speaking: "Speaking Engagement"
  };
  return serviceTitles[serviceType] || "General Inquiry";
}

function generateConfirmationEmail(name: string, serviceType: string): string {
  const serviceTitle = getServiceTitle(serviceType);
  const safeName = escapeHtml(name);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for reaching out</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px;">Thank you, ${safeName}!</h1>
        
        <p>I've received your inquiry about <strong>${serviceTitle}</strong> and I'm excited to help you navigate your AI transformation journey.</p>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e40af;">What happens next?</h3>
          <ol style="padding-left: 20px;">
            <li><strong>Review:</strong> I'll personally review your inquiry within 24 hours</li>
            <li><strong>Strategy Call:</strong> I'll reach out to schedule a complimentary 30-minute strategy session</li>
            <li><strong>Custom Proposal:</strong> Based on our conversation, I'll create a tailored approach for your needs</li>
          </ol>
        </div>
        
        <p>In the meantime, feel free to:</p>
        <ul>
          <li>📅 <a href="https://calendly.com/krish-raja/krish-raja" style="color: #2563eb; text-decoration: none;">Book a strategy call directly</a></li>
          <li>🔗 <a href="https://linkedin.com/in/krishraja" style="color: #2563eb; text-decoration: none;">Connect with me on LinkedIn</a></li>
          <li>📧 Reply to this email with any additional questions</li>
        </ul>
        
        <div style="border-top: 1px solid #e5e7eb; margin-top: 30px; padding-top: 20px;">
          <p style="font-size: 14px; color: #6b7280;">
            Best regards,<br>
            <strong>Krish Raja</strong><br>
            AI Strategy & Transformation Advisor<br>
            <a href="mailto:hello@krishraja.com" style="color: #2563eb;">hello@krishraja.com</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateNotificationEmail(name: string, email: string, serviceType: string, message: string, bookingId: string): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #dc2626;">New Contact Form Submission</h1>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Service Type:</strong> ${getServiceTitle(serviceType)}</p>
          <p><strong>Booking ID:</strong> ${escapeHtml(bookingId)}</p>
        </div>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>

        <div style="margin-top: 30px;">
          <p><strong>Recommended Actions:</strong></p>
          <ul>
            <li>Reply to ${safeEmail} within 24 hours</li>
            <li>Schedule a strategy call to discuss their needs</li>
            <li>Review their inquiry in Supabase dashboard</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `;
}

serve(handler);