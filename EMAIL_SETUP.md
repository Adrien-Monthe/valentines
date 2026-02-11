# Email Notification Setup Guide

This guide will help you set up email notifications when Kesita says "Yes!" 🎉

## Step 1: Create a Free EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. Log in to your [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended for personal use)
4. Follow the instructions to connect your email account
5. **Copy your Service ID** (looks like `service_xxxxxxx`)

## Step 3: Create an Email Template

1. In the dashboard, click "Email Templates"
2. Click "Create New Template"
3. Set up your template with these variables:
   - **Template Name**: Valentine Response
   - **Subject**: 🎉 She Said YES! - Moon accepted your Valentine
   - **Content**:
     ```
     Hi {{to_name}},

     Great news! 🎉💘

     {{from_name}} just said YES to being your Valentine!

     {{message}}

     Time to celebrate! 🥳

     Sent from your Valentine website
     ```
4. **Copy your Template ID** (looks like `template_xxxxxxx`)

## Step 4: Get Your Public Key

1. In the dashboard, go to "Account" → "General"
2. Find your **Public Key** (looks like a random string)
3. **Copy this key**

## Step 5: Update Your Website Code

Open `js/app.js` and replace these three placeholders:

```javascript
// Line 14: Replace YOUR_PUBLIC_KEY
emailjs.init('YOUR_PUBLIC_KEY');  // ← Paste your Public Key here

// Line 52: Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
           //    ↑ Service ID        ↑ Template ID
```

### Example (with fake IDs):
```javascript
emailjs.init('xJ9kL3mP2nQ4rT5vW6xY7');
emailjs.send('service_abc1234', 'template_xyz5678', templateParams)
```

## Step 6: Configure Email Recipient

In `js/app.js`, the email will be sent to the email address connected to your EmailJS service. If you want to specify a different recipient, you can modify the template in EmailJS dashboard to use `{{to_email}}` and add it to `templateParams`:

```javascript
const templateParams = {
  to_name: 'Adrien',
  to_email: 'your.email@example.com',  // Add your email here
  from_name: 'Moon (Kesita)',
  message: 'She said YES! 🎉💘 Kesita accepted your Valentine proposal!',
  reply_to: 'noreply@valentine.com'
};
```

## Testing

1. Open your website locally
2. Click the "Yes!" button
3. Check your browser console (F12) for email status
4. Check your inbox for the notification email

## Troubleshooting

- **Email not sending?** Check browser console for errors
- **Wrong email received?** Update the template in EmailJS dashboard
- **Daily limit reached?** Free tier has 200 emails/month, upgrade if needed

## Free Tier Limits

- 200 emails per month
- 2 email services
- 2 email templates

Perfect for this Valentine project! 💘

---

**Note**: Keep your Public Key, Service ID, and Template ID safe. Don't share them publicly if you push to GitHub!
