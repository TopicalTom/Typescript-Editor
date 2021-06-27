import './CodePreview.scss';
import { FC, useEffect, useRef } from 'react';

interface PreviewProps {
    code: string;
}

const html = `
<html>
    <head>
        <style>html { background-color: white; }</style>
    </head>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener('message', (event) => {
                try {
                    eval(event.data)
                } catch (err) {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
                    console.error(err);
                }
            }, false);
        </script>
    </body>
</html>
`;

const CodePreview: FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>(null);

    // Clears preview and posts new code
    useEffect(() => {
        iframe.current.srcdoc = html;

        // Protects against flashing code
        setTimeout(() => {
            iframe.current.contentWindow.postMessage(code, '*');
        }, 50);
    }, []);

    return (
        <div className="preview">
            <iframe 
                title="preview" 
                ref={iframe} 
                srcDoc={html} 
                sandbox="allow-scripts"
            />
        </div>
    );
};

export default CodePreview;