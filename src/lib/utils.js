const b64ToUnicode = (s) => {
  return s
    .replaceAll("&#039;", "'")
    .replaceAll("&ocirc;", "ô")
    .replaceAll("&rsquo;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&le;", "≤")
    .replaceAll("&ge;", "≥")
    .replaceAll("&eacute;", "é")
    .replaceAll("&shy;", "-")
    .replaceAll("&quot;", '"');
};

module.exports = {
  b64ToUnicode,
};
