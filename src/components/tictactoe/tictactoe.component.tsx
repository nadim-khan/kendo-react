import React, { useState } from 'react'

import './tictactoe.component.scss';
import ReusableTable from '../../reusable/reusable-table/reusable-table.component';
import GameBoard from './gameBoard';

interface GameState {
    history: { squares: (string | null)[] }[];
    stepNumber: number;
    xIsNext: boolean;
  }

const TicTacToeComponent = () => {
    const [userName1, setUser1] = useState('');
    const [userName2, setUser2] = useState('');
    const [playerType, setPlayerType] = useState('computer');
    const [isGame, setIsGameOn] = useState<boolean>(false);
    const [isActiveUser,setActiveUser]=useState('');

    let scoreArrayDef = new Array(1).fill({data:'In Progress',user:''});
    const [scoreArray,setScoreArray]=useState(scoreArrayDef)

    const playerList = [
        { name: 'Play with Computer', value: 'computer' },
        { name: 'Play with another player', value: 'player' },
    ]
    const columnsData = [
        { header: 'User1', accessor: 'data' },
        { header: 'User2', accessor: 'data' },
    ];

    const [columns,setColumn]=useState(columnsData);

    const setName1 = (v1) => {
        setUser1(v1)
    }

    const setName2 = (v2) => {
        setUser2(v2)
    }

    const updatedState = (data)=>{
        debugger
        console.log('Updated State Data',data)
        if(data.includes('winner')){
            scoreArray[0].data=data.split('-')[1];
            scoreArray.push({data:'In Progress',user:''})
            setScoreArray(scoreArray)

        }else{
            setActiveUser(data)
        }
    }

    const playerTypeSelect=(type)=>{
        setPlayerType(type);
        if(playerType==='computer'){
            setName2('Computer');
            columnsData[1].header = 'Computer' ;
        }
    }

    const proceed = ()=>{

        if((playerType==='computer' && userName1==='' )|| (playerType==='player' && userName1 ==='' && userName2 ==='')){
            setIsGameOn(false);
        }
        else if((playerType==='computer' && userName1!=='')||(playerType==='player' && userName1 !=='' && userName2 !=='')){
            if(playerType==='computer'){
                setName2('Computer');
                columnsData[1].header = 'Computer' ;
            }

            setIsGameOn(true);
            columnsData[0].header = userName1;
            columnsData[1].header = playerType==='computer'?'Computer' : userName2;
            setColumn(columnsData);
            setActiveUser(userName1)
        }
        
    }

    

    return (
        <div className='mainTicTacView'>
            <div className='heading'>
                <h2>Tic Tac Toe</h2>
            </div>
            <div>
            {!isGame && <form className="ticTacForm">
            <select onChange={(e) => { playerTypeSelect(e.target.value) }}>
                {playerList.map((player,index) => (
                 <option className={`curp `} key={`li-${player.value}-${index}`}  value={player.value}>{player.name}</option>
                ))}
                </select>
                
                <input
                    type="text"
                    placeholder={`${playerType==='player' ? 'First User':'User Name' }`}
                    value={userName1}
                    onChange={(e) => setName1(e.target.value)}
                />
                <br />
                {playerType==='player' &&<input
                    type="text"
                    placeholder='Second User'
                    value={userName2}
                    onChange={(e) => setName2(e.target.value)}
                />}
                <button onClick={proceed}>Proceed</button>
                
                
            </form>
            }
            {isGame && <div className='d-flex mainGame'>
                    <div className='gameView'> 
                    <GameBoard user1={userName1} user2={userName2} onSateChange={updatedState}/>
                    </div>
                    <div className='pontsTableView'>
                        <h4 className='heading'>SCORE BOARD</h4>
                        <p className={`${isActiveUser===userName1 ? 'isActive' : ''}`}> User 1 : {userName1.toUpperCase()}</p>
                        <p className={`${isActiveUser===userName2 ? 'isActive' : ''}`}> User 2 : {userName2.toUpperCase()}</p>
                        <div>
                            <h5 className='heading'>{userName1} <span style={{ color: 'red' , margin:'0 10px'}}>VS</span> {userName2}</h5>
                                 <ReusableTable 
                                 data={scoreArray} 
                                 columns={columns} 
                                 isShowRowNumber={true} 
                                 />
                        </div>
                    </div>
                    
                </div>
            }
            </div>
            
        </div>
    )
}

export default TicTacToeComponent

