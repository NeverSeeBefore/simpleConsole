"use strict";
(function (window) {
    if (!window || "simpleConsole" in window)
        return;
    var SimpleConsole = (function () {
        function SimpleConsole() {
            this.oldLog = console.log;
            this.logDomClassName = "simple-console-log-view";
            this.buttonDomClassName = "simple-console-button";
            this.logItemClassName = "simple-console-log-item";
            this.logDom = document.createElement("div");
            this.buttonDom = document.createElement("div");
            this.styleDom = document.createElement("style");
            this.init();
        }
        SimpleConsole.prototype.init = function () {
            this.watchLog();
            this.initDom();
            this.bindEvent();
            this.sayHi();
        };
        SimpleConsole.prototype.initDom = function () {
            var styleDom = this.styleDom;
            styleDom.innerHTML = this.getSyle();
            styleDom.setAttribute("data-belong", "simple-console");
            var logDom = this.logDom;
            logDom.classList.add(this.logDomClassName);
            logDom.innerText = "thanks for using simple console";
            var buttonDom = this.buttonDom;
            buttonDom.classList.add(this.buttonDomClassName);
            buttonDom.innerText = "console";
            var fragement = document.createDocumentFragment();
            fragement.appendChild(styleDom);
            fragement.appendChild(logDom);
            fragement.appendChild(buttonDom);
            document.body.appendChild(fragement);
        };
        SimpleConsole.prototype.sayHi = function () {
            console.log("hi");
            for (var index = 0; index < 10; index++) {
                console.log("thanks for using simple console,thanks for using simple console,thanks for using simple console,padding: 10px 10px 0 10px;box-sizing: border-box;");
            }
        };
        SimpleConsole.prototype.watchLog = function () {
            var _this = this;
            var oldLog = console.log;
            console.log = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                oldLog.apply(void 0, args);
                _this.onLog(args);
            };
        };
        SimpleConsole.prototype.onLog = function (args) {
            var content = args.join(" ");
            this.createLogItem(content);
            this.scrollToBottom();
        };
        SimpleConsole.prototype.scrollToBottom = function () {
            var scrollTop = this.logDom.scrollTop;
            var clientHeight = this.logDom.clientHeight;
            var scrollHeight = this.logDom.scrollHeight;
            if (scrollTop + clientHeight !== scrollHeight) {
                this.logDom.scrollTop = scrollHeight - clientHeight;
            }
        };
        SimpleConsole.prototype.bindEvent = function () {
            var _this = this;
            this.buttonDom.addEventListener("click", function () {
                _this.logDom.style.display =
                    _this.logDom.style.display !== "none" ? "none" : "block";
            });
        };
        SimpleConsole.prototype.createLogItem = function (content) {
            var logItem = document.createElement("div");
            logItem.classList.add(this.logItemClassName);
            logItem.innerText = content;
            this.logDom.appendChild(logItem);
        };
        SimpleConsole.prototype.getSyle = function () {
            return "\n        ." + this.buttonDomClassName + " {\n            position: fixed;\n            right: 10px;\n            bottom: 10px;\n            z-index: 9;\n            display: block;\n            height: 22px;\n            padding: 3px 6px;\n            background-color: #18d877;\n            color: #fff;\n            font-size: 16px;\n            line-height: 22px;\n            border-radius: 6px;\n        }\n        ." + this.buttonDomClassName + ":hover {\n            background-color: #1ce47f;\n        }\n        ." + this.logDomClassName + " {\n            display: block;\n            width: 100vw;\n            height: 65vh;\n            position: fixed;\n            left: 0;\n            bottom: 0;\n            background-color: rgba(0, 0, 0, .8);\n            font-size: 12px;\n            color: springgreen;\n            overflow: scroll;\n            z-index: 8;\n        }\n        ." + this.logItemClassName + " {\n            width: 100%;\n            padding: 0px 10px;\n            box-sizing: border-box;\n            border-bottom: 1px solid #989898;\n        }\n        ";
        };
        return SimpleConsole;
    }());
    function widthDragable(dom) {
        dom.draggable = true;
        dom.ondragend = function (e) {
            e.preventDefault();
            console.log(e);
            var offsetX = e.offsetX;
            var offsetY = e.offsetY;
            console.log(dom.style.bottom, e.target);
            return false;
        };
    }
    window.simpleConsole = new SimpleConsole();
    var simpleConsole = document.createElement("div", {});
})(this);
//# sourceMappingURL=index.js.map