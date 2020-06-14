import React from "react";
import Header, { Title } from "../../components/Header/Header";
import { storiesOf } from "@storybook/react";

storiesOf("1_atoms", module).add("HeaderTitle", () => <Title>header title</Title>);

storiesOf("3_organisms", module).add("Header", () => <Header />);