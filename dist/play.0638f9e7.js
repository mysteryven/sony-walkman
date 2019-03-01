// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"js/play.js":[function(require,module,exports) {
{
  var view = {
    el: '#player',
    template: "\n    <div class=\"player-close\">\n    <svg class=\"icon player-arrow\" aria-hidden=\"true\" id=\"close\">\n      <use xlink:href=\"#icon-arrow-down\"></use>\n    </svg>\n    </div>\n  <div id=\"playerCover\" class=\"player-cover\" \n    style=\"background-image: url(../img/cover.jpeg)\"> </div>\n  <div class=\"player-information\">\n    <h2 class='name'>\u53D1\u73B0\u597D\u97F3\u4E50</h2>\n    <div class='artist'></div>\n  </div>\n  <div class=\"player-controllers\">\n    <!--    \n    <svg class=\"icon player-arrow\" aria-hidden=\"true\">\n      <use xlink:href=\"#icon-right-arrow-copy\"></use>\n    </svg>\n    -->\n    <div>\n      <svg class=\"icon player-play\" aria-hidden=\"true\" id=\"playButton\">\n        <use xlink:href=\"#icon-play1\"></use>\n      </svg>\n      <svg class=\"icon player-play\" aria-hidden=\"true\" id=\"pauseButton\">\n        <use xlink:href=\"#icon-pause\"></use>\n      </svg>\n    </div>\n    <!--\n    <svg class=\"icon player-arrow\" aria-hidden=\"true\">\n      <use xlink:href=\"#icon-icverticleright-copy\"></use>\n    </svg>\n    -->\n  </div>\n  <div id=\"songContainer\">\n   \n  </div>\n    ",
    render: function render() {
      $(this.el).html(this.template);
    },
    init: function init() {
      this.$el = $(this.el);
    }
  };
  var model = {
    data: {
      song: {},
      audio: {}
    }
  };
  var controller = {
    init: function init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render();
      this.view.init();
      this.bindEvents();
      this.bindEventHub();
    },
    bindEvents: function bindEvents() {
      $(this.view.el).on('click', '#playButton', function (e) {
        $('#player').addClass('playing');
        beActive('#currentPause');
        document.querySelector('#songContainer audio').play();
      });
      $(this.view.el).on('click', '#pauseButton', function (e) {
        $('#player').removeClass('playing');
        beActive('#currentPlay');
        document.querySelector('#songContainer audio').pause();
      });
      this.view.$el.on('click', '#close', function () {
        disActive('#player');
        location.hash = location.hash.replace('-y', '-n');
      });
    },
    bindEventHub: function bindEventHub() {
      var _this = this;

      window.eventHub.on('playSong', function (data) {
        _this.initSong(data);
      });
      window.eventHub.on('playClick', function (data) {
        document.querySelector('#songContainer audio').play();
      });
      window.eventHub.on('pauseClick', function (data) {
        document.querySelector('#songContainer audio').pause();
      });
    },
    initSong: function initSong(_ref) {
      var url = _ref.url,
          cover = _ref.cover,
          name = _ref.name,
          artist = _ref.artist;
      this.view.$el.find('#songContainer').removeAttr('src');
      this.view.$el.find('#songContainer').attr('src', url);
      $('#songContainer').empty();
      var audio = "<audio src=".concat(url, " style=\"display: none\"></audio>");
      $('#songContainer').html(audio);
      document.querySelector('#songContainer audio').play();
      $('#player').addClass('playing');
      beActive('#currentPause');
      this.view.$el.find('#playerCover').css({
        'background-image': "url(".concat(cover, ")")
      });
      this.view.$el.find('.player-information .name').html(name);
      this.view.$el.find('.player-information .artist').html(artist);
    }
  };
  controller.init(view, model);
}
},{}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64743" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/play.js"], null)
//# sourceMappingURL=/play.0638f9e7.map