import React from 'react'
import Project from './Project'
import project from '../public/cover.png'
import project2 from '../public/cover2.png'

const Projects = () => {
  return (
    <div id="demo" className="w-full">
      <div className="mx-auto w-full px-2 py-8 md:max-w-[1240px]">
        <p className="text-2xl font-bold uppercase text-gray-900 md:tracking-widest">
          Demo of The Application
        </p>
        <h2 className=" py-4">
          Some Of the Interesting features we have in stock
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Project image={project} name="Nutrient Requirement" projectUrl="/" />
          {/* <Project image={project2} name="cooking food" projectUrl="/" /> */}
          <Project image={project} name="Quick search" projectUrl="/" />
          <Project
            image={project2}
            name="Share Food with Family"
            projectUrl="/"
          />
          <Project image={project} name="Analysis of Nutrient" projectUrl="/" />
          {/* <Project image={project2} name="Eat left Over foods" projectUrl="/" /> */}
        </div>
      </div>
    </div>
  )
}

export default Projects
