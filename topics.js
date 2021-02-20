if (
  /* document.querySelector("h4.gu").innerText ==
  "Chosen for further distribution." */
  document.documentElement.textContent.indexOf('Chosen for further distribution') > -1
   || document.documentElement.innerText.indexOf('Chosen for further distribution') > -1
) {
  const articleLink = document.querySelector("h2 a").getAttribute("href");
  chrome.runtime.sendMessage({ articleLink: articleLink }, function (response) {
    if (response.topics) {
      response.topics.forEach((el) => {
        const outerContainer = document.createElement("DIV");
        outerContainer.style.marginLeft = "8px";

        const middleContainer = document.createElement("DIV");

        const container = document.createElement("DIV");
        container.style.border = "1px solid rgba(204, 204, 204, 1)"
        container.style.padding = "4px 8px"

        const span = document.createElement("SPAN");
        span.style.textTransform = "uppercase"
        span.style.letterSpacing = "0.077em"
        span.style.color = "rgba(117, 117, 117, 1)"
        span.style.fontSize = "13px"
        span.style.fontFamily = 'sohne, "Helvetica Neue", Helvetica, Arial, sans-serif'


        span.innerText = el;

        container.appendChild(span);
        middleContainer.appendChild(container);
        outerContainer.appendChild(middleContainer);

        document.querySelector("p.gu").innerText = "Chosen for further distribution in:"
        document.querySelector("p.gu").parentNode.removeAttribute("t");
        document.querySelector("p.gu").parentNode.append(outerContainer);
      });
    }
  });
}