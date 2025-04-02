
export default (props: any) => {
    const { className, state, children } = props
    const [cName, setCName] = useState(getBeforeLastSpace(className))

    useEffect(() => {
        setCName(getBeforeLastSpace(className) + (state ? ` ${getAfterLastSpace(className)}` : ''))
    }, [state]);

    return (
        <ActiveToggle initialClassName={cName}>{children}</ActiveToggle>
    )
}

// 获取最后一个空格后面所有的字符
function getAfterLastSpace(str: string) {
    const lastSpaceIndex = str.lastIndexOf(' ');
    return str.substring(lastSpaceIndex + 1);
}

function getBeforeLastSpace(str: string) {
    return str?.split(` ${getAfterLastSpace(str)}`)[0]
}
