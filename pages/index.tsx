import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Timestamp, { TimestampProps } from "../components/Timestamp"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.timestamp.findMany({
    include: {
      state: {
        select: { name: true },
      },
      workingstatus: {
        select: { name: true },
      },
      user: {
        select: { name: true },
      }
    },
  });
  const feedJSON = JSON.stringify(feed)
  return {
    props: { feedJSON },
    revalidate: 10,
  };
};

type Props = {
  feed: TimestampProps[]
}

const Time: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Timestamping</h1>
        <main>
          {props.feed.map((timestamp) => (
            <div key={timestamp.id} className="post">
              <Timestamp timestamp={timestamp} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Time
