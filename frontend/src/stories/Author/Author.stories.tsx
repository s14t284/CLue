import React from "react";
import Author from "../../components/Author/Author";
import { AuthorType } from "../../types";
import { storiesOf } from "@storybook/react";
import { MemoryRouter } from "react-router";

const author: AuthorType = {
  authorId: 1,
  name: "author",
  papers: [
    {
      paperId: 1,
      title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
      conference: "NAACL",
      year: 2019,
      task: "Word-level Semantics",
      predicted: true,
      url: "https://www.aclweb.org/anthology/N19-1423.pdf",
    },
    {
      paperId: 2,
      title: "Distributed Representations of Words and Phrases and their Compositionality",
      conference: "NIPS",
      year: 2013,
      task: "Word-level Semantics",
      predicted: false,
      url:
        "https://papers.nips.cc/paper/5021-distributed-representations-of-words-and-phrases-and-their-compositionality.pdf",
    },
  ],
};

storiesOf("3_organisms", module)
  .addDecorator(story => <MemoryRouter initialEntries={["/", "posts"]}>{story()}</MemoryRouter>)
  .add("Author", () => <Author {...author} />);
