/**
 * Ogun Poetry Festival: school registration → Google Sheet.
 *
 * Paste this whole file into Extensions → Apps Script of the registration
 * Google Sheet, then Deploy → New deployment → Web app
 * (Execute as: Me, Who has access: Anyone). Full steps:
 * docs/google-sheet-setup.md in the website repository.
 *
 * Each submission from the website's /register page becomes one row on the
 * "Registrations" tab, and the Secretariat gets an email about it.
 */

// Who gets an email for each new registration. Leave empty ("") to turn emails off.
var NOTIFY_EMAIL = "ogunpoetryfestival@gmail.com";
var SHEET_NAME = "Registrations";

var COLUMNS = [
  ["Received", function (e) { return new Date(); }],
  ["Institution", function (e) { return e.institution; }],
  ["Type", function (e) { return e.institutionType; }],
  ["Categories", function (e) { return (e.categories || []).join(", "); }],
  ["Tertiary theme", function (e) { return e.tertiaryTheme; }],
  ["Contact person", function (e) { return e.contactName; }],
  ["Role", function (e) { return e.contactRole; }],
  ["Phone", function (e) { return e.phone; }],
  ["Email", function (e) { return e.email; }],
  ["Town or LGA", function (e) { return e.town; }],
  ["Notes", function (e) { return e.notes; }],
  ["Status", function (e) { return "New"; }],
];

function doPost(request) {
  try {
    var entry = JSON.parse(request.postData.contents);
    if (entry.website) return reply({ ok: true }); // honeypot: a bot filled the hidden field

    var required = ["institution", "institutionType", "contactName", "phone", "email"];
    for (var i = 0; i < required.length; i++) {
      if (!clean(entry[required[i]])) return reply({ ok: false, error: "Missing " + required[i] });
    }

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet();
      sheet.appendRow(COLUMNS.map(function (c) {
        var v = c[1](entry);
        return v instanceof Date ? v : clean(v);
      }));
    } finally {
      lock.releaseLock();
    }

    // The row is saved; a failed email (say, a mistyped reply-to address) must not report failure.
    if (NOTIFY_EMAIL) {
      try { notify(entry); } catch (mailErr) { console.error(mailErr); }
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

/** Lets you open the web app URL in a browser to check it is live. */
function doGet() {
  return reply({ ok: true, message: "OPF registration endpoint is live." });
}

function getSheet() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (c) { return c[0]; }));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Trims, caps length, and stops text from being read as a spreadsheet formula. */
function clean(v) {
  var s = String(v == null ? "" : v).trim().slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function notify(e) {
  var body = [
    "A new school or institution has registered for OPF through the website.",
    "",
    "Institution: " + clean(e.institution),
    "Type: " + clean(e.institutionType),
    "Categories: " + clean((e.categories || []).join(", ")),
    e.tertiaryTheme ? "Tertiary theme: " + clean(e.tertiaryTheme) : "",
    "Contact: " + clean(e.contactName) + (e.contactRole ? " (" + clean(e.contactRole) + ")" : ""),
    "Phone: " + clean(e.phone),
    "Email: " + clean(e.email),
    e.town ? "Town or LGA: " + clean(e.town) : "",
    e.notes ? "Notes: " + clean(e.notes) : "",
    "",
    "All registrations: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].filter(function (l) { return l !== ""; }).join("\n");
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    replyTo: clean(e.email),
    subject: "New OPF registration: " + clean(e.institution),
    body: body,
  });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
