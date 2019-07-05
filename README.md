# extensions-resize-video

A Firefox extension that adds a set of context menu items to resize video elements.

## To Do

* Initial creation of context items should be better.
* Context item ids should be used to lookup scale values, rather than parsed directly as scale values.
* Clean up logging in some way.
* Implement functionality for always scaling based on original size in some way.
  * e.g. store a map of the `content_url: original_size` and pass it as scaling parameters.
* A custom dialogue box for resize amounts/percents.
