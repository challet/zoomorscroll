/*! zoomorscroll - v0.0.1 - 2014-07-16
* https://github.com/challet/zoomorscroll
* Copyright (c) 2014 Clement Hallet; Licensed MIT */
(function ($) {
  
  // define a custom 'capture' event type (TODO make it more jquery style in a specific plugin ?)
  $.event.special.capture = {
    noBubble: true, // used when a manual 'trigger' is fired
    setup: function() {
      return true; // no need to set up a native listener
    },
    teardown: function() {
      return true; // no need to set up a native listener
    },
    add: function(handleObj) {
      this.addEventListener( handleObj.namespace, handleObj.handler, true ); // use capture
    },
    remove: function(handleObj) {
      this.removeEventListener( handleObj.namespace, handleObj.handler , true ); // use capture
    },
    handle: function() {
      // ?
    }
  };

  var initialized = false;
  var no_scroll_timer = window.setTimeout(function(){}); // only to be able to call clearTimeout if no useful timer has been set
  var unhold_it = function() {
    $(this).data('zoomorscroll-holding', false);
  };
  
  // Static method, handles the scroll events
  $.zoomorscroll = function () {
    
    if(initialized) {
      return;
    }
    
    $(document).on('capture.wheel', function(event) {
      
      var zoomable_target = $.zoomorscroll.elements.filter(event.target);
      if(!zoomable_target.length) {
        $.zoomorscroll.elements.has(event.target);
      }
      
      if(zoomable_target.length) {

        // new scroll step, reset unholding conditions
        window.clearTimeout(no_scroll_timer);
        zoomable_target.off('click', unhold_it);
        
        var target_options = zoomable_target.data('zoomorscroll-options');
        
        // add unholding conditions
        if(target_options.reset.no_scroll_timer) {
          no_scroll_timer = window.setTimeout($.proxy( unhold_it, zoomable_target ), target_options.reset.no_scroll_timer);
        }
        if(target_options.reset.click) {
          zoomable_target.one('click', unhold_it);
        }
      }
      
      if(zoomable_target.length && zoomable_target.data('zoomorscroll-holding')) {
        event.stopPropagation();
      } 
      if(!zoomable_target.length) {
        // reset all holdings
        $.zoomorscroll.elements.data('zoomorscroll-holding', true);
        $.zoomorscroll.elements.off('click', unhold_it);
        window.clearTimeout(no_scroll_timer);
      }
      
    });
    
    
  };

  // Collection method.
  $.fn.zoomorscroll = function (options) {
    options = $.extend({}, $.zoomorscroll.options, $(this).data('zoomorscroll-options'), options);
    $(this).data('zoomorscroll-options', options).data('zoomorscroll-holding', true);
    $.merge($.zoomorscroll.elements, $(this));
    $.zoomorscroll();
    return this;
  };

  $.zoomorscroll.options = {
    // conditions to stop the plugin, and let the user zoom the map
    reset : {
      no_scroll_timer: 800, // ms
      click: true
    }
  };
  
  $.zoomorscroll.elements = $();
  

}(jQuery));
