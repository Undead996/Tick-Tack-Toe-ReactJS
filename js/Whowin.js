class Whowin extends React.Component{
    constructor(props){
        super(props);
        this.state={
            winner:this.props.winner,
            human:0,
            bot:0,
        }
    }
    render(){
        let h = this.props.human;
        let b = this.props.bot;
        let w = this.props.winner;
        if(w==1){
            return <div className="winner">
                <h3>You Win</h3>
                <p>Total Score</p>
                <div>
                    <span>You: {h}</span>
                    <span>Bot: {b}</span>
                </div>
                <button id="1" onClick={this.props.endGame}>Again</button>
                <button id="0" onClick={this.props.endGame}>Exit</button>
            </div>
        }if(w==2){
            return <div className="winner">
                <h3>You Loose</h3>
                <h3>Total Score</h3>
                <div>
                    <span>You: {h}</span>
                    <span>Bot: {b}</span>
                </div>
                <button id="1" onClick={this.props.endGame}>Again</button>
                <button id="0" onClick={this.props.endGame}>Exit</button>
            </div>
        }if(w==3){
            return <div className="winner">
                <h3>No Winner</h3>
                <p>Total Score</p>
                <div>
                    <span>You: {h}</span>
                    <span>Bot: {b}</span>
                </div>
                <button id="1" onClick={this.props.endGame}>Again</button>
                <button id="0" onClick={this.props.endGame}>Exit</button>
            </div>
        }
    }
}