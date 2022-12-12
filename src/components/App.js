import '../styles/App.scss';

import { useState, useEffect } from 'react';

function App() {

//VARIABLES ESTADO
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setuserLetters] = useState([]);

//USE EFFECT
  useEffect(() => {
    fetch("https:dev.adalab.es/api/random/word")
    .then((response) => response.json())
    .then((data) => setWord(data.word))
  }, []);


//FUNCIONES HANDLER
  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleClickIncrease = () => {
    setNumberOfErrors(numberOfErrors + 1);
    console.log(numberOfErrors);
  };

  
  const handleLastLetter = (event) => {
    const regex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]{0,1}/;
    if (regex.test(event.target.value)){
    setLastLetter(event.target.value);

      if(event.target.value !== "") {
        setuserLetters([...userLetters, event.target.value]);
        const errorLetters = userLetters.filter((userLetter) => !word.includes(userLetter));
        setNumberOfErrors(errorLetters.length);
      }
      console.log(numberOfErrors);
    }else{
      console.log('Escribe una letra que esté permitida')
    }

  };

  



  // const handleLastLetter = (event) => {
  //   const regex = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]/;
  //   if (event.target.value === '' || regex.test(event.target.value)){
  //   setLastLetter(event.target.value);
  //   }else{
  //     console.log('Escribe una letra que esté permitida')
  //   }
  // };

  //RENDER
  

  const renderSolutionLetters = () => {
    const wordLetters = word.split(''); //array de letras
    const writtenLetter = wordLetters.map((letter, index) => { //se recorre el array de todas las letras escritas por el usuario
      // nombreDeArray.find((elementoDeArray) => CONDICION PARA BUSCAR);
        //Busca en userLetter a ver si encuentras letter (de una en una)
      if(userLetters.find((userLetter) => userLetter === letter)) { //condición para cada una de las letras
        return <li class="letter" id={index}>{letter}</li> //el return es obligatorio cuando hay llaves
      } else {
        return <li class="letter" id={index}></li>
      }      
    })
  return writtenLetter;
  }
  
  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter((userLetter) => !word.includes(userLetter)); //queremos las letras que no se incluyen en word
    return errorLetters.map((letter, index) =>  <li class="letter" id={index}>{letter}</li>);
  }

  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              {renderErrorLetters()}
            </ul>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              onChange={handleLastLetter}
              value={lastLetter}
            />
            <button onClick={handleClickIncrease}>Incrementar</button>
          </form>
        </section>
        <section className={`dummy error-${numberOfErrors}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
      </main>
    </div>
  );
}

export default App;
