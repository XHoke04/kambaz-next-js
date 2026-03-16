"use client";

import Link from "next/link";
import Container from "react-bootstrap/Container";
import { Provider } from "react-redux";
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import store from "./store";
import ReduxExamples from "./redux/page";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }
  return (
    <Provider store={store}>
      <Container id="wd-lab4">
        <h2>Lab 4</h2>
        <h3>Managing State and User Input with Forms</h3>
        <p>
          This screen hosts the Lab 4 exercises for the forms and state
          management chapter.
        </p>
        <ClickEvent />
        <PassingDataOnEvent />
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables />
        <StringStateVariables />
        <DateStateVariable />
        <ObjectStateVariable />
        <ArrayStateVariable />
        <ParentStateComponent />
        <ReduxExamples />
        <hr />
        <Link href="/labs/lab4/react-context">React Context Examples</Link>
        <hr />
        <Link href="/labs/lab4/zustand">Zustand Examples</Link>
      </Container>
    </Provider>
  );
}
