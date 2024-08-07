import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react';
import { Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { DefaultHeadingExample } from './DefaultHeadingExample.tsx';
import { region_info } from 'aws-cdk-lib';
import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws_s3';
import { Construct } from 'constructs';


const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  const region = region_info.RegionInfo.get('us-east-2');

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content"), isDone: false });
  }

  function deleteTodo(id: string) {
      client.models.Todo.delete({ id })
  }

  function fixTodo(id: string) {
      client.models.Todo.update({ id, isDone: true })
  }

  return (
      <Authenticator>
      {({ signOut, user }) => (
    <main>
    <DefaultHeadingExample />
      <h1>My todos</h1>
      <h1>{user?.signInDetails?.loginId}'s QUUX!</h1>
      <h1>{region?.s3StaticWebsiteEndpoint}</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => fixTodo(todo.id)}
          key={todo.id}>
          {todo.content} - {todo.isDone ? 'Done' : 'Not Done'}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign Out</button>
    </main>
      )}
      </Authenticator>
  );
}

export default App;
