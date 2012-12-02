/*
    Monocle 1.0.0
    http://monocle.tapquo.com

    Copyright (C) 2011,2012 Javi Jiménez Villar (@soyjavi)

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
    DEALINGS IN THE SOFTWARE.
*/


(function() {
  var Events, Module, Monocle, moduleKeywords,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Events = {
    bind: function(ev, callback) {
      var calls, evs, name, _i, _len;
      evs = ev.split(' ');
      calls = this.hasOwnProperty('_callbacks') && this._callbacks || (this._callbacks = {});
      for (_i = 0, _len = evs.length; _i < _len; _i++) {
        name = evs[_i];
        calls[name] || (calls[name] = []);
        calls[name].push(callback);
      }
      return this;
    },
    trigger: function() {
      var args, callback, ev, list, _i, _len, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      ev = args.shift();
      list = this.hasOwnProperty('_callbacks') && ((_ref = this._callbacks) != null ? _ref[ev] : void 0);
      if (!list) {
        return;
      }
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        callback = list[_i];
        if (callback.apply(this, args) === false) {
          break;
        }
      }
      return true;
    },
    unbind: function(ev, callback) {
      var cb, i, list, _i, _len, _ref;
      if (!ev) {
        this._callbacks = {};
        return this;
      }
      list = (_ref = this._callbacks) != null ? _ref[ev] : void 0;
      if (!list) {
        return this;
      }
      if (!callback) {
        delete this._callbacks[ev];
        return this;
      }
      for (i = _i = 0, _len = list.length; _i < _len; i = ++_i) {
        cb = list[i];
        if (!(cb === callback)) {
          continue;
        }
        list = list.slice();
        list.splice(i, 1);
        this._callbacks[ev] = list;
        break;
      }
      return this;
    }
  };

  moduleKeywords = ['included', 'extended'];

  Module = (function() {

    Module.include = function(obj) {
      var included, key, value;
      if (!obj) {
        throw new Error('include(obj) requires obj');
      }
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      included = obj.included;
      if (included) {
        included.apply(this);
      }
      return this;
    };

    Module.extend = function(obj) {
      var key, value, _ref;
      if (!obj) {
        throw new Error('extend(obj) requires obj');
      }
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref = obj.extended) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Module.proxy = function(method) {
      var _this = this;
      return function() {
        return method.apply(_this, arguments);
      };
    };

    Module.prototype.proxy = function(method) {
      var _this = this;
      return function() {
        return method.apply(_this, arguments);
      };
    };

    Module.prototype.delay = function(method, timeout) {
      return setTimeout(this.proxy(method), timeout || 0);
    };

    function Module() {
      if (typeof this.init === "function") {
        this.init.apply(this, args);
      }
    }

    return Module;

  })();

  Monocle = this.Monocle = {};

  Monocle.version = "0.9.4";

  Monocle.Events = Events;

  Monocle.Module = Module;

  Monocle.Templates = {};

  Monocle.Dom = function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (typeof $$ !== "undefined" && $$ !== null) {
      return $$.apply(null, args);
    } else {
      return $.apply(null, args);
    }
  };

  Module.extend.call(Monocle, Events);

  Module.create = function(instances, statics) {
    var Result;
    Result = (function(_super) {

      __extends(Result, _super);

      function Result() {
        return Result.__super__.constructor.apply(this, arguments);
      }

      return Result;

    })(this);
    if (instances) {
      Result.include(instances);
    }
    if (statics) {
      Result.extend(statics);
    }
    if (typeof Result.unbind === "function") {
      Result.unbind();
    }
    return Result;
  };

  this.__ = Monocle.App = {
    Model: {},
    View: {},
    Controller: {}
  };

  this.__Model = Monocle.App.Model;

  this.__View = Monocle.App.View;

  this.__Controller = Monocle.App.Controller;

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {
  var guid,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Monocle.Model = (function(_super) {

    __extends(Model, _super);

    Model.extend(Monocle.Events);

    Model.records = {};

    Model.attributes = [];

    Model.fields = function() {
      var attributes;
      attributes = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      this.records = {};
      if (attributes.length) {
        this.attributes = attributes;
      }
      this.attributes || (this.attributes = []);
      this.unbind();
      return this;
    };

    Model.create = function(attributes) {
      var record;
      record = new this(attributes);
      return record.save();
    };

    Model.uid = function(prefix) {
      var uid;
      if (prefix == null) {
        prefix = 'c-';
      }
      uid = guid();
      return uid;
    };

    Model.exists = function(uid) {
      try {
        return this.find(uid);
      } catch (e) {
        return false;
      }
    };

    Model.find = function(uid) {
      var record;
      record = this.records[uid];
      if (!record) {
        throw new Error('Unknown record');
      }
      return record.clone();
    };

    Model.findBy = function(name, value) {
      var record, uid, _ref;
      _ref = this.records;
      for (uid in _ref) {
        record = _ref[uid];
        if (record[name] === value) {
          return record.clone();
        }
      }
      throw new Error('Unknown record');
    };

    Model.select = function(callback) {
      var record, result, uid;
      result = (function() {
        var _ref, _results;
        _ref = this.records;
        _results = [];
        for (uid in _ref) {
          record = _ref[uid];
          if (callback(record)) {
            _results.push(record);
          }
        }
        return _results;
      }).call(this);
      return this.cloneArray(result);
    };

    Model.each = function(callback) {
      var key, value, _ref, _results;
      _ref = this.records;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        _results.push(callback(value.clone()));
      }
      return _results;
    };

    Model.all = function() {
      return this.cloneArray(this.recordsValues());
    };

    Model.count = function() {
      return this.recordsValues().length;
    };

    Model.cloneArray = function(array) {
      var value, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        value = array[_i];
        _results.push(value.clone());
      }
      return _results;
    };

    Model.recordsValues = function() {
      var key, result, value, _ref;
      result = [];
      _ref = this.records;
      for (key in _ref) {
        value = _ref[key];
        result.push(value);
      }
      return result;
    };

    Model.destroyAll = function() {
      return this.records = {};
    };

    function Model(attributes) {
      Model.__super__.constructor.apply(this, arguments);
      this.className = this.constructor.name;
      if (attributes) {
        this.load(attributes);
      }
      this.uid = this.constructor.uid();
    }

    Model.prototype.isNew = function() {
      return !this.exists();
    };

    Model.prototype.exists = function() {
      return this.uid && this.uid in this.constructor.records;
    };

    Model.prototype.clone = function() {
      return createObject(this);
    };

    Model.prototype.load = function(attributes) {
      var key, value;
      for (key in attributes) {
        value = attributes[key];
        if (typeof this[key] === 'function') {
          this[key](value);
        } else {

        }
        this[key] = value;
      }
      return this;
    };

    Model.prototype.attributes = function() {
      var key, result, _i, _len, _ref;
      result = {};
      _ref = this.constructor.attributes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (key in this) {
          if (typeof this[key] === 'function') {
            result[key] = this[key]();
          } else {
            result[key] = this[key];
          }
        }
      }
      return result;
    };

    Model.prototype.equal = function(rec) {
      return !!(rec && rec.constructor === this.constructor && (rec.uid && rec.uid === this.uid));
    };

    Model.prototype.save = function() {
      var error, record;
      if (this.validate != null) {
        error = this.validate();
      }
      if (error) {
        this.trigger('error', error);
        return false;
      }
      this.trigger('beforeSave');
      record = this.isNew() ? this.create() : this.update();
      this.trigger('save');
      return record;
    };

    Model.prototype.updateAttributes = function(attributes) {
      this.load(attributes);
      return this.save();
    };

    Model.prototype.changeUID = function(uid) {
      var records;
      records = this.constructor.records;
      records[uid] = records[this.uid];
      delete records[this.uid];
      this.uid = uid;
      return this.save();
    };

    Model.prototype.create = function() {
      var record;
      this.trigger('beforeCreate');
      record = new this.constructor(this.attributes());
      record.uid = this.uid;
      this.constructor.records[this.uid] = record;
      this.trigger('create');
      this.trigger('change', 'create');
      return record.clone();
    };

    Model.prototype.update = function() {
      var records;
      this.trigger('beforeUpdate');
      records = this.constructor.records;
      records[this.uid].load(this.attributes());
      this.trigger('update');
      this.trigger('change', 'update');
      return records[this.uid].clone();
    };

    Model.prototype.destroy = function() {
      this.trigger('beforeDestroy');
      delete this.constructor.records[this.uid];
      this.trigger('destroy');
      this.trigger('change', 'destroy');
      this.unbind();
      return this;
    };

    Model.prototype.clone = function() {
      return Object.create(this);
    };

    Model.prototype.unbind = function() {
      return this.trigger('unbind');
    };

    Model.prototype.trigger = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      args.splice(1, 0, this);
      return (_ref = this.constructor).trigger.apply(_ref, args);
    };

    return Model;

  })(Monocle.Module);

  if (typeof Object.create !== 'function') {
    Object.create = function(o) {
      var Func;
      Func = function() {};
      Func.prototype = o;
      return new Func();
    };
  }

  guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : r & 3 | 8;
      return v.toString(16);
    }).toUpperCase();
  };

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Monocle.Controller = (function(_super) {

    __extends(Controller, _super);

    Controller.include(Monocle.Events);

    Controller.prototype.eventSplitter = /^(\S+)\s*(.*)$/;

    Controller.prototype.tag = 'div';

    /*
        Constructor of Monocle.Controller based on Monocle.Module
        @method constructor
        @param  {options} Create properties within the controller or an element selector if the type is string.
    */


    function Controller(options) {
      this.destroy = __bind(this.destroy, this);

      var key, value;
      if (typeof options === "string") {
        this.el = Monocle.Dom(options);
      } else {
        for (key in options) {
          value = options[key];
          this[key] = value;
        }
      }
      if (!this.el) {
        this.el = Monocle.Dom(document.createElement(this.tag));
      }
      if (!this.events) {
        this.events = this.constructor.events;
      }
      if (!this.elements) {
        this.elements = this.constructor.elements;
      }
      if (this.events) {
        this.delegateEvents();
      }
      if (this.elements) {
        this.refreshElements();
      }
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.delegateEvents = function() {
      var eventName, key, match, method, selector, _ref, _results;
      _ref = this.events;
      _results = [];
      for (key in _ref) {
        method = _ref[key];
        if (typeof method !== 'function') {
          method = this.proxy(this[method]);
        }
        match = key.match(this.eventSplitter);
        eventName = match[1];
        selector = match[2];
        if (selector === '') {
          _results.push(this.el.bind(eventName, method));
        } else {
          _results.push(this.el.delegate(selector, eventName, method));
        }
      }
      return _results;
    };

    Controller.prototype.refreshElements = function() {
      var key, value, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (key in _ref) {
        value = _ref[key];
        _results.push(this[value] = this.el.find(key));
      }
      return _results;
    };

    Controller.prototype.destroy = function() {
      this.trigger('release');
      this.el.remove();
      return this.unbind();
    };

    return Controller;

  })(Monocle.Module);

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Monocle.View = (function(_super) {

    __extends(View, _super);

    View.container = void 0;

    View.template_uri = void 0;

    View.template = void 0;

    View.model = void 0;

    function View(options) {
      View.__super__.constructor.apply(this, arguments);
      if (!this.template) {
        this.template = this.constructor.template;
      }
      if (!this.template) {
        this._loadTemplateFrom(this.template_url);
      }
      if (!this.container) {
        this.container = this.constructor.container;
      }
      this.container = Monocle.Dom(this.container);
      this.container.attr('data-monocle', this.constructor.name);
    }

    View.prototype.html = function() {
      var elements;
      elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._html.apply(this, ["html"].concat(__slice.call(elements)));
    };

    View.prototype.append = function() {
      var elements;
      elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._html.apply(this, ["append"].concat(__slice.call(elements)));
    };

    View.prototype.prepend = function() {
      var elements;
      elements = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._html.apply(this, ["prepend"].concat(__slice.call(elements)));
    };

    View.prototype.remove = function() {
      this.model.destroy();
      return this.el.remove();
    };

    View.prototype.replace = function(element) {
      var previous, _ref;
      _ref = [this.el, Monocle.Dom(element.el || element)], previous = _ref[0], this.el = _ref[1];
      previous.replaceWith(this.el[0]);
      this.delegateEvents(this.events);
      this.refreshElements();
      return this.el;
    };

    View.prototype.refresh = function() {
      var render;
      render = Monocle.templayed(this.template)(this.model);
      return this.replace(render);
    };

    View.prototype._html = function() {
      var element, elements, method, render;
      method = arguments[0], elements = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      elements = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = elements.length; _i < _len; _i++) {
          element = elements[_i];
          _results.push(element.el || element);
        }
        return _results;
      })();
      render = Monocle.templayed(this.template).apply(null, elements);
      this.replace(render);
      this.container[method](this.el[0]);
      return this;
    };

    View.prototype._loadTemplateFrom = function(url) {
      var className, loader, response;
      className = this.constructor.name;
      if (!Monocle.Templates[className]) {
        loader = typeof $$ !== "undefined" && $$ !== null ? $$ : $;
        response = loader.ajax({
          url: url,
          async: false,
          dataType: 'text',
          error: function() {
            return console.error(arguments);
          }
        });
        if (typeof $$ === "undefined" || $$ === null) {
          response = response.responseText;
        }
        Monocle.Templates[className] = response;
      }
      return this.template = Monocle.Templates[className];
    };

    return View;

  })(Monocle.Controller);

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {

  Monocle.templayed = function(template, data) {
    var block, get, inc, tag;
    get = function(path, i) {
      var index, js, keys;
      i = 1;
      path = path.replace(/\.\.\//g, function() {
        i++;
        return "";
      });
      js = ["data[data.length - ", i, "]"];
      keys = (path === "." ? [] : path.split("."));
      index = 0;
      while (index < keys.length) {
        js.push("." + keys[index]);
        index++;
      }
      return js.join("");
    };
    tag = function(template) {
      return template.replace(/\{\{(!|&|\{)?\s*(.*?)\s*}}+/g, function(match, operator, context) {
        var i;
        if (operator === "!") {
          return "";
        }
        i = inc++;
        return ["\"; var o", i, " = ", get(context), ", s", i, " = (((typeof(o", i, ") == \"function\" ? o", i, ".call(data[data.length - 1]) : o", i, ") || \"\") + \"\"); s += ", (operator ? "s" + i : "(/[&\"><]/.test(s" + i + ") ? s" + i + ".replace(/&/g,\"&amp;\").replace(/\"/g,\"&quot;\").replace(/>/g,\"&gt;\").replace(/</g,\"&lt;\") : s" + i + ")"), " + \""].join("");
      });
    };
    block = function(template) {
      return tag(template.replace(/\{\{(\^|#)(.*?)}}(.*?)\{\{\/\2}}/g, function(match, operator, key, context) {
        var i;
        i = inc++;
        return ["\"; var o", i, " = ", get(key), "; ", (operator === "^" ? ["if ((o", i, " instanceof Array) ? !o", i, ".length : !o", i, ") { s += \"", block(context), "\"; } "] : ["if (typeof(o", i, ") == \"boolean\" && o", i, ") { s += \"", block(context), "\"; } else if (o", i, ") { for (var i", i, " = 0; i", i, " < o", i, ".length; i", i, "++) { data.push(o", i, "[i", i, "]); s += \"", block(context), "\"; data.pop(); }}"]).join(""), "; s += \""].join("");
      }));
    };
    inc = 0;
    return new Function("data", "data = [data], s = \"" + block(template.replace(/"/g, "\\\"").replace(/\n/g, "\\n")) + "\"; return s;");
  };

}).call(this);
// Generated by CoffeeScript 1.4.0
(function() {
  var escapeRegExp, hashStrip, namedParam, splatParam,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Monocle.Route = (function(_super) {
    var _ref;

    __extends(Route, _super);

    Route.extend(Monocle.Events);

    Route.historySupport = ((_ref = window.history) != null ? _ref.pushState : void 0) != null;

    Route.routes = [];

    Route.options = {
      trigger: true,
      history: false
    };

    Route.listen = function(options) {
      if (options == null) {
        options = {};
      }
      this.options = this.extend(this.options, options);
      if (this.options.history) {
        this.history = this.historySupport && this.options.history;
      }
      Monocle.Dom(window).bind(this.getEventName(), this.change);
      return this.change();
    };

    Route.add = function(path, callback) {
      var key, value, _results;
      if (typeof path === 'object' && !(path instanceof RegExp)) {
        _results = [];
        for (key in path) {
          value = path[key];
          _results.push(this.add(key, value));
        }
        return _results;
      } else {
        return this.routes.push(new this(path, callback));
      }
    };

    Route.unbind = function() {
      return Monocle.Dom(window).unbind(this.getEventName(), this.change);
    };

    Route.navigate = function() {
      var args, last_argument, options, path;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      options = {};
      last_argument = args[args.length - 1];
      if (typeof last_argument === 'object') {
        options = args.pop();
      } else if (typeof last_argument === 'boolean') {
        options.trigger = args.pop();
      }
      options = this.extend(this.options, options);
      path = args.join('/');
      if (path !== this.path) {
        this.path = path;
        this.trigger('navigate', this.path);
        if (options.trigger) {
          this.matchRoute(this.path, options);
        }
        if (this.history) {
          history.pushState({}, document.title, this.path);
        } else {
          window.location.hash = this.path;
        }
      }
      return this;
    };

    Route.extend = function(object, properties) {
      var key, val;
      if (object == null) {
        object = {};
      }
      for (key in properties) {
        val = properties[key];
        object[key] = val;
      }
      return object;
    };

    Route.getEventName = function() {
      if (this.history) {
        return "popstate";
      } else {
        return "hashchange";
      }
    };

    Route.getPath = function() {
      var path;
      path = window.location.pathname;
      if (path.substr(0, 1) !== '/') {
        path = '/' + path;
      }
      return path;
    };

    Route.getFragment = function() {
      return this.getHash().replace(hashStrip, '');
    };

    Route.getHost = function() {
      return (document.location + '').replace(this.getPath() + this.getHash(), '');
    };

    Route.getHash = function() {
      return window.location.hash;
    };

    Route.change = function() {
      var path;
      path = this.history ? this.getPath() : this.getFragment();
      if (path !== this.path) {
        this.path = path;
        this.matchRoute(this.path);
      }
      return this;
    };

    Route.matchRoute = function(path, options) {
      var route, _i, _len, _ref1;
      _ref1 = this.routes;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        route = _ref1[_i];
        if (route.match(path, options)) {
          this.trigger('change', route, path);
          return route;
        }
      }
    };

    function Route(path, callback) {
      var match;
      this.path = path;
      this.callback = callback;
      this.names = [];
      if (typeof path === 'string') {
        namedParam.lastIndex = 0;
        while ((match = namedParam.exec(path)) !== null) {
          this.names.push(match[1]);
        }
        splatParam.lastIndex = 0;
        while ((match = splatParam.exec(path)) !== null) {
          this.names.push(match[1]);
        }
        path = path.replace(escapeRegExp, '\\$&').replace(namedParam, '([^\/]*)').replace(splatParam, '(.*?)');
        this.route = new RegExp('^' + path + '$');
      } else {
        this.route = path;
      }
    }

    Route.prototype.match = function(path, options) {
      var i, match, param, _i, _len, _ref1;
      if (options == null) {
        options = {};
      }
      match = this.route.exec(path);
      if (!match) {
        return false;
      }
      options.match = match;
      if (this.names.length) {
        _ref1 = match.slice(1);
        for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
          param = _ref1[i];
          options[this.names[i]] = param;
        }
      }
      return this.callback.call(null, options) !== false;
    };

    return Route;

  })(Monocle.Module);

  hashStrip = /^#*/;

  namedParam = /:([\w\d]+)/g;

  splatParam = /\*([\w\d]+)/g;

  escapeRegExp = /[-[\]{}()+?.,\\^$|#\s]/g;

  Monocle.Route.change = Monocle.Route.proxy(Monocle.Route.change);

  Monocle.Controller.include({
    route: function(path, callback) {
      return Monocle.Route.add(path, this.proxy(callback));
    },
    routes: function(routes) {
      var key, value, _results;
      _results = [];
      for (key in routes) {
        value = routes[key];
        _results.push(this.route(key, value));
      }
      return _results;
    },
    url: function() {
      return Monocle.Route.navigate.apply(Monocle.Route, arguments);
    }
  });

}).call(this);
