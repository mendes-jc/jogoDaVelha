import React, { useState, useEffect} from 'react';

import { LevelButton, Container, GameBlock, Column, Score, Main, Row, PlayerName, NameEdit, Confirm} from './styles';

export default function Game() {
    // State
    const [actualLevel, setLevel] = useState(3);
    const [playerTurn, setTurn] = useState(0);
    const [changingName, setChangingName] = useState(false);
    const [levels, setLevels] = useState([
        {
            difficulty: 3,
            title: 'Tradicional'
        },
        {
            difficulty: 5,
            title: 'Médio'
        },
        {
            difficulty: 7,
            title: 'Difícil'
        },
        {  
            title: 'HARDCORE',
            difficulty: 20,
        }
    ])
    const [gameMatrix, setGameMatrix] = useState([]);
    const [players, setPlayers] = useState(
        [
            {
                name: 'Jogador 1',
                symbol: 'x',
                score: 0,
                color: "#3598db"
            },
            {
                name: 'Jogador 2',
                symbol: 'o',
                score: 0,
                color: "#1bbc9b"
            }
        ]
    );

    // Life Cycle
    useEffect(() => {
        let matrix = [];
        for(var i = 0; i < actualLevel; i++){
            var gameRow = [];
            for(var j = 0; j < actualLevel; j++){
                gameRow.push({
                    owner: null,
                    x: i,
                    y: j,
                })
            }
            matrix.push(gameRow);
        }
        setGameMatrix(matrix);
    }, [actualLevel])

    // Functions
    function handleClick(x, y){
        if (gameMatrix[x][y].owner !== null) return;
        let newMatrix = [ ...gameMatrix];
        newMatrix[x][y].owner = playerTurn;
        setGameMatrix(newMatrix);
        validGame(x, y);
        nextTurn();
    }

    // Próximo turno
    function nextTurn(){
        setTurn(prevTurn => prevTurn === 0 ? 1 : 0);
    }

    // Verifica se já temos um vencedor  
    function validGame(x, y){
        //Validação no eixo X
        if (validaX(x, y) || validaY(x, y) || validaDiagonal(x, y)){
            players[playerTurn].score ++;
            alert(`${players[playerTurn].name} venceu!`);
            cleanMatrix();
        }
        //Validação no eixo Y
    }

    function validaX(x, y){
        for(let i = 0; i < actualLevel; i++){
            if(gameMatrix[x][i].owner !== playerTurn){
                return false;
            }
        }
        return true;
    }

    function validaY(x, y){
        for(let i = 0; i < actualLevel; i++){
            if(gameMatrix[i][y].owner !== playerTurn){
                return false;
            }
        }
        return true;
    }

    function validaDiagonal(x, y){
        // Só sera validado se clicado em uma diagonal
        let failed = false;
        if(x === y || x === actualLevel - 1 - y){
            for(let i = 0, j = 0; i < actualLevel; i++, j++){
                if(gameMatrix[i][j].owner !== playerTurn){
                    //Caso um bloco não passe no teste
                    failed = true;
                    break
                }
            }
            // Se passar na primeira diagonal, já retorna true
            if(!failed) return true;
            //Reseta a variável de controle
            failed = false;
            for(let i = 0, j = actualLevel-1; i < actualLevel; i++, j--){
                if(gameMatrix[i][j].owner !== playerTurn){
                    //Se já tiver falhado na primeira diagonal, já sai da função
                    failed = true;
                    break;
                }
            }
            if(!failed) return true;
        }
        return false;
    }

    function cleanMatrix(){
        let matrix = [];
        for(var i = 0; i < actualLevel; i++){
            var gameRow = [];
            for(var j = 0; j < actualLevel; j++){
                gameRow.push({
                    owner: null,
                    x: i,
                    y: j,
                })
            }
            matrix.push(gameRow);
        }
        setGameMatrix(matrix);
    }
    
    function resetGame(){
        setPlayers(players => players.map(player => ({...player, score: 0})));
        cleanMatrix();
    }

    function toggleNameChange(){
        setChangingName(changing => !changing);   
    }

    function handleName(e){
        const newName = e.target.value;
        let newPlayers = [...players];
        newPlayers[playerTurn].name = newName;
        setPlayers(newPlayers);
    }

    return (
        <Main>
            <Container>
                <Row>
                    {levels.map(level => 
                        <LevelButton 
                            onClick={() => setLevel(level.difficulty)} 
                            selected={level.difficulty === actualLevel}
                        >
                            {level.title}
                        </LevelButton>
                    )}
                </Row>
            </Container>

            <Container>
                <Row>
                    {
                        changingName ?
                            <>
                                <NameEdit 
                                    value={players[playerTurn].name} 
                                    readOnly={false}
                                    onChange={handleName}
                                />
                                <Confirm onClick={toggleNameChange}>Ok</Confirm>
                           </>
                        :
                            <PlayerName
                                onClick={toggleNameChange}>
                                {players[playerTurn].name}
                            </PlayerName>
                    }
                    
                </Row>
                <Row>
                    {gameMatrix.map(row => (
                        <Column>
                            {row.map(item => (
                                <GameBlock 
                                    pressed={item.owner != null}
                                    onClick={() => handleClick(item.x, item.y)}
                                    /**
                                     Caso algum player tenha selecionado esse bloco, este será 
                                    colorido com sua devida cor */ 
                                    color={item.owner !== null&& players[item.owner].color}
                                >   
                                        {item.owner !== null && players[item.owner].symbol}
                                </GameBlock>
                            ))}
                        </Column>
                    ))}
                </Row>
            </Container>
            
            <Container>
                <Row>
                    {players.map(player => 
                        <Score color={player.color} >{`${player.score} pontos`}</Score>
                    )}
                </Row>
                <Row>
                    <LevelButton 
                        selected
                        onClick={resetGame}
                    >
                        Reiniciar
                    </LevelButton>
                </Row>
            </Container>
        </Main>
    );
}
