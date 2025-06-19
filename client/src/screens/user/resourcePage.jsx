import ResourcesGrid from '../../components/user/resourcegrid'
import Layout from '../../layout/auth/layout'

const ResourcePage = () => {
    return (

        <div className='py-4 px-4 md:px-4 max-w-7xl mx-auto'>
            <div className="bg-gradient-to-br from-[#1e293b] via-[#1a3a6c] to-[#1e3a8a] rounded-lg px-8 py-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2c67a6]/20 via-[#0ea5e9]/20 to-[#3b82f6]/20 opacity-50"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#b5d5e5]/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#f7a35c]/30 rounded-full blur-xl"></div>

                <div className="relative z-10">
                    <h1 className="text-2xl font-bold text-white mb-2">Learning Resources</h1>
                    <p className="text-[#b5d5e5] mb-6">Explore our carefully curated collection of helpful resources to enhance your learning journey</p>
                </div>
            </div>
            <div className='px-2 '>
                <ResourcesGrid />
            </div>
        </div>

    )
}

export default ResourcePage

