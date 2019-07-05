# extensions-resize-video

A Firefox extension that adds a set of context menu items to resize video, image and selected elements.

This extension merely sets the width or height values of those HTML elements on the currently active tab.

## To Do

In no order,

- [ ] Add travis.yml/build and export configuration.
- [ ] Add tests.
- [ ] Initial creation of context items should be better.
- [ ] Clean up logging in some way.
- [ ] Implement functionality for always scaling based on original size in some way.
  - [ ] e.g. store a map of the `content_url: original_size` and pass it as scaling parameters.
- [ ] A custom dialogue box for resize amounts/percents.

