import Layout from '../../layout/auth/layout';
import ResourceHeader from '../../components/mentor/resourceheader';

const MentorResources = () => {
  return (
    <Layout>
      <div className='container mx-auto py-2 px-4 md:px-4 max-w-7xl'>
        <div className='flex flex-col gap-2'>
          <ResourceHeader />
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* <ResourcesGrid /> */}

            
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default MentorResources;
