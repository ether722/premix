
import { cloneElement } from 'react';

interface Dynamic {
    initialClassName: any
    children: any
}

export default ({ initialClassName, children }: Dynamic) => {
    const [className, setClassName] = useState(initialClassName);

    const toggleClassName = () => {
        // 点击元素时切换className
        if (className === initialClassName) {
            setClassName(`${initialClassName} active`);
        } else {
            setClassName(initialClassName);
        }
    };

    // 使用 cloneElement 克隆并修改传入的元素的 className
    const clonedElement = cloneElement(children, {
        className,
        onClick: toggleClassName
    });

    useEffect(()=>{
        setClassName(initialClassName)
    }, [initialClassName])

    return clonedElement;
}
