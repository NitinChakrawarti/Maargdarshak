import React, { useState } from 'react'
import Layout from '../../layout/auth/layout'
import ResourceHeader from '../../components/mentor/resourceheader';
import ResourceForm from '../../components/mentor/addresourceform';

const Addresources = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSelect = (index) => {
        setSelectedIndex(index);
    };
    const submitevent = async (data) => {
        console.log("Submitted data:", data);
    };
    return (
    
            <div className='container mx-auto py-4 px-4 md:px-4 max-w-7xl'>
                {/* <ResourceHeader selectedIndex={selectedIndex} handleSelect={handleSelect} /> */}
                <ResourceForm onSubmit={submitevent} />
            </div>
        
    )
}

export default Addresources