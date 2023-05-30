function parseHtml(string) {
  let content = new DOMParser().parseFromString(string, "text/html");
  return content.documentElement.textContent;
}

export default parseHtml;