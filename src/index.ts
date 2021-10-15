((window: any) => {
  if (!window || "simpleConsole" in window) return;
  class SimpleConsole {
    private oldLog = console.log;
    private logDom: HTMLElement;
    private buttonDom: HTMLElement;
    private styleDom: HTMLElement;
    private logDomClassName = "simple-console-log-view";
    private buttonDomClassName = "simple-console-button";
    private logItemClassName = "simple-console-log-item";
    constructor() {
      this.logDom = document.createElement("div");
      this.buttonDom = document.createElement("div");
      this.styleDom = document.createElement("style");
      this.init();
    }
    init() {
      this.watchLog();
      this.initDom();
      this.bindEvent();
      // widthDragable(this.buttonDom)
      this.sayHi();
    }
    initDom() {
      // create style
      const styleDom = this.styleDom;
      styleDom.innerHTML = this.getSyle();
      styleDom.setAttribute("data-belong", "simple-console");

      // create log-view
      const logDom = this.logDom;
      logDom.classList.add(this.logDomClassName);
      logDom.innerText = "thanks for using simple console";

      // create button
      const buttonDom = this.buttonDom;
      buttonDom.classList.add(this.buttonDomClassName);
      buttonDom.innerText = "console";

      // add dom to document
      const fragement = document.createDocumentFragment();
      fragement.appendChild(styleDom);
      fragement.appendChild(logDom);
      fragement.appendChild(buttonDom);
      document.body.appendChild(fragement);
    }
    sayHi() {
      console.log("hi");
      for (let index = 0; index < 10; index++) {
        console.log(
          "thanks for using simple console,thanks for using simple console,thanks for using simple console,padding: 10px 10px 0 10px;box-sizing: border-box;"
        );
      }
    }
    watchLog() {
      const oldLog = console.log;
      console.log = (...args) => {
        oldLog(...args);
        this.onLog(args);
      };
    }
    onLog(args: string[]) {
      // 这里不能执行console.log
      const content = args.join(" ");
      // 记录日志
      this.createLogItem(content);
      // 滚动到底部
      this.scrollToBottom();
    }
    scrollToBottom() {
      const scrollTop = this.logDom.scrollTop;
      const clientHeight = this.logDom.clientHeight;
      const scrollHeight = this.logDom.scrollHeight;

      if (scrollTop + clientHeight !== scrollHeight) {
        this.logDom.scrollTop = scrollHeight - clientHeight;
      }
    }
    bindEvent() {
      this.buttonDom.addEventListener("click", () => {
        this.logDom.style.display =
          this.logDom.style.display !== "none" ? "none" : "block";
      });
    }
    createLogItem(content: string) {
      const logItem = document.createElement("div");
      logItem.classList.add(this.logItemClassName);
      logItem.innerText = content;
      this.logDom.appendChild(logItem);
    }
    getSyle() {
      return `
        .${this.buttonDomClassName} {
            position: fixed;
            right: 10px;
            bottom: 10px;
            z-index: 9;
            display: block;
            height: 22px;
            padding: 3px 6px;
            background-color: #18d877;
            color: #fff;
            font-size: 16px;
            line-height: 22px;
            border-radius: 6px;
        }
        .${this.buttonDomClassName}:hover {
            background-color: #1ce47f;
        }
        .${this.logDomClassName} {
            display: block;
            width: 100vw;
            height: 65vh;
            position: fixed;
            left: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, .8);
            font-size: 12px;
            color: springgreen;
            overflow: scroll;
            z-index: 8;
        }
        .${this.logItemClassName} {
            width: 100%;
            padding: 0px 10px;
            box-sizing: border-box;
            border-bottom: 1px solid #989898;
        }
        `;
    }
  }
  function widthDragable(dom: HTMLElement) {
    dom.draggable = true;

    dom.ondragend = function (e) {
      e.preventDefault();
      // offsetX: 31
      // offsetY: -11
      console.log(e);
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      console.log(dom.style.bottom, e.target);
      // dom.style.bottom = -e.offsetY  + 'px';
      // dom.style.right = -e.offsetX  + 'px';
      return false;
    };
  }
  window.simpleConsole = new SimpleConsole();
  const simpleConsole = document.createElement("div", {});
})(this);
