import ReactDom from 'react-dom';

const App = () => {
    return <h1>Hello there!</h1>
};

ReactDom.render(<App />, document.querySelector('#root'));