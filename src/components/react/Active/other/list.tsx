
import ActiveOther from '.';

interface OtherList {
    children: any[]
    state: boolean
    className: string
}

export default (props: OtherList) => {
    const [state, setState] = useState(props.state);

    useEffect(() => {
        setState(props.state);
    }, [props.state]);

    return (
        <>
            {props.children?.map((item: any, index: number) => <ActiveOther key={index} className={props.className} state={state}>{item}</ActiveOther>)}
        </>
    )
}
