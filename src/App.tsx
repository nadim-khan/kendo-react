import React from 'react';
import './App.scss';
import MainPage from './components/main-component/main-component';

 const App = ()=> {

  sessionStorage.setItem('token','4cd7d446403fb42b6173c0652b6021ba7a6e508408064cca172fbd0c27c61397')
  const handleClick = React.useCallback(() => {
    alert('button Clicked!')
  }, []);

  return (
      <MainPage />
  );
}

export default App;
