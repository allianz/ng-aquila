---
title: Video
category: components
b2c: true
expert: true
stable: done
---

The video component only supports YouTube videos. We embedded the YouTube player as iframe tag. For detailed information about this technique, please check out the official [documentation](https://developers.google.com/youtube/player_parameters?hl=en). In order to save bandwidth, the iframe will only be loaded after the user has selected the preview image. Please note that the width of the video depends on the enclosing element and that the player has a fixed aspect ratio of 16:9. YouTube recommends that players should be at least 480px wide and 270px tall.

## Examples

### Basic use case

Videos on YouTube have a unique id which needs to be provided as input videoId. You should also add descriptive values for `altText` and `playButtonAriaLabel`.

Please note that the Angular `DomSanitizer` is used (method bypassSecurityTrustResourceUrl) to append the video id to a YouTube URL. You can find more information on that topic in the official [Angular documentation](https://developers.google.com/youtube/player_parameters?hl=en).

<!-- example(video) -->

### Custom Preview Image

Based on the `videoId`, YouTube provides a preview image. You can use `previewImageSrc` to override this.

<!-- example(video-custom) -->

### Advanced Configuration

All videos are configured to start playing automatically (query parameter "autoplay"), to not show related videos ("rel") and to not display information like the video title and uploader before the video starts playing ("showinfo"). Some additional configuration parameters can be passed to the YouTube iframe. For more information on the effect of the respective query parameters, consult the [Youtube documentation](https://developers.google.com/youtube/player_parameters?hl=en#Parameters). The following parameters are available:

-   `showPlayerControls`: Setting this to false causes the player controls to be hidden (query param "controls").
-   `allowFullScreen`: Setting this to false hides the fullscreen option while the rest of the controls remain visible (query param "fs").
-   `interfaceLanguage`: Use this to override the interface language with a fully specified locale or ISO 639-1 two-letter language code (query param "hl"). In the following example, the fullscreen option is disabled and the interface language is set to French.

<!-- example(video-advanced) -->

### Accessibility

Please remember to provide a descriptive alt-text for the preview image via the `altText` input. If no alt text is provided, screen readers and other assistive technology will ignore the image. You can also set a value for the `aria-label` attribute on the play button (`playButtonAriaLabel`). If no label attribute is provided, the value of the preview image alt attribute is used together with the suffix "Play Video". For the video iframe itself, YouTube will take care of accessibility.
