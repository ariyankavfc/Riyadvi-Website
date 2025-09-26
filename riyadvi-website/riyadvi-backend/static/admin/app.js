const content = document.getElementById("content");
const loadContacts = document.getElementById("loadContacts");
const loadApps = document.getElementById("loadApps");

function renderTable(items, cols) {
  if (!items || !items.length) {
    content.innerHTML = "<p class='text-muted'>No records.</p>";
    return;
  }
  let html = "<div class='table-responsive'><table class='table table-dark table-striped'><thead><tr>";
  cols.forEach(c => html += `<th>${c}</th>`);
  html += "</tr></thead><tbody>";
  items.forEach(it => {
    html += "<tr>";
    cols.forEach(c => {
      const key = c.toLowerCase();
      let val = it[key] !== undefined ? it[key] : it[c];
      if (val === null) val = "";
      html += `<td>${String(val)}</td>`;
    });
    html += "</tr>";
  });
  html += "</tbody></table></div>";
  content.innerHTML = html;
}

loadContacts.addEventListener("click", async () => {
  content.innerHTML = "<p>Loading...</p>";
  const res = await fetch('/api/admin/contacts');
  if (!res.ok) return content.innerHTML = "<p class='text-danger'>Failed</p>";
  const data = await res.json();
  renderTable(data, ['ID','Name','Email','Message','Created_at']);
});

loadApps.addEventListener("click", async () => {
  content.innerHTML = "<p>Loading...</p>";
  const res = await fetch('/api/admin/applications');
  if (!res.ok) return content.innerHTML = "<p class='text-danger'>Failed</p>";
  const data = await res.json();
  renderTable(data, ['ID','Job_title','Name','Email','Phone','Resume_path','Created_at']);
});
