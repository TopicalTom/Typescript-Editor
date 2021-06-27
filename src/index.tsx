import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

// Components
//import CodeCell from './components/CodeCell';
import TextEditor from './components/TextEditor';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <TextEditor />
            </div>
        </Provider>
    );
};

ReactDom.render(<App />, document.querySelector('#root'));