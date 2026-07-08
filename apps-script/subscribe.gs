/**
 * What's a brain? — email-signup backend (Google Apps Script Web App).
 * Appends each new subscriber to the bound Google Sheet. No server needed.
 *
 * ── ONE-TIME SETUP ─────────────────────────────────────────────────────────
 * 1. Create a Google Sheet, e.g. "What's a brain — subscribers".
 *    (Optional) put headers in row 1:  timestamp | email | lang | source
 * 2. In that Sheet: Extensions → Apps Script. Delete the sample code and paste
 *    THIS whole file. Save (disk icon).
 * 3. Deploy → New deployment → gear icon → Web app.
 *      Description:      subscribe
 *      Execute as:       Me
 *      Who has access:   Anyone
 *    Click Deploy, then Authorize access when prompted (choose your account →
 *    Advanced → "Go to … (unsafe)" → Allow — it's your own script).
 * 4. Copy the Web app URL (ends in /exec).
 * 5. Paste that URL into index.html, replacing PASTE_APPS_SCRIPT_WEB_APP_URL.
 *
 * To read subscribers: just open the Sheet. To export: File → Download → CSV.
 * After editing this script later, redeploy: Deploy → Manage deployments →
 * edit (pencil) → Version: New version → Deploy (the /exec URL stays the same).
 * ───────────────────────────────────────────────────────────────────────────
 */

function doPost(e) {
  try {
    var data = {};
    try { data = JSON.parse(e.postData.contents); } catch (_) {}

    var email = String(data.email || "").trim().toLowerCase();
    // minimal validation: something@something.tld
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: "invalid email" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var last = sheet.getLastRow();

    // Dedupe on the email column (column 2). Skip a header row if present.
    if (last >= 1) {
      var existing = sheet.getRange(1, 2, last, 1).getValues();
      for (var i = 0; i < existing.length; i++) {
        if (String(existing[i][0]).trim().toLowerCase() === email) {
          return json({ ok: true, dup: true });
        }
      }
    }

    sheet.appendRow([new Date(), email, String(data.lang || ""), String(data.source || "")]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Lets you sanity-check the deployment in a browser (should show {"ok":true}).
function doGet() {
  return json({ ok: true, service: "subscribe" });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
