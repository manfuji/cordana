import React from 'react'

const Featured = () => {
  return (
    <div className="mx-auto mb-4 h-[40%] w-full max-w-2xl bg-gray-100 py-6 shadow shadow-gray-200 md:mb-0 md:h-[20%] md:max-w-4xl">
      <h1 className="text-center">Trending Post</h1>
      <h3 className=" mt-5 text-center text-gray-600">
        Share Nutrient with family
      </h3>
      <div className="mt-3 flex flex-col md:flex-row">
        <article className="w-full px-8 text-lg text-gray-600 md:w-1/2">
          Nisi consectetur quis duis velit dolor non reprehenderit commodo ea
          elit duis. Dolore cillum cillum occaecat nostrud. Amet voluptate sunt
          officia culpa ex elit est. Ut sit consequat nisi exercitation aliquip
          officia in dolore aliquip commodo amet. Incididunt magna ea laboris
          esse dolore culpa.
          <div className="mx-4 flex flex-row justify-between text-sm text-gray-400">
            <span>By:Harllot</span>
            <span>21st Jan 22</span>
          </div>
        </article>
        <div className="relative mx-auto flex h-[350px] w-[350px] flex-row sm:h-[500px] sm:w-[500px] md:h-[40%] md:w-[40%] ">
          <img
            className="absolute"
            src="https://images.unsplash.com/photo-1657299143333-4a56a5519651?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
          />
        </div>
      </div>
    </div>
  )
}

export default Featured
