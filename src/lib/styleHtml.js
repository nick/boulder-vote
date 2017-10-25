import React from 'react'

export default function styleHtml(html) {
  if (!html) { return null }
  return html.split("\n\n").map((h, idx) =>
    <div
      key={idx}
      className="mb-3"
      dangerouslySetInnerHTML={{ __html: h.replace(/(•|·)/g, "<br/>•").replace(/\n- /g, "<br/>- ") }}
    />
  );
}
