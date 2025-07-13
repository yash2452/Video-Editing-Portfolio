import { usePortfolioData } from "@/hooks/usePortfolioData";
import VideoPlayer from "./VideoPlayer";
import YouTubePlayer from "./YouTubePlayer";
import SoftwareIcon from "./SoftwareIcons";
import { Clock, Calendar, User } from "lucide-react";

const Projects = () => {
  const { longFormProjects, shortFormProjects } = usePortfolioData();

  return (
    <section id="projects" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">My Work</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore my portfolio of video editing projects, from long-form documentaries to engaging short-form content.
          </p>
        </div>

        {/* Long Form Projects */}
        <div className="space-y-16">
          <h3 className="text-3xl font-bold text-white mb-8">Long Form Content</h3>
          {longFormProjects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center bg-gray-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
            >
              <div className="lg:w-1/2">
                <div className="rounded-xl overflow-hidden">
                  {project.youtubeId ? (
                    <YouTubePlayer
                      videoId={project.youtubeId}
                      className="w-full aspect-video"
                      title={project.title}
                    />
                  ) : project.videoUrl ? (
                    <VideoPlayer
                      src={project.videoUrl}
                      poster={project.thumbnail}
                      className="w-full aspect-video"
                    />
                  ) : (
                    <div className="w-full aspect-video bg-gray-700 flex items-center justify-center rounded-xl">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-xl">🎥</span>
                        </div>
                        <p className="text-gray-400">{project.title}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="lg:w-1/2 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="inline-block px-3 py-1 bg-indigo-600 text-white text-sm rounded-full">
                    {project.category}
                  </div>
                  {project.year && (
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Calendar className="h-3 w-3" />
                      {project.year}
                    </div>
                  )}
                </div>
                
                <h3 className="text-3xl font-bold text-white">{project.title}</h3>
                
                {/* Project metadata */}
                <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                  {project.clientName && (
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {project.clientName}
                    </div>
                  )}
                  {project.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {project.duration}
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed">
                  {project.description}
                </p>
                
                {/* Software used */}
                {project.software && project.software.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm font-medium">Software Used:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.software.map((software, softwareIndex) => (
                        <div
                          key={softwareIndex}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-lg"
                        >
                          <SoftwareIcon 
                            name={software as any} 
                            size={16} 
                          />
                          <span className="text-gray-300 text-sm capitalize">
                            {software === 'aftereffects' ? 'After Effects' : 
                             software === 'davinci' ? 'DaVinci Resolve' : 
                             software.charAt(0).toUpperCase() + software.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Short Form Projects */}
        <div className="space-y-16 mt-16">
          <h3 className="text-3xl font-bold text-white mb-8">Short Form Content</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {shortFormProjects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative mb-4">
                  {project.youtubeId ? (
                    <YouTubePlayer
                      videoId={project.youtubeId}
                      className="w-full aspect-[9/16] rounded-xl"
                      title={project.title}
                    />
                  ) : project.videoUrl ? (
                    <VideoPlayer
                      src={project.videoUrl}
                      poster={project.thumbnail}
                      className="w-full aspect-[9/16] rounded-xl"
                    />
                  ) : (
                    <div className="w-full aspect-[9/16] bg-gray-700 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                          <span className="text-xl">📱</span>
                        </div>
                        <p className="text-gray-400 text-sm">{project.title}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                      {project.category}
                    </div>
                    {project.duration && (
                      <div className="flex items-center gap-1 text-gray-400 text-xs">
                        <Clock className="h-3 w-3" />
                        {project.duration}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  
                  {project.clientName && (
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <User className="h-3 w-3" />
                      {project.clientName}
                    </div>
                  )}
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Software icons for short form */}
                  {project.software && project.software.length > 0 && (
                    <div className="flex gap-1">
                      {project.software.map((software, softwareIndex) => (
                        <SoftwareIcon 
                          key={softwareIndex}
                          name={software as any} 
                          size={16} 
                          className="opacity-80"
                        />
                      ))}
                    </div>
                  )}
                  
                  {project.tags && (
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
//                       {project.category}
//                     </div>
//                     {project.duration && (
//                       <div className="flex items-center gap-1 text-gray-400 text-xs">
//                         <Clock className="h-3 w-3" />
//                         {project.duration}
//                       </div>
//                     )}
//                   </div>
                  
//                   <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  
//                   {project.clientName && (
//                     <div className="flex items-center gap-1 text-gray-400 text-xs">
//                       <User className="h-3 w-3" />
//                       {project.clientName}
//                     </div>
//                   )}
                  
//                   <p className="text-gray-300 text-sm leading-relaxed">
//                     {project.description}
//                   </p>
                  
//                   {/* Software icons for short form */}
//                   {project.software && project.software.length > 0 && (
//                     <div className="flex gap-1">
//                       {project.software.map((software, softwareIndex) => (
//                         <SoftwareIcon 
//                           key={softwareIndex}
//                           name={software as any} 
//                           size={16} 
//                           className="opacity-80"
//                         />
//                       ))}
//                     </div>
//                   )}
//                   
//                   {project.tags && (
//                     <div className="flex flex-wrap gap-1">
//                       {project.tags.map((tag, tagIndex) => (
//                         <span
//                           key={tagIndex}
//                           className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-full"
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Projects;
