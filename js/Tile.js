class Tile extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        if(this.props.val == 1){
            return <div onMouseDown={this.props.mouseDown} onMouseUp={this.props.mouseUp} id={this.props.id}>&#10060;</div>   
        }
        if(this.props.val == 2){
            return <div onMouseDown={this.props.mouseDown} onMouseUp={this.props.mouseUp} id={this.props.id}>&#9898;</div>   
        }
        if(this.props.val == 0){
            return <div onMouseDown={this.props.mouseDown} onMouseUp={this.props.mouseUp} id={this.props.id}></div>   
        }       
    }
}