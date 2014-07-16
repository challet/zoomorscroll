# ZoomOrScroll

Prevent map plugins from zooming while the page is being scrolled.

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/challet/jquery-zoomorscroll/master/dist/jquery.zoomorscroll.min.js
[max]: https://raw.github.com/challet/jquery-zoomorscroll/master/dist/jquery.zoomorscroll.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/zoomorscroll.min.js"></script>
<script>
jQuery(function($) {
  $('#mapelement').zoomorscroll({
     // the scroll events won't reach the #mapelement
     // until one of the following condition has been reached
     reset : {
       no_scroll_timer: 800, // ms
       click: true
     }
  }); 
});
</script>
```

## Documentation

Works on browsers using **only** the [wheel event](https://developer.mozilla.org/en-US/docs/Web/Events/wheel)

For instance, with Firefox : 
 * two events are thrown for an actual mouse wheel : *wheel* and *DOMMouseScroll* (backward compatibility, see [here](https://developer.mozilla.org/en-US/docs/Web/Events/wheel#The_event_order_with_legacy_mouse_scroll_events))
 * *wheel* would be held by ZoomOrScroll
 * *DOMMouseScroll* would reach the map and still zoom (maps APIs generally catch all of them for multi browser compatibility)

## Examples
_(Coming soon)_

## Release History
* 0.0.1 : POC
