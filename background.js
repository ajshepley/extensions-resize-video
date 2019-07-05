function onCreated() {
  if (browser.runtime.lastError) {
    console.debug(`Error: ${browser.runtime.lastError}`);
  } else {
    console.debug("resize-video extension initialized.");
  }
}

// FIXME: TODO: Refactor ids to be unique, switch on them rather than directly parsing their values.
browser.menus.create({
    id: "-25",
    title: "-25%",
    // see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.menus.create({
    id: "-50",
    title: "-50%",
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.menus.create({
    id: "25",
    title: "+25%",
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.menus.create({
    id: "50",
    title: "+50%",
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.contextMenus.onClicked.addListener(function (info, tab) {

/**
Example of nested content script, from https://stackoverflow.com/questions/17567624/pass-a-parameter-to-a-content-script-injected-using-chrome-tabs-executescript

chrome.tabs.executeScript(tab.id, {
    code: 'var config = 1;'
}, function() {
    chrome.tabs.executeScript(tab.id, {file: 'content.js'});
});
*/

  // Nested executeScript code block get picky about parsing, so we need to stringify our code params.
  let resizeParams = { resizeAmount: parseInt(info.menuItemId), targetElementId: info.targetElementId };
  let stringyParams = JSON.stringify(resizeParams);
  
  console.debug(`Resize params are: ${stringyParams}`);
  
  browser.tabs.executeScript(tab.id, {
    frameId: info.frameId,
    code: 'resizeParams = ' + stringyParams + ';'
  }, function() {
      browser.tabs.executeScript(tab.id, { frameId: info.frameId, file: 'resize.js'});
  });
});
