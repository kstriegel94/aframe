/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */

AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    video_target: {type: 'selector'},
    video_src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    var scene1 = document.getElementById('links');
    var scene2 = document.getElementById('scene2');

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);

        if(data.video_src === "none") {
            document.querySelector('#video').pause();

            document.getElementById('scene2').setAttribute('visible', 'false');
            document.getElementById('links').setAttribute('visible', 'true');
        }

        else {
            document.querySelector('#video').pause();
            document.querySelector('#video').setAttribute('src', 'video/' + data.video_src + '.mp4');

            document.getElementById('links').setAttribute('visible', 'false');
            document.getElementById('scene2').setAttribute('visible', 'true');
        }
      }, data.dur);
  });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;
    var targetEl = this.data.target;

    // Only set up once.
    if (targetEl.dataset.setImageFadeSetup) { document.getElementById('scene2').setAttribute('visible', 'false'); return; }
    targetEl.dataset.setImageFadeSetup = true;

    // Create animation.
    targetEl.setAttribute('animation__fade', {
      property: 'material.color',
      startEvents: 'set-image-fade',
      dir: 'alternate',
      dur: data.dur,
      from: '#FFF',
      to: '#000'
    });
  }
});

AFRAME.registerComponent('hide-cursor', {
    init: function () {
        var data = this.data;
        var el = this.el;

        el.addEventListener('mouseenter', function() {
            document.getElementById('cursor').setAttribute('visible', 'false');
        }, data.dur);

        el.addEventListener('mouseleave', function() {
            document.getElementById('cursor').setAttribute('visible', 'true');
        }, data.dur);
    }
});
