chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.articleLink) {

    const articleId = request.articleLink.split("/p/")[1].split("?")[0]

    fetch("https://www.medium.com" + request.articleLink)
      .then((r) => r.text())
      .then((result) => {
        const parser = new DOMParser();
        const htmlDocument = parser.parseFromString(result, "text/html");
        
        const metaData = htmlDocument.getElementsByTagName("script")
       
        const desiredScripted = Array.prototype.slice.call(metaData)
        const filtered = desiredScripted.filter((script) => {
            return script.innerText.includes("window.__APOLLO_STATE__");
          });
        
        const metaFields = JSON.parse(filtered[0].innerText.split("window.__APOLLO_STATE__ = ")[1]);
        const metaPost = metaFields[`Post:${articleId}`]
        const metaTopics = metaPost["topics"]
        const topics = metaTopics.map(topic => topic.name)
        sendResponse({ topics: topics })
        return topics;
      })
  }
  return true;
});
