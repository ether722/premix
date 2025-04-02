
class List {
    tag="span";
    hasChild;
    child;

    constructor(list) {
        if(list.hasOwnProperty("tag")) {
            this.hasChild = list.hasOwnProperty("child");
            this.child = list.child;
            this.tag=list.tag;
        }

        return List.tags('h1',list.content)
    }

    static tags(tag, content){
        return React.createElement(tag,{
            onClick: () => {
                if(this.hasChild&&this.child!==''){
                    console.log(666)
                }
            },
        },content)
    }
}
