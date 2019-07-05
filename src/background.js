function onCreated() {
  if (browser.runtime.lastError) {
    console.debug(`Error: ${browser.runtime.lastError}`);
  } else {
    console.debug("resize-video extension initialized.");
  }
}

console.log(`Context menus are: ${JSON.stringify(browser.contextMenus)}`);

browser.menus.create({
    id: "resize-video_-25",
    title: "-25%",
    // see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus/ContextType
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.menus.create({
    id: "resize-video_-50",
    title: "-50%",
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.menus.create({
    id: "resize-video_25",
    title: "+25%",
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.menus.create({
    id: "resize-video_50",
    title: "+50%",
    contexts: ["video", "image", "selection"]
}, onCreated);

browser.menus.create({
    id: "resize-video_100",
    title: "+100%",
    contexts: ["video", "image", "selection"]
}, onCreated);

const MENU_ITEM_PERCENTS = {
    'resize-video_-25': -25,
    'resize-video_-50': -50,
    'resize-video_25': 25,
    'resize-video_50': 50,
    'resize-video_100': 100
};

function getWholePercentForMenuItem(menuItemId) {
  let percentForId = MENU_ITEM_PERCENTS[menuItemId];

  if (typeof(percentForId) === "undefined") {
    percentForId = 0;
  }

  return percentForId;
}

browser.contextMenus.onClicked.addListener(function (info, tab) {

/**
Example of nested content script, from https://stackoverflow.com/questions/17567624/pass-a-parameter-to-a-content-script-injected-using-chrome-tabs-executescript

chrome.tabs.executeScript(tab.id, {
    code: 'var config = 1;'
}, function() {
    chrome.tabs.executeScript(tab.id, {file: 'content.js'});
});
*/
  let menuItemId = info.menuItemId
  let percentForId = getWholePercentForMenuItem(menuItemId);

  // Nested executeScript code block get picky about parsing, so we need to stringify our code params.
  let resizeParams = { resizeAmount: percentForId, targetElementId: info.targetElementId };
  let stringyParams = JSON.stringify(resizeParams);
  let frameId = info.frameId;
  
  console.debug(`Resize params are: ${stringyParams}`);
  
  browser.tabs.executeScript(tab.id, {
    frameId: frameId,
    code: 'resizeParams = ' + stringyParams + ';'
  }, function() {
      browser.tabs.executeScript(tab.id, { frameId: frameId, file: 'resize.js'});
  });
});
