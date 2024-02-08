"use client";
// TextWithLinks.tsx
import React from "react";

interface TextWithLinksProps {
  text: string;
}

const TextWithLinks: React.FC<TextWithLinksProps> = ({ text }) => {
  const createLinkElements = (text: string) => {
    const words = text.split(/\s+/);

    return words.map((word, index) => {
      if (word.startsWith("http://") || word.startsWith("https://")) {
        return (
          <a
            key={index}
            href={word}
            target="_blank"
            className="text-blue-500 m-1 block text-xs"
            rel="noopener noreferrer"
          >
            {word}
          </a>
        );
      } else if (word.startsWith("@")) {
        return (
          <a
            key={index}
            href={`https://twitter.com/${word.slice(1)}`}
            target="_blank"
            className="text-blue-500 block text-xs"
            rel="noopener noreferrer"
          >
            {word}
          </a>
        );
      } else if (word.startsWith("#")) {
        return (
          <a
            key={index}
            href={`https://twitter.com/hashtag/${word.slice(1)}`}
            target="_blank"
            className="text-blue-500  block text-xs"
            rel="noopener noreferrer"
          >
            {word}
          </a>
        );
      } else {
        return <span key={index}>{word} </span>;
      }
    });
  };

  return <p className="text-gray-500">{createLinkElements(text)}</p>;
};

export default TextWithLinks;
