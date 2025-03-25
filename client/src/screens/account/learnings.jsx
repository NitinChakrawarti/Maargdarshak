import Alltasks from '../../components/learnings/alltasks';
import { Graphs } from '../../components/learnings/graphs';
import Layout from '../auth/layout';

const MyLearnings = () => {

  return (
    <>
      <Layout >
        <div className='pt-12 pb-44 md:px-8'>
          <div className='md:pl-6'>
            <h1 className=" text-2xl font-semibold my-4 md:pl-0 pl-6"> Todo report</h1>
            <Graphs />
          </div>
          <div className='md:pl-6'>
            <h1 className="font-semibold text-2xl my-4 md:pl-0 pl-6">Tasks</h1>
            <Alltasks />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default MyLearnings;
