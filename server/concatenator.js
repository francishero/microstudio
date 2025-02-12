var fs;

fs = require("fs");

this.Concatenator = (function() {
  function Concatenator(webapp) {
    this.webapp = webapp;
    this.webapp.app.get(/^\/all.js$/, (function(_this) {
      return function(req, res) {
        res.setHeader("Content-Type", "text/javascript");
        return res.send(_this.webapp_js_concat);
      };
    })(this));
    this.webapp.app.get(/^\/all.css$/, (function(_this) {
      return function(req, res) {
        res.setHeader("Content-Type", "text/css");
        return res.send(_this.webapp_css_concat);
      };
    })(this));
    this.webapp.app.get(/^\/play.js$/, (function(_this) {
      return function(req, res) {
        res.setHeader("Content-Type", "text/javascript");
        return res.send(_this.player_js_concat);
      };
    })(this));
    this.webapp.app.get(/^\/play3d.js$/, (function(_this) {
      return function(req, res) {
        res.setHeader("Content-Type", "text/javascript");
        return res.send(_this.player3d_js_concat);
      };
    })(this));
    this.webapp.app.get(/^\/audioengine.js$/, (function(_this) {
      return function(req, res) {
        res.setHeader("Content-Type", "text/javascript");
        if (!_this.webapp.server.use_cache) {
          return _this.concat(_this.audioengine_js, "audioengine_js_concat", function() {
            return res.send(_this.audioengine_js_concat);
          });
        } else {
          return res.send(_this.audioengine_js_concat);
        }
      };
    })(this));
    this.webapp_css = ["/css/style.css", "/css/home.css", "/css/doc.css", "/css/code.css", "/css/assets.css", "/css/sprites.css", "/css/sounds.css", "/css/synth.css", "/css/music.css", "/css/maps.css", "/css/publish.css", "/css/explore.css", "/css/options.css", "/css/user.css", "/css/media.css", "/css/terminal.css", "/css/tutorial.css", "/css/md.css"];
    this.webapp_js = ["/js/microscript/random.js", "/js/microscript/microvm.js", "/js/microscript/tokenizer.js", "/js/microscript/token.js", "/js/microscript/parser.js", "/js/microscript/program.js", "/js/microscript/jstranspiler.js", "/js/client/client.js", "/js/util/canvas2d.js", "/js/util/regexlib.js", "/js/util/inputvalidator.js", "/js/util/translator.js", "/js/manager.js", "/js/about/about.js", "/js/doc/documentation.js", "/js/doceditor/doceditor.js", "/js/editor/editor.js", "/js/editor/runwindow.js", "/js/editor/rulercanvas.js", "/js/editor/valuetool.js", "/js/options/options.js", "/js/publish/publish.js", "/js/publish/appbuild.js", "/js/explore/explore.js", "/js/explore/projectdetails.js", "/js/user/usersettings.js", "/js/user/translationapp.js", "/js/spriteeditor/drawtool.js", "/js/spriteeditor/spritelist.js", "/js/spriteeditor/spriteeditor.js", "/js/spriteeditor/colorpicker.js", "/js/spriteeditor/spriteview.js", "/js/spriteeditor/animationpanel.js", "/js/spriteeditor/autopalette.js", "/js/mapeditor/mapview.js", "/js/mapeditor/mapeditor.js", "/js/mapeditor/tilepicker.js", "/js/assets/assetsmanager.js", "/js/assets/assetviewer.js", "/js/sound/audiocontroller.js", "/js/sound/knob.js", "/js/sound/slider.js", "/js/sound/keyboard.js", "/js/sound/synthwheel.js", "/js/sound/synth.js", "/js/sound/soundeditor.js", "/js/sound/soundthumbnailer.js", "/js/music/musiceditor.js", "/js/util/undo.js", "/js/util/random.js", "/js/util/splitbar.js", "/js/util/pixelartscaler.js", "/js/util/pixelatedimage.js", "/js/runtime/sprite.js", "/js/runtime/spriteframe.js", "/js/runtime/map.js", "/js/terminal/terminal.js", "/js/project/project.js", "/js/project/projectsource.js", "/js/project/projectsprite.js", "/js/project/projectmap.js", "/js/project/projectasset.js", "/js/project/projectsound.js", "/js/project/projectmusic.js", "/js/appui/floatingwindow.js", "/js/appui/appui.js", "/js/app.js", "/js/appstate.js", "/js/tutorial/tutorials.js", "/js/tutorial/tutorial.js", "/js/tutorial/tutorialwindow.js", "/js/tutorial/highlighter.js"];
    this.player_js = ['/js/util/canvas2d.js', "/js/microscript/random.js", "/js/microscript/microvm.js", "/js/microscript/tokenizer.js", "/js/microscript/token.js", "/js/microscript/parser.js", "/js/microscript/program.js", "/js/microscript/jstranspiler.js", '/js/runtime/runtime.js', '/js/runtime/screen.js', '/js/runtime/keyboard.js', '/js/runtime/gamepad.js', '/js/runtime/sprite.js', '/js/runtime/spriteframe.js', '/js/runtime/map.js', "/js/runtime/audio/audio.js", "/js/runtime/audio/beeper.js", "/js/runtime/audio/sound.js", "/js/runtime/audio/music.js", '/js/play/player.js', '/js/play/playerclient.js'];
    this.player3d_js = ['/js/util/canvas2d.js', "/js/microscript/random.js", "/js/microscript/microvm.js", "/js/microscript/tokenizer.js", "/js/microscript/token.js", "/js/microscript/parser.js", "/js/microscript/program.js", "/js/microscript/jstranspiler.js", '/js/runtime/m3d/screen3d.js', '/js/runtime/m3d/m3d.js', '/js/runtime/runtime.js', '/js/runtime/keyboard.js', '/js/runtime/gamepad.js', '/js/runtime/sprite.js', '/js/runtime/spriteframe.js', '/js/runtime/map.js', "/js/runtime/audio/audio.js", "/js/runtime/audio/beeper.js", "/js/runtime/audio/sound.js", "/js/runtime/audio/music.js", '/js/play/player.js', '/js/play/playerclient.js'];
    this.audioengine_js = ["/js/sound/audioengine/utils.js", "/js/sound/audioengine/oscillators.js", "/js/sound/audioengine/modulation.js", "/js/sound/audioengine/filters.js", "/js/sound/audioengine/effects.js", "/js/sound/audioengine/voice.js", "/js/sound/audioengine/instrument.js", "/js/sound/audioengine/audioengine.js"];
    this.refresh();
  }

  Concatenator.prototype.refresh = function() {
    this.concat(this.webapp_js, "webapp_js_concat");
    this.concat(this.player_js, "player_js_concat");
    this.concat(this.player3d_js, "player3d_js_concat");
    this.concat(this.webapp_css, "webapp_css_concat");
    return this.concat(this.audioengine_js, "audioengine_js_concat");
  };

  Concatenator.prototype.getHomeJSFiles = function() {
    if (this.webapp.server.use_cache && (this.webapp_js_concat != null)) {
      return ["/all.js"];
    } else {
      return this.webapp_js;
    }
  };

  Concatenator.prototype.getHomeCSSFiles = function() {
    if (this.webapp.server.use_cache && (this.webapp_css_concat != null)) {
      return ["/all.css"];
    } else {
      return this.webapp_css;
    }
  };

  Concatenator.prototype.getPlayerJSFiles = function(graphics) {
    if (graphics === "M3D") {
      if (this.webapp.server.use_cache && (this.player3d_js_concat != null)) {
        return ["/play3d.js"];
      } else {
        return this.player3d_js;
      }
    } else {
      if (this.webapp.server.use_cache && (this.player_js_concat != null)) {
        return ["/play.js"];
      } else {
        return this.player_js;
      }
    }
  };

  Concatenator.prototype.concat = function(files, variable, callback) {
    var f, funk, list, res;
    list = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = files.length; i < len; i++) {
        f = files[i];
        results.push(f);
      }
      return results;
    })();
    res = "";
    funk = (function(_this) {
      return function() {
        if (list.length > 0) {
          f = list.splice(0, 1)[0];
          f = "../static" + f;
          return fs.readFile(f, function(err, data) {
            if ((data != null) && (err == null)) {
              res += data + "\n";
              return funk();
            } else if (err) {
              return console.info(err);
            }
          });
        } else {
          _this[variable] = res;
          if (callback != null) {
            return callback();
          }
        }
      };
    })(this);
    return funk();
  };

  return Concatenator;

})();

module.exports = this.Concatenator;
