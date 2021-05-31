import React from "react";
import MathJax from "react-mathjax";
import RemarkMathPlugin from "remark-math";

function Markdown(props) {
    const ReactMarkdown = require("react-markdown/with-html");

    const newProps = {
        ...props,
        plugins: [RemarkMathPlugin],
        renderers: {
            ...props.renderers,
            math: (props) => <MathJax.Node formula={props.value} />,
            inlineMath: (props) => (
                <MathJax.Node inline formula={props.value} />
            ),
        },
    };
    return (
        <MathJax.Provider input="tex">
            <ReactMarkdown
                {...newProps}
                escapeHtml={false}
                linkTarget={"_blank"}
            />
        </MathJax.Provider>
    );
}

export default Markdown;
