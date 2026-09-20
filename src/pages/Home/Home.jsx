import ReactLogo from '/favicon.svg'
import concepts from '../../data/concepts.json'
import storeFeatures from '../../data/storeFeatures.json'
import ScrollButton from '../../components/Utilities/ScrollButton'
import DescriptionCard from '../../components/Cards/DescriptionCard'

export default function Home() {

    return (
        <article className="max-w-7xl mx-auto -mt-10 md:-mt-30">

            <section className="relative my-8 md:my-0  md:h-screen flex flex-col md:flex-row justify-between items-center gap-4 md:gap-20 overflow-hidden" id='hero'>

                <div className="flex flex-col justify-center">
                    <h1 className="font-bold mb-8">
                        <div className="text-indigo-500 text-shadow-xs text-6xl text-shadow-indigo-400">React.js</div>
                        <div className="display-1">Javascript Learning Project</div>
                    </h1>

                    <p className="mb-4 text-2xl">
                        Welcome to my React.js learning project.
                    </p>
                    <p>
                        This project is built from scratch with React.js and Vite to practice and understand the fundamentals of
                        React without relying on higher-level frameworks such as Next.js.
                    </p>
                </div>

                <div className='size-60 md:size-80 flex justify-center items-center'>
                    <img className='w-full animate-[spin_40s_linear_infinite] duration-1000 pointer-events-none' src={ReactLogo} alt="React Logo" />
                </div>

                <ScrollButton to="concepts" />

            </section>
    

            <section className="relative my-8 md:my-0  md:h-screen flex flex-col justify-center items-center gap-2" id='concepts'>

                <p className="mb-4 display-6">
                    Throughout the project, I will experiment with concepts such as
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {
                        concepts.map(
                            concept => <DescriptionCard key={concept.title} data={concept} />    
                        )
                    }
                </div>
                
                <ScrollButton to="store" />

            </section>



            <section className="relative my-8 md:h-screen flex flex-col justify-center items-center gap-8" id='store'>

                <p className="display-6">
                    Demo Store
                </p>

                <p className='my-12'>
                    A fully functional e-commerce demo built on top of the concepts above — product 
                    browsing, cart management, and user authentication, all wired together with React Router 
                    and component state.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {
                        storeFeatures.map(
                            feature => <DescriptionCard key={feature.title} data={feature} />    
                        )
                    }
                </div>

                <div className='my-10 min-h-40 flex flex-col justify-center items-center'>
                    <p className="inline-block m-0">The goal is not just to build an application, but</p>
                    
                    <p className='inline-block font-bold ml-2 p-0'>
                        to understand how React works and how to build applications with it step by step.
                    </p>
                </div>

                <ScrollButton to="" down={false} startOfPage={true} />

            </section>

        </article>
    )
}
