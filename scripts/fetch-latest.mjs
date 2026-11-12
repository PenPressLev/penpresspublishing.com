// Rewrites the "Latest from the Vanguard" block in index.html from the Substack RSS.
// Run by the deploy workflow: `node scripts/fetch-latest.mjs` (Node 18+, no dependencies).
// Fail-soft: if the feed cannot be read, the page keeps the titles it already has.
import { readFileSync, writeFileSync } from "node:fs";
const FEED = "https://levmontgomery.substack.com/feed";
const LINES = ["Morning Mastery™","Morning Mastery","Lightning Scripture™","Lightning Scripture","The King’s Hour","The King's Hour","Pen & Press Parables","The Hearth","The Inner Court","After Hours With God™","After Hours With God","The Plumb Line","Vanguard Flash","The Pen & Press Exposition","The Composing Room"];
const decode = (s) => s.replace(/&amp;/g,"&").replace(/&#8217;|&rsquo;/g,"’").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">");
const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
function split(full){
  if (full.includes("|")) { const [a,...b]=full.split("|"); return [a.trim(), b.join("|").trim()]; }
  for (const l of LINES) { const m = full.match(new RegExp("^"+l.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*[:\\-–—]\\s*(.+)$","i")); if (m) return [l, m[1].trim()]; }
  return ["The Vanguard", full];
}
try {
  let res = await fetch(FEED, { headers: { "User-Agent": "PenPressSite/1.0 (+https://penpresspublishing.com)", "Accept": "application/rss+xml, application/xml, text/xml" } });
  if (!res.ok) res = await fetch(FEED, { headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36", "Accept": "application/rss+xml, application/xml, text/xml, */*" } });
  const xml = await res.text();
  if (!res.ok) throw new Error("feed returned " + res.status + " | " + xml.slice(0, 160).replace(/\s+/g, " "));
  if (!/<item>/.test(xml)) throw new Error("no items in feed | " + xml.slice(0, 160).replace(/\s+/g, " "));
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, 6).map(m => {
    const g = (t) => (m[1].match(new RegExp(`<${t}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${t}>`)) || [])[1]?.trim() ?? "";
    const [line, title] = split(decode(g("title")));
    return { line, title, link: g("link") };
  }).filter(i => i.title && /^https:\/\/[^"\s]+$/.test(i.link));
  if (items.length < 3) throw new Error("only " + items.length + " usable posts in the feed");
  const block = `      <div class="latest" id="latestPosts">\n` + items.map(i =>
    `        <a class="post" href="${i.link}" target="_blank" rel="noopener"><span class="ln">${esc(i.line)}</span><h3>${esc(i.title)}</h3><span class="arrow">Read →</span></a>`
  ).join("\n") + `\n      </div>`;
  const before = readFileSync("index.html", "utf8");
  const after = before.replace(/(<!-- LATEST:BEGIN[^\n]*\n)[\s\S]*?(\n\s*<!-- LATEST:END -->)/, (_, a, b) => a + block + b);
  if (after === before && !before.includes(items[0].link)) throw new Error("LATEST markers not found in index.html");
  writeFileSync("index.html", after);
  console.log(`Latest updated with ${items.length} posts: ` + items.map(i => i.line + " | " + i.title).join(" ; "));
} catch (e) {
  console.log("Latest left as it was: " + e.message);
}
