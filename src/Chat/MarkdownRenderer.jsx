import React from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

const MarkdownRenderer = ({ markdown }) => {
  // Convert Markdown to HTML
  const rawMarkup = marked(markdown);

  // Sanitize the HTML
  const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: sanitizedMarkup }}
    />
  );
};

export default MarkdownRenderer;
