class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ids : [{id:0, val:0, r1:true, r2:true}, {id:1, val:0, r1:true, r2:true}, {id:2, val:0, r1:true, r2:true},
                 {id:3, val:0, r1:true, r2:true}, {id:4, val:0, r1:true, r2:true}, {id:5, val:0, r1:true, r2:true},
                  {id:6, val:0, r1:true, r2:true}, {id:7, val:0, r1:true, r2:true}, {id:8, val:0, r1:true, r2:true}],
            combs: [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [6,7,8], [2,4,6], [3,4,5], [2,4,6], [0,1,2], [1,4,7]],
            counter: 0,
            winner:0,
            stage:0,
            human:0,
            bot:0,
        }
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this.nextStage = this.nextStage.bind(this);
        this.endGame = this.endGame.bind(this);
    }
    mouseDown(e){
        if(this.state.winner!=0){
            return;
        }
        let tmp = this.state.ids.slice(0);
        if(tmp[e.target.id]["r1"]==true ){
            tmp[e.target.id]["val"] = 1;
            tmp[e.target.id]["r1"] = false;
            this.setState({
                ids:tmp,
                counter: this.state.counter+1
            })
            this.checking();
        }
    }
    mouseUp(e){
        if(this.state.winner!=0){
            return;
        }
        this.bot(e);
    }
    bot(e){
        let count = this.state.counter;
        let chek = this.state.ids.slice(0);
        let wins = this.state.combs;
        let attent = false;
        let chanse = false;
        if(chek[e.target.id]["r2"]==true ){
            chek[e.target.id]["r2"]=false; 
            function botLoose(){
                for(let i=0;i<chek.length;i++){
                    if(chek[wins[i][0]]["val"] == chek[wins[i][1]]["val"] && (chek[wins[i][0]]["val"]==1 && chek[wins[i][1]]["val"]==1 && chek[wins[i][2]]["val"]!=2)){
                        attent = chek[wins[i][2]];
                        break;
                    }if(chek[wins[i][0]]["val"] == chek[wins[i][2]]["val"] && (chek[wins[i][0]]["val"]==1 && chek[wins[i][2]]["val"]==1 && chek[wins[i][1]]["val"]!=2)){
                        attent = chek[wins[i][1]];
                        break ;
                    }if(chek[wins[i][1]]["val"] == chek[wins[i][2]]["val"] && (chek[wins[i][1]]["val"]==1 && chek[wins[i][2]]["val"]==1 && chek[wins[i][0]]["val"]!=2)){
                        attent = chek[wins[i][0]];
                        break;
                    }else{
                        attent = false;
                    }
                }
            }
            function botWin(){
                for(let i=0;i<chek.length;i++){
                    if(chek[wins[i][0]]["val"] == chek[wins[i][1]]["val"] && (chek[wins[i][0]]["val"]==2 && chek[wins[i][1]]["val"]==2 && chek[wins[i][2]]["val"]!=1)){
                        chanse = chek[wins[i][2]];
                        break;
                    }if(chek[wins[i][0]]["val"] == chek[wins[i][2]]["val"] && (chek[wins[i][0]]["val"]==2 && chek[wins[i][2]]["val"]==2 && chek[wins[i][1]]["val"]!=1)){
                        chanse = chek[wins[i][1]];
                        break;
                    }if(chek[wins[i][1]]["val"] == chek[wins[i][2]]["val"] && (chek[wins[i][1]]["val"]==2 && chek[wins[i][2]]["val"]==2 && chek[wins[i][0]]["val"]!=1)){
                        chanse = chek[wins[i][0]];
                        break;
                    }else{
                        chanse = false;
                    }
                }
            }
            if(count==1 && chek[4]["val"]!=1){
                chek[4]["val"]=2;
                chek[4]["r2"]=false;
                chek[4]["r1"]=false;
                this.setState({ids:chek, counter: this.state.counter+1});
                return;
            }if(count==1 &&  chek[4]["val"]==1){
                for(let i=0;i<40;i++){
                    let j=Math.floor(Math.random() * chek.length);
                    if(chek[j]["val"]==0){
                        chek[j]["val"]=2;
                        chek[j]["r1"]=false;
                        this.setState({ids:chek, counter: this.state.counter+1});
                        return;
                    }
                }
            }if(count>2){
                botWin();
                botLoose();
                if(chanse){
                    chek.map(ch=>{
                        if(ch["id"]==[chanse["id"]]){
                            ch["val"]=2;
                            ch["r2"]=false;
                            ch["r1"]=false;
                            this.setState({ids:chek, counter: this.state.counter+1});
                            this.checking();
                            return;
                        }
                    })
                }else{
                    if(!attent){
                        for(let i=0;i<40;i++){
                            let j=Math.floor(Math.random() * chek.length);
                            if(chek[j]["val"]==0){
                                chek[j]["val"]=2;
                                chek[j]["r2"]=false;
                                chek[j]["r1"]=false;
                                this.setState({ids:chek, counter: this.state.counter+1});
                                this.checking();
                                return;
                            }
                        }
                    }
                    if(attent){
                        chek.map(ch=>{
                            if(ch["id"]==[attent["id"]]&&ch["val"]!=1){
                                ch["val"]=2;
                                ch["r2"]=false;
                                ch["r1"]=false;
                                this.setState({ids:chek, counter: this.state.counter+1});
                                this.checking();
                                return;
                            }
                        })
                    }else{
                        this.checking();
                    }
                }
            }
        }
    }

    checking(){
        let chek = this.state.ids.slice(0);
        let wins = this.state.combs;
        let winner = 0;
        for(let i=0;i<chek.length;i++){
            if(chek[wins[i][0]]["val"] == chek[wins[i][1]]["val"] && 
                chek[wins[i][1]]["val"] == chek[wins[i][2]]["val"] && 
                chek[wins[i][0]]["val"] !=0){
                    (this.state.counter%2==0? winner=1 : winner=2);
                    break
            }
        }
        if(winner==1){
            console.log("Поздравляю, мешок с костями!!!");
            this.setState({winner:1, stage:2, human:this.state.human+1})
            return;
        }if(winner==2){
            console.log("В превосходстве машин не было сомнений!!!");
            this.setState({winner:2, stage:2, bot:this.state.bot+1})
            return;
        }if(winner==0 && this.state.counter == 9){
            console.log("Тебе повезло, кожаный мешок, сегодня ничья!!!")
            this.setState({winner:3, stage:2})
            return;
        }
    }
    nextStage(){
        this.setState({
            stage:this.state.stage+1
        })
        console.log(this.state.stage)
    }
    endGame(e){
        let check = this.state.ids.slice(0);
        check.map(ch =>{
            ch["val"]=0;
            ch["r2"]=true;
            ch["r1"]=true;
        })
        this.setState({
            stage:+e.target.id,
            ids: check,
            winner: 0,
            counter: 0
        })
        if(+e.target.id==0){
            this.setState({
                human:0,
                bot:0,
            })
        }
    }
    componentDidUpdate(){
        if(this.state.stage==2){
        this.setState({stage:3});
        }
    }
    render(){
        let tiles = this.state.ids.map(tile =>
            <Tile key={tile.id}
                  val={tile.val}
                  id={tile.id}
                  mouseDown={this.mouseDown}
                  mouseUp={this.mouseUp}/>
            )
        if(this.state.stage == 0){
            return <div className="prev">
                <button onClick={this.nextStage}>GO</button>
            </div>
        }if(this.state.stage == 1 || this.state.stage == 2){
            return <div>
            <div className="game-header"> 
                <h3>Tick-Tack-Toe</h3>       
            </div>
            <div className="game-content">
                <div className="x-o">
                {tiles}
                </div>
            </div>
            <div className="game-footer">
                <button id="0" onClick={this.endGame}>Exit</button>
            </div>
            </div>
        }if(this.state.stage == 3){
            return <div>
            <div className="game-header">
                <h3>Tick-Tack-Toe</h3>      
            </div>
            <div className="game-content">
                <Whowin winner={this.state.winner}
                        human={this.state.human}
                        bot={this.state.bot}
                        endGame={this.endGame}/> 
                <div className="x-o">
                {tiles}
                </div>
            </div>
            <div className="game-footer">
            </div>
            </div>
        }
    }
}

