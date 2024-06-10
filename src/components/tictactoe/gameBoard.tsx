import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square = (props: SquareProps) =>{
    console.log(props)
  return (
    <button className={`square glowing-text ${props.value==='X'? 'text-red': (props.value==='O' ?'text-black':null)} `}onClick={props.onClick}>
      {props.value}
    </button>
  );
}

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

interface GameState {
  history: { squares: (string | null)[] }[];
  stepNumber: number;
  xIsNext: boolean;
}

interface GameBoardProps {
    user1: string;
    user2: string;
    onSateChange: (data) => void;
  }

class GameBoard extends React.Component<GameBoardProps, GameState> {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i: number) {
    const { user1, user2 } = this.props;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  handleStateChange = (updatedState: any) => {
    this.props.onSateChange(updatedState); // Call the onStateChange prop with the updated state
  };

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const { user1, user2 } = this.props;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button className="moveButton" onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `winner-${winner ==='X'?user1:user2}`;
    } else {
      status = this.state.xIsNext ? user1 : user2;
    }
    this.handleStateChange(status)

    return (
      <div className="game">
        <div className="game-info">
            <ol><h4>Moves</h4></ol>
          <ol>{moves}</ol>
        </div>
        <div className="game-board">
          <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
        </div>
        <div></div>
        
      </div>
    );
  }
}



 const calculateWinner=(squares: (string | null)[])=> {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default GameBoard;