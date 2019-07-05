console.debug(`Resize params: ${resizeParams}`);

// Resize amount being a whole number ala -25, 25, 50, etc.
function getResizeValue(type, resizeAmount, targetElementAmount) {
  console.debug(`Looking to resize ${type} of ${targetElementAmount} by ${resizeAmount} percent.`);

  let resizeWholeAmount = ((100 + resizeAmount) / 100.0);
  let resultAmount = Math.floor(targetElementAmount * resizeWholeAmount);

  console.debug(`Resizing ${type} to ${resizeWholeAmount * 100} percent, which is ${resultAmount}.`);

  return resultAmount;
}

function resize(resizeAmount, targetElementId) {

  if (typeof(resizeAmount) === "undefined") {
    console.debug("No resize amount provided.");
  } else {
    console.debug(`Resizing by ${resizeAmount} percent.`);
  }

  if (typeof(targetElementId) === "undefined") {
    console.debug("No target element id provided.");
  } else {
    console.debug(`Target element id provided: ${targetElementId}`);
  }

  if (typeof(targetElementId) === "undefined" || typeof(resizeAmount) === "undefined") {
    console.debug("Missing target element or resize amount. Aborting.");
    return;
  }

  let element = browser.menus.getTargetElement(targetElementId);

  console.debug(`Target element is: ${JSON.stringify(element)}`);

  if (!element) {
    console.debug(`Could not find target element by id ${targetElementId}. Aborting`);
  } else {
    console.debug(`Element height is ${element.height} and width is ${element.width}.`);

    // Video elements might only have one dimension, as the browser re-adjusts based on aspect ration.
    if (typeof(element.height) !== "undefined" && element.height) {
      let targetHeight = getResizeValue('height', resizeAmount, element.height);
      element.height = targetHeight; //*= (1 + Math.floor(resizeAmount / 100.0));
    } else {
      console.debug("No height on element, skipping resize.");
    }

    if (typeof(element.width) !== "undefined" && element.width) {
      let targetWidth = getResizeValue('width', resizeAmount, element.width);
      element.width = targetWidth;
    } else {
      console.debug("No width on element, skipping resize.");
    }
    
    console.debug(`Element height is now ${element.height} and width is ${element.width}.`);
  }

  console.debug("Done resizing.");
};

resize(resizeParams.resizeAmount, resizeParams.targetElementId);

delete resizeParams;
