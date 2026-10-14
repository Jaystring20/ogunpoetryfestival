# Connecting the registration form to a Google Sheet

The website's **Register your school** page (`/register`) sends each entry to
a Google Sheet through a small Google Apps Script. Each entry becomes a new
row, and the Secretariat gets an email about it. Setup takes about ten
minutes and is done once, in the festival's Google account.

Until it's connected, the form still works. It opens a pre-filled email to
the Secretariat instead.

## 1. Create the Sheet

1. Sign in to Google with the festival account (ogunpoetryfestival@gmail.com).
2. Go to [sheets.new](https://sheets.new) and name the sheet
   **OPF 2026 Registrations**.

You don't need to add columns. The script creates a **Registrations** tab
with its headings when the first entry arrives.

## 2. Add the script

1. In the Sheet, open **Extensions → Apps Script**.
2. Delete everything in the editor, then paste the whole of
   [`apps-script/registration.gs`](../apps-script/registration.gs).
3. Check `NOTIFY_EMAIL` near the top. It's the address that gets an email
   for each registration. Use `""` to turn the emails off.
4. Click **Save** (the disk icon).

## 3. Publish it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Fill in:
   - **Description:** OPF registration
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**, then **Authorize access**, and choose the festival
   account. Google warns that the app isn't verified. That's normal for
   your own script. Click **Advanced → Go to (project name) → Allow**.
5. Copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/…/exec`.

To check it's live, open that URL in a browser. You should see
`{"ok":true,"message":"OPF registration endpoint is live."}`.

## 4. Connect the website

Do either of these:

- **Send the URL to whoever maintains the site.** They paste it into
  `REGISTRATION.endpoint` in `src/data/festival.ts`.
- **Or set it in Vercel:** Project → Settings → Environment Variables. Add
  `VITE_REGISTRATION_ENDPOINT` with the URL for Production (and Preview),
  then redeploy.

Then submit a test entry on `/register` and check that a row appears.

## Day to day

- The **Status** column starts as "New". Change it as you go: Contacted,
  Paid, Confirmed, Withdrawn. Turn on a filter (Data → Create a filter) to
  sort and find entries.
- Share the Sheet with committee members from the Share button. Give
  editing rights only to people who need them.
- If you change the script later, publish with **Deploy → Manage
  deployments → Edit → Version: New version**. That keeps the same URL.
  A *new* deployment gets a new URL, and the website would need updating.

## What's collected

Institution, type, categories, Tertiary Slam theme, contact name, role,
phone, email, town or LGA, and notes. A hidden field catches spam bots, and
those entries are thrown away. Values that start with `=`, `+`, `-` or `@`
are stored as plain text, so nobody can slip a formula into the Sheet.
