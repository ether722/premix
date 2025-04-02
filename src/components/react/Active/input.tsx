

// 根据接口内容自动填入


/**
* 文本框根据输入内容自适应高度
* @param {HTMLElement} 输入框元素
* @param {Number} 设置光标与输入框保持的距离(默认0)
* @param {Number} 设置最大高度(可选)
*/
const autoTextarea = function (elem: any, extra: any, maxHeight: any) {
  extra = extra || 0;
  const isFirefox = !!(document as any).getBoxObjectFor || 'mozInnerScreenX' in window
  const isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera')
  const addEvent = function (type: string, callback: Function) {
    elem.addEventListener ?
      elem.addEventListener(type, callback, false) :
      elem.attachEvent('on' + type, callback);
  }
  const getStyle: any = elem.currentStyle ? function (name: any) {
    const val = elem.currentStyle[name];
    if (name === 'height' && val.search(/px/i) !== 1) {
      const rect = elem.getBoundingClientRect();
      return rect.bottom - rect.top -
        parseFloat(getStyle('paddingTop')) -
        parseFloat(getStyle('paddingBottom')) + 'px';
    };
    return val;
  } : function (name: any) {
    return getComputedStyle(elem, null)[name];
  },
    minHeight = parseFloat(getStyle('height'));
  elem.style.resize = 'none';
  const change = function () {
    let scrollTop, height,
      padding = 0,
      style = elem.style;
    if (elem._length === elem.value.length) return;
    elem._length = elem.value.length;
    if (!isFirefox && !isOpera) {
      // padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
    };
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    elem.style.height = minHeight + 'px';
    if (elem.scrollHeight > minHeight) {
      if (maxHeight && elem.scrollHeight > maxHeight) {
        height = maxHeight - padding;
        style.overflowY = 'auto';
      } else {
        height = elem.scrollHeight - padding;
        style.overflowY = 'hidden';
      };
      style.height = height + extra + 'px';
      scrollTop += parseInt(style.height) - elem.currHeight;
      document.body.scrollTop = scrollTop;
      document.documentElement.scrollTop = scrollTop;
      elem.currHeight = parseInt(style.height);
    };
  };

  addEvent('propertychange', change);
  addEvent('input', change);
  // addEvent('focus', change);
  change();
};


export default (props: any) => {
  const { blur = () => { }, input = () => { }, id, rows, ...attr } = props

  const textareaRef = useRef(null);

  const { str, setString } = useString()
  const { bool, setBool } = useBool()

  const [msg, setMsg] = useState('')
  madebee.SetterController({ "textarea": setMsg })

  useEffect(() => {
    setString('msg', msg)
    setString('rows', rows)
    setString('html', textareaRef.current!?.['value'])

    if (bool.needClear) setMsg('')

    function handleInput() {
      // 在这里处理输入事件
      console.log('输入事件触发');
      input()
      autoTextarea(textareaRef.current!, 0, 500);
    }

    function handleBlur() {
      // 在这里处理失去焦点事件，即用户点击完成按钮
      console.log('完成事件触发');
      blur()
    }

    const inputElement = document.getElementById(id);
    if (id) {
      inputElement?.addEventListener('input', madebee.throttle(handleInput, 300));
      inputElement?.addEventListener('blur', madebee.throttle(handleBlur, 300));
    } else {
      throw new Error("id is not defined")
    }
  }, [msg, rows])

  useEffect(() => {
    const userInput = localStorage.getItem("RJ_USERINPUT") || ""
    localStorage.setItem("RJ_USERINPUT", userInput)
    setString('html', userInput)
  }, [])

  useEffect(() => {
    // console.log("input change");
    // if(msg) {
    //   $("#ipt").css({ animation: "huxi .5s ease-in-out" })
    //   setTimeout(() => {
    //     $("#ipt").css({ animation: "" })
    //   }, 500)
    // }
  }, [msg])

  return (
    <textarea ref={textareaRef} {...attr}
      value={msg}
      id={id}
      autoFocus={true}
      autoheight="true"
      rows={rows || "1"}
      onChange={(e: any) => setMsg(e.target.value)}
      maxLength={2000}
      resize="none"
    ></textarea>
  )
}
