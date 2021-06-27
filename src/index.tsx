import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDom from 'react-dom';

// Components
import CodeCell from './components/CodeCell';

const App = () => {
    return (
        <div>
            <CodeCell />
        </div>
    );
};

ReactDom.render(<App />, document.querySelector('#root'));