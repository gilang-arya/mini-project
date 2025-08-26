const EDITOR_COL = document.getElementById("editor");
const PREVIEW_COL = document.getElementById("preview");

EDITOR_COL.addEventListener("input", () => {
  PREVIEW_COL.innerHTML = markdown2HTML(EDITOR_COL.value);
});

function markdown2HTML(str) {
  let html = str;

  const rules = [
    // Heading
    { regex: /^### (.*$)/gim, replace: "<h3>$1</h3>" },
    { regex: /^## (.*$)/gim, replace: "<h2>$1</h2>" },
    { regex: /^# (.*$)/gim, replace: "<h1>$1</h1>" },

    // Bold
    { regex: /\*\*(.*?)\*\*/gim, replace: "<b>$1</b>" },

    // Italic
    { regex: /\*(.*?)\*/gim, replace: "<i>$1</i>" },

    // Horizontal Rule
    { regex: /---/g, replace: "<hr/>" },

    // Inline code
    {
      regex: /\`(.*?)\`/gim,
      replace: '<span class="badge text-bg-secondary">$1</span>',
    },
  ];

  rules.forEach((rule) => {
    html = html.replace(rule.regex, rule.replace);
  });

  // Ordered List
  html = html.replace(/(^(\d+)\. .*(\n|$))+/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((item) => `<li>${item.replace(/^(\d+)\. /, "")}</li>`);
    return `<ol>${items.join("")}</ol>`;
  });

  // Unordered List
  html = html.replace(/(^(-+) .*(\n|$))+/gm, (match) => {
    const items = match
      .trim()
      .split("\n")
      .map((item) => `<li>${item.replace(/^(-+) /, "")}</li>`);
    return `<ul>${items.join("")}</ul>`;
  });

  // Blockquote
  html = html.replace(/(^> .*(\n|$))+/gm, (match) => {
    const lines = match.split("\n").map((line) => line.replace(/^> /, ""));
    return `<blockquote class="blockquote bg-secondary-subtle"><p class="ps-2">${lines.join(
      "<br/>"
    )}</p></blockquote>`;
  });

  // Line Break
  html = html.replace(/\n/g, "<br/>");

  return html.trim();
}
