# ZoomOrScroll

Prevent map plugins from zooming while the page is being scrolled

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
_(Coming soon)_

## Examples
_(Coming soon)_

## Release History
_(Nothing yet)_
