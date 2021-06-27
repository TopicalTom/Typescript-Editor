import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDom from 'react-dom';

// Components
//import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

const App = () => {
    return (
        <div>
            <TextEditor />
        </div>
    );
};

ReactDom.render(<App />, document.querySelector('#root'));