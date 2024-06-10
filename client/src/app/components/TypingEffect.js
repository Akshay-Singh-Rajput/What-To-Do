import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const TypingEffect = ({ text, onTypingComplete }) => {
    const [ displayedText, setDisplayedText ] = useState('');
    const [ index, setIndex ] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[ index ]);
                setIndex(index + 1);
            }, 5);
            return () => clearTimeout(timeout);
        } else {
            if (text && onTypingComplete) {
                onTypingComplete();
            }
        }
    }, [ index, text, onTypingComplete ]);

    return <span>{ <MarkdownRenderer markdownContent={ displayedText } /> }</span>;
};

export default TypingEffect;


const MarkdownRenderer = ({ markdownContent }) => {
    return (
        <div>
            <ReactMarkdown>
                { markdownContent }
            </ReactMarkdown>
        </div>
    );
};