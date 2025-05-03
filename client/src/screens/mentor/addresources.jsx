import React, { useState } from 'react'
import Layout from '../../layout/auth/layout'
import ResourceHeader from '../../components/mentor/resourceheader';

const Addresources = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleSelect = (index) => {
        setSelectedIndex(index);
    };
    return (
        <Layout>
            <div className='container mx-auto py-4 px-4 md:px-4 max-w-7xl'>
                <ResourceHeader selectedIndex={selectedIndex} handleSelect={handleSelect} />
                <div>Addresources</div>
            </div>
        </Layout>
    )
}

export default Addresources