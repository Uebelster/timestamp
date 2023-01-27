import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type TimestampProps = {
  id: string;
  start: Date;
  end: Date;
  state: {
    name: string;
  }
  workingstatus: {
    name: string;
  }
  user: {
    name: string;
    email: string;
  }
};

const Timestamp: React.FC<{ timestamp: TimestampProps }> = ({ timestamp }) => {
    const state = timestamp.state;
    const workingstatus = timestamp.workingstatus;
    return (
    <div onClick={() => Router.push("/timestamp/[id]", `/p/${timestamp.id}`)}>
      <td>{timestamp.start}</td><td>{timestamp.end}</td><td>{state}</td><td>{workingstatus}</td>
    </div>
  );
};

export default Timestamp;
