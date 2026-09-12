import ReactLogo from '/favicon.svg'

const concepts = [
    { 
        title: "Components and JSX", 
        icon: "fa-cubes",
        description: "Build UI as reusable pieces using JSX syntax that blends HTML and JavaScript."
    },
    { 
        title: "Props and state", 
        icon: "fa-arrows-turn-to-dots",
        description: "Pass data into components with props, and manage internal data that changes with state."
    },
    { 
        title: "Event handling", 
        icon: "fa-hand-pointer",
        description: "Respond to user interactions like clicks, input changes, and form submissions."
    },
    { 
        title: "Conditional rendering", 
        icon: "fa-code-branch",
        description: "Show or hide UI elements based on logic, state, or props."
    },
    { 
        title: "Lists and dynamic data", 
        icon: "fa-list-ul",
        description: "Render collections of data dynamically using map and unique keys."
    },
    { 
        title: "React Hooks", 
        icon: "fa-link",
        description: "Tap into React features like state and lifecycle from function components."
    },
    { 
        title: "Forms and user input", 
        icon: "fa-keyboard",
        description: "Capture and control user input with controlled and uncontrolled form elements."
    },
    { 
        title: "useState, useRef, useEffect, and other hooks", 
        icon: "fa-plug",
        description: "Manage state, references, and side effects with React's core built-in hooks."
    },
    { 
        title: "Component organization", 
        icon: "fa-folder-tree",
        description: "Structure files and folders for scalable, maintainable component architecture."
    },
    { 
        title: "API communication", 
        icon: "fa-satellite-dish",
        description: "Fetch and send data to external APIs using fetch, axios, or similar tools."
    },
    { 
        title: "React Router", 
        icon: "fa-route",
        description: "Handle client-side navigation and route matching between different pages."
    },
    { 
        title: "Reusable components", 
        icon: "fa-puzzle-piece",
        description: "Design components that can be composed and reused across the app."
    },
]


function ConceptCard({ concept }) {
    const {title, description, icon} = concept;

    return(
        <div className="bg-gray-500/30 backdrop-blur-2xl ring ring-indigo-500 rounded-xl p-3 transition-all duration-300 hover:-translate-1 hover:bg-gray-300/30">
            <h3 className='flex items-center gap-3'>
                <div className='border p-2 text-md rounded-2xl bg-white text-indigo-500'>
                    <i className={'fa-solid ' + icon  }></i>
                </div>
                <span>{ title }</span>
            </h3>
            <p>
                { description }
            </p>                                   
        </div>
    )
}

const storeFeatures = [
    { 
        title: "Product Catalog", 
        icon: "fa-store",
        description: "Browse a full catalog of products with dynamic filtering and search."
    },
    { 
        title: "Cart & Checkout", 
        icon: "fa-cart-shopping",
        description: "Add items to cart, adjust quantities, and simulate a checkout flow."
    },
    { 
        title: "Authentication", 
        icon: "fa-user-lock",
        description: "Register and log in with protected routes for account-only pages."
    },
    { 
        title: "State Management", 
        icon: "fa-diagram-project",
        description: "Cart and user session persisted across pages using React state and context."
    },
]


function FeatureCard ({ feature }) {
    const {title, description, icon} = feature;
    return (
        <div className="bg-gray-500/30 backdrop-blur-2xl ring ring-indigo-500 rounded-xl p-3 transition-all duration-300 hover:-translate-1 hover:bg-gray-300/30">
            <h3 className='flex items-center gap-3'>
                <div className='border p-2 text-md rounded-2xl bg-white text-indigo-500'>
                    <i className={'fa-solid ' + icon  }></i>
                </div>
                <span>{ title }</span>
            </h3>
            <p>
                { description }
            </p>                                   
        </div>
    )
}


function ScrollButton({ to, down=true, startOfPage=false }) {

    const handleLinkClick = (e) => {
        if(startOfPage) {
            e.preventDefault();
            const container = document.querySelector('#scrollable');
            container.scrollTo(0,0);
        } 
    }

    return (
        <div className="hidden md:block absolute bottom-10 left-1/2 translate-x-[-50%] animate-bounce">
            <a href={"#" + to.trim()} onClick={handleLinkClick}
                className='bg-indigo-500/20 px-6 py-2 rounded-2xl ring-2 ring-white/20 shadow-xl shadow-indigo-500/50 hover:bg-white/95 hover:text-indigo-500 transition-all duration-300'>
                <i className={`fa-solid fa-arrow-${down ? 'down' : 'up'}-long`}></i>
            </a>
        </div>
    )
}

export default function Home() {

    return (
        <article className="max-w-7xl mx-auto -mt-10 md:-mt-30">

            <section className="relative my-8 md:my-0  md:h-screen flex flex-col md:flex-row justify-between items-center gap-4 md:gap-20 overflow-hidden" id='hero'>

                <div className="flex flex-col justify-center">
                    <h1 className="font-bold mb-8">
                        <div className="display-3 text-indigo-500 text-shadow-xs text-shadow-indigo-400">React.js</div>
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
                            (concept,index) => <ConceptCard key={index} concept={concept} />    
                        )
                    }
                </div>
                
                <ScrollButton to="store" />

            </section>



            <section className="relative my-8 md:my-0 md:h-screen flex flex-col justify-center items-center gap-10" id='store'>

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
                            (feature,index) => <FeatureCard key={index} feature={feature} />    
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
