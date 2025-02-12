this.Options = (function() {
  function Options(app) {
    this.app = app;
    this.textInput("projectoption-name", (function(_this) {
      return function(value) {
        return _this.optionChanged("title", value);
      };
    })(this));
    this.project_slug_validator = new InputValidator(document.getElementById("projectoption-slug"), document.getElementById("project-slug-button"), null, (function(_this) {
      return function(value) {
        return _this.optionChanged("slug", value[0]);
      };
    })(this));
    this.project_code_validator = new InputValidator(document.getElementById("projectoption-code"), document.getElementById("project-code-button"), null, (function(_this) {
      return function(value) {
        return _this.optionChanged("code", value[0]);
      };
    })(this));
    this.selectInput("projectoption-orientation", (function(_this) {
      return function(value) {
        return _this.orientationChanged(value);
      };
    })(this));
    this.selectInput("projectoption-aspect", (function(_this) {
      return function(value) {
        return _this.aspectChanged(value);
      };
    })(this));
    this.selectInput("projectoption-graphics", (function(_this) {
      return function(value) {
        return _this.graphicsChanged(value);
      };
    })(this));
    this.app.appui.setAction("add-project-user", (function(_this) {
      return function() {
        return _this.addProjectUser();
      };
    })(this));
    document.getElementById("add-project-user-nick").addEventListener("keyup", (function(_this) {
      return function(event) {
        if (event.keyCode === 13) {
          return _this.addProjectUser();
        }
      };
    })(this));
  }

  Options.prototype.textInput = function(element, action) {
    var e;
    e = document.getElementById(element);
    return e.addEventListener("input", (function(_this) {
      return function(event) {
        return action(e.value);
      };
    })(this));
  };

  Options.prototype.selectInput = function(element, action) {
    var e;
    e = document.getElementById(element);
    return e.addEventListener("change", (function(_this) {
      return function(event) {
        return action(e.options[e.selectedIndex].value);
      };
    })(this));
  };

  Options.prototype.projectOpened = function() {
    PixelatedImage.setURL(document.getElementById("projectoptions-icon"), this.app.project.getFullURL() + "icon.png", 160);
    document.getElementById("projectoption-name").value = this.app.project.title;
    this.project_slug_validator.set(this.app.project.slug);
    document.getElementById("projectoption-slugprefix").innerText = location.origin.replace(".dev", ".io") + ("/" + this.app.project.owner.nick + "/");
    document.getElementById("projectoption-orientation").value = this.app.project.orientation;
    document.getElementById("projectoption-aspect").value = this.app.project.aspect;
    document.getElementById("projectoption-graphics").value = this.app.project.graphics || "M1";
    this.updateSecretCodeLine();
    this.updateUserList();
    this.app.project.addListener(this);
    return document.querySelector("#projectoptions-users").style.display = this.app.user.flags.guest ? "none" : "block";
  };

  Options.prototype.updateSecretCodeLine = function() {
    this.project_code_validator.set(this.app.project.code);
    return document.getElementById("projectoption-codeprefix").innerText = location.origin.replace(".dev", ".io") + ("/" + this.app.project.owner.nick + "/" + this.app.project.slug + "/");
  };

  Options.prototype.projectUpdate = function(name) {
    var icon;
    if (name === "spritelist") {
      icon = this.app.project.getSprite("icon");
      if (icon != null) {
        return icon.addImage(document.getElementById("projectoptions-icon"), 160);
      }
    }
  };

  Options.prototype.update = function() {
    var storage;
    storage = this.app.appui.displayByteSize(this.app.project.getSize());
    return document.getElementById("projectoption-storage-used").innerText = storage;
  };

  Options.prototype.optionChanged = function(name, value) {
    if (value.trim().length === 0) {
      return;
    }
    switch (name) {
      case "title":
        this.app.project.setTitle(value);
        break;
      case "slug":
        if (value !== RegexLib.slugify(value)) {
          value = RegexLib.slugify(value);
          this.project_slug_validator.set(value);
        }
        if (value.length === 0 || value === this.app.project.slug) {
          return;
        }
        this.app.project.setSlug(value);
        this.updateSecretCodeLine();
        break;
      case "code":
        this.app.project.setCode(value);
    }
    return this.app.client.sendRequest({
      name: "set_project_option",
      project: this.app.project.id,
      option: name,
      value: value
    }, (function(_this) {
      return function(msg) {
        if (msg.name === "error" && (msg.value != null)) {
          switch (name) {
            case "title":
              document.getElementById("projectoption-name").value = msg.value;
              return _this.app.project.setTitle(msg.value);
            case "slug":
              _this.project_slug_validator.set(msg.value);
              _this.app.project.setSlug(msg.value);
              return _this.updateSecretCodeLine();
          }
        }
      };
    })(this));
  };

  Options.prototype.orientationChanged = function(value) {
    this.app.project.setOrientation(value);
    return this.app.client.sendRequest({
      name: "set_project_option",
      project: this.app.project.id,
      option: "orientation",
      value: value
    }, (function(_this) {
      return function(msg) {};
    })(this));
  };

  Options.prototype.aspectChanged = function(value) {
    this.app.project.setAspect(value);
    return this.app.client.sendRequest({
      name: "set_project_option",
      project: this.app.project.id,
      option: "aspect",
      value: value
    }, (function(_this) {
      return function(msg) {};
    })(this));
  };

  Options.prototype.graphicsChanged = function(value) {
    this.app.project.setGraphics(value);
    this.app.client.sendRequest({
      name: "set_project_option",
      project: this.app.project.id,
      option: "graphics",
      value: value
    }, (function(_this) {
      return function(msg) {};
    })(this));
    return this.app.appui.updateAllowedSections();
  };

  Options.prototype.setType = function(type) {
    if (type !== this.app.project.type) {
      console.info("setting type to " + type);
      this.app.project.setType(type);
      return this.app.client.sendRequest({
        name: "set_project_option",
        project: this.app.project.id,
        option: "type",
        value: type
      }, (function(_this) {
        return function(msg) {};
      })(this));
    }
  };

  Options.prototype.addProjectUser = function() {
    var nick;
    nick = document.getElementById("add-project-user-nick").value;
    if (nick.trim().length > 0) {
      this.app.client.sendRequest({
        name: "invite_to_project",
        project: this.app.project.id,
        user: nick
      }, (function(_this) {
        return function(msg) {
          return console.info(msg);
        };
      })(this));
      return document.getElementById("add-project-user-nick").value = "";
    }
  };

  Options.prototype.updateUserList = function() {
    var div, fn, i, len, ref, user;
    div = document.getElementById("project-user-list");
    div.innerHTML = "";
    ref = this.app.project.users;
    fn = (function(_this) {
      return function(user) {
        var e, name, remove;
        e = document.createElement("div");
        e.classList.add("user");
        name = document.createElement("div");
        name.classList.add("username");
        name.innerHTML = user.nick + " " + (user.accepted ? "<i class='fa fa-check'></i>" : "<i class='fa fa-clock'></i>");
        remove = document.createElement("div");
        remove.classList.add("remove");
        remove.innerHTML = "<i class='fa fa-times'></i> Remove";
        remove.addEventListener("click", function(event) {
          return _this.app.client.sendRequest({
            name: "remove_project_user",
            project: _this.app.project.id,
            user: user.nick
          });
        });
        e.appendChild(remove);
        e.appendChild(name);
        return div.appendChild(e);
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      user = ref[i];
      fn(user);
    }
  };

  return Options;

})();
