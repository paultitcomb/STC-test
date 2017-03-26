(function(){
  // define some vars
  let baseUrl;

  // make an Ajax call and get the json data back
  function getData() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        // if it successfully returns data, hand it off to another function
        if (req.readyState == XMLHttpRequest.DONE) {
            handleResults(req.responseText);
        }
    };
    req.open("GET", "/data/test.json");
    req.send();
  }

  // handle the data sent back and hand it off to a function to build markup
  function handleResults(data) {
    const results = JSON.parse(data);
    const items = results.heroList.heroItems;
    let markup = '';
    baseUrl = results.baseSite;
    for (var i = 0; i < items.length; i++) {
      let count = i + 1;
      // append the generated markup for each item in the array into the markup var
      markup += createMarkup(i, items[i]);

      // if it is the last item in the array append all the generated markup to the page
      if (count === results.numArticles) {
        appendMarkup(markup);
      }
    }
  }

  // depending on which item in the array it is we need to create a column container for it
  function createMarkup(i, item) {
    let count = i + 1;
    let itemMarkup = '';
    let html = generateCommonMarkup(count, item);

    switch (count) {
      case 1:
        itemMarkup += `<div class="col col-2 hero-link">${html}</div>`;
        break;
      case 2:
        itemMarkup += `<div class="col col-1">${html}`;
        break;
      case 3:
        itemMarkup += `${html}</div>`;
        break;
    }

    return itemMarkup;
  }

  // create the common markup for each item in the array and return it
  function generateCommonMarkup(count, item) {
    let html = `
    <article class="tile tile-${count}">
      <a href="${baseUrl}${item.cta.link}" class="image-link">
        <img src="${baseUrl}${item.imageUrl}" alt="${item.headlineText}" />
      </a>
      <div class="overlay">
        <h2>${item.headlineText}</h2>
        <a href="${baseUrl}${item.cta.link}" class="cta-overlay">${item.cta.text}</a>
      </div>
    </article>`;
    return html;
  }

  // append the generated markup to the page
  function appendMarkup(markup) {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = markup;
  }

  // Kick it off by fetching the json data
  getData();
})();
