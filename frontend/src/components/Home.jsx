import React from 'react'
import logo from '/logo.webp'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="bg-gradient-to-r from-black to-blue-950">
            <div className='h-screen text-white container mx-auto '>
                {/* Header */}
                <header className='flex item-center justify-between p-6'>
                    <div className='flex  items-center space-x-2'>
                        <img src={logo} alt="image not found " className='w-10 h-10 rounded-full' />
                        <h1 className='text-orange-500 text-2xl font-bold'>CourseHaven</h1>
                    </div>


                    <div className=' space-x-4'>
                        <Link to={'/login'} className='bg-transparent text-white py-2 px-4 border  border-white rounded '>Login</Link>
                        <Link to={'/signup'} className='bg-transparent text-white py-2 px-4 border  border-white rounded '>Signup</Link>
                    </div>


                </header>
                {/* Main section */}
                <section>Section1</section>
                <section>Section2</section>
                {/* Footer */}
                <footer>Footer</footer>

            </div>


        </div>
    )
}
export default Home