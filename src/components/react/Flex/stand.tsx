
export default class FlexStand extends React.Component {
    componentDidMount() {
        const dom = ReactDOM.findDOMNode(this)
        console.log('this style:', dom.style)
        console.log(ReactDOM.findDOMNode(this))
    }
    render() {
        console.log(document.documentElement.getBoundingClientRect())
        return (
            <div className='flex-stand' ref='father'>
                <h1>解决客户问题，提升客户满意度</h1>
                <div className='flex-stand-son'>
                    <img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1724790606,578065933&fm=26&gp=0.jpg' />
                    <span>解决客户问题</span>
                    <p>提升客户满意度</p>
                </div>
                <div className='flex-stand-son'>
                    <img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1724790606,578065933&fm=26&gp=0.jpg' />
                    <span>解决客户问题</span>
                    <p>提升客户满意度</p>
                </div>
                <div className='flex-stand-son'>
                    <img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1724790606,578065933&fm=26&gp=0.jpg' />
                    <span>解决客户问题</span>
                    <p>提升客户满意度</p>
                </div>
                <div className='flex-stand-son'>
                    <img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1724790606,578065933&fm=26&gp=0.jpg' />
                    <span>解决客户问题</span>
                    <p>提升客户满意度</p>
                </div>
            </div>
        );
    }
}