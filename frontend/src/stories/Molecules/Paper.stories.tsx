import React from "react";
import Paper from "../../components/Molecules/Paper";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router";

storiesOf("Molecules", module)
  .addDecorator(story => <MemoryRouter initialEntries={["/", "posts"]}>{story()}</MemoryRouter>)
  .add("Paper in Papers component", () => (
    <Paper
      paper={{
        paperId: 1,
        title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
        conference: "NAACL",
        year: 2019,
        task: "Word-level Semantics",
        predicted: true,
        url: "https://www.aclweb.org/anthology/N19-1423.pdf",
        authors: [
          { authorId: 1, name: "author1" },
          { authorId: 2, name: "author2" },
          { authorId: 3, name: "author3" },
          { authorId: 4, name: "author4" },
        ],
      }}
    />
  ))
  .add("Minimum information Paper", () => (
    <Paper
      paper={{
        paperId: 1,
        title: "Distributed Representations of Words and Phrases and their Compositionality",
        conference: "NIPS",
        year: 2013,
        url:
          "https://papers.nips.cc/paper/5021-distributed-representations-of-words-and-phrases-and-their-compositionality.pdf",
      }}
    />
  ));
