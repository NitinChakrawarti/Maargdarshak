import Layout from '../../layout/auth/layout';
import ResourceHeader from '../../components/mentor/resourceheader';
import ResourcesGrid from '../../components/user/resourcegrid';
import { useSelector } from 'react-redux';

const MentorResources = () => {
  const mentor = useSelector((state) => state.mentor);
  
  return (
    <div className='container mx-auto py-2 px-4 md:px-4 max-w-7xl'>
      <div className='flex flex-col gap-2'>
        <ResourceHeader />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ResourcesGrid mentorId={mentor.mentor._id} />
        </div>
      </div>
    </div>
  );
};
export default MentorResources;
