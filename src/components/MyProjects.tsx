// components/MyProjects.tsx
"use client";

import { projectImages } from "@/src/assets/projects";
import { useRef, useState } from "react";
import { ThreeDCarouselItem } from "./lightswind/3d-carousel";

const MyProjects = () => {
  const projects: ThreeDCarouselItem[] = [
    {
      id: 1,
      title: "Traffic Sign Detection and Classification (GTSRB)",
      brand: "Nov 2025 • Computer Vision & Deep Learning",
      description:
        "Collaborated in a team to build an end-to-end AI-powered traffic sign detection system using the German Traffic Sign Recognition Benchmark (GTSRB), covering 43 categories. Developed and optimized a custom CNN model in PyTorch, achieving over 95% test accuracy. Engineered robust data pipelines with extensive augmentation for lighting, rotation, and weather variability. Delivered both CLI and modern web UI (FastAPI backend + HTML/CSS/JS frontend) with GPU/CUDA acceleration for fast inference. Designed modular preprocessing with advanced algorithms (Otsu, Adaptive, Chow-Kaneko, Cheng-Jin-Kuo).",
      tags: ["Python", "PyTorch", "FastAPI", "OpenCV", "HTML/CSS/JS", "CUDA"],
      imageUrl: projectImages.traffic,
      link: "https://github.com/Abdelrhman941/CV-traffic-signs-Project",
      youtubeUrl: "https://youtu.be/xWEPut6oU2Q?si=Hn-njJ9iOgLLhgAp",
      bgGradient: "from-blue-500/20 via-blue-400/10 to-cyan-500/20",
    },
    {
      id: 2,
      title: "DQN Agent for 2048 Game (Reinforcement Learning)",
      brand: "May 2025 • Deep Reinforcement Learning",
      description:
        "Developed a Deep Q-Network agent to master the 2048 puzzle using custom NumPy and TensorFlow implementations of the logic and RL components. Engineered replay buffer, target network architecture, and epsilon-greedy strategy; agent trained for 10,000+ episodes on GPU. Created interactive dashboards with TensorBoard and Matplotlib to monitor score progression, Q-value trends, and exploration decay. Shipped a Flask web app for live play, benchmarking, and model checkpoint management, enabling both manual and AI-controlled play modes.",
      tags: ["TensorFlow", "NumPy", "Flask", "Matplotlib", "TensorBoard", "DQN"],
      imageUrl: projectImages.dqn,
      link: "https://github.com/Abdelrhman941/2048-Game-Project",
      bgGradient: "from-amber-500/20 via-orange-400/10 to-yellow-500/20",
    },
    {
      id: 3,
      title: "Vehicle Detection and Tracking",
      brand: "Dec 2023 • Computer Vision & Object Detection",
      description:
        "Built a production-ready web app for real-time vehicle detection, tracking, and traffic analysis using YOLOv8 and custom ROI zone logic. Engineered the entire pipeline: video ingestion, frame-by-frame detection, counting by lanes (left/right), and output of annotated traffic videos with labeled overlays and classification (heavy/smooth traffic). Designed and deployed an async FastAPI backend with live progress streaming to frontend via WebSockets; support for large batch video uploads and high-res input. Created dynamic polygonal ROI/mask extraction for improved accuracy and flexible deployment across camera angles.",
      tags: ["Python", "YOLOv8", "FastAPI", "OpenCV", "WebSockets", "HTML/CSS/JS"],
      imageUrl: projectImages.vehicle,
      link: "https://github.com/Abdelrhman941/Vehicle-Detection-Project",
      youtubeUrl: "https://youtu.be/f_7gi9ArWt0?si=t_xUrorxUZlacI9S",
      bgGradient: "from-slate-500/20 via-gray-400/10 to-zinc-500/20",
    },
    {
      id: 4,
      title: "Sports Popularity Analysis with Web Scraping",
      brand: "May 2025 • Data Science & Time Series Forecasting",
      description:
        "Engineered an automated data pipeline to collect, clean, and analyze over 10,000 time-series entries from Google Trends and YouTube API, covering 5+ sports categories. Applied robust seasonal decomposition and ensemble forecasting (Prophet, SARIMA) to detect trend spikes and long-term popularity shifts. Built interactive dashboards for dynamic performance visualization, integrating event impact markers and forecast uncertainty bands. Processed large datasets with anomaly detection, outlier mitigation, and automated handling of missing values.",
      tags: ["Python", "Pandas", "Plotly", "Prophet", "SARIMA", "Streamlit", "BeautifulSoup"],
      imageUrl: projectImages.sports,
      link: "https://github.com/Abdelrhman941/Sports-Popularity-Project",
      bgGradient: "from-green-500/20 via-emerald-400/10 to-teal-500/20",
    },
    {
      id: 5,
      title: "Auto-correct System using NLP & Transformers",
      brand: "May 2025 • Natural Language Processing",
      description:
        "Developed a spelling and grammar correction system combining edit distance, custom probabilistic N-gram models, and transformer-based contextual embeddings. Achieved 92% correction accuracy across benchmark datasets with a >50,000 word vocabulary and robust multi-error handling for both isolated tokens and full sentences. Engineered pipelines for spelling correction (PySpellChecker), grammar correction (Gramformer), and bigram-based contextual replacements, scalable to search and text input applications. Built an interactive Gradio GUI app and batch-processing NLP pipeline with clear before/after comparison.",
      tags: ["NLTK", "PySpellChecker", "Gramformer", "spaCy", "Transformers", "Gradio"],
      imageUrl: projectImages.nlp,
      link: "https://github.com/Abdelrhman941/Auto-correct-Project",
      bgGradient: "from-purple-500/20 via-violet-400/10 to-indigo-500/20",
    },
  ];

  return (
    <section id="projects" className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
            Selected work showcasing my practical experience
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Clean, production-ready engineering projects
          </p>
        </div>

        {/* Custom 3D Carousel with Project Cards */}
        <div className="relative">
          <ThreeDCarouselWithProjects items={projects} />
        </div>
      </div>
    </section>
  );
};

// Custom wrapper component for the 3D Carousel with enhanced project cards
const ThreeDCarouselWithProjects = ({ items }: { items: ThreeDCarouselItem[] }) => {
  const [active, setActive] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const getCardAnimationClass = (index: number) => {
    if (index === active) return "scale-100 opacity-100 z-20 blur-0";
    if (index === (active + 1) % items.length)
      return "translate-x-[40%] scale-95 opacity-60 z-10 blur-[1px]";
    if (index === (active - 1 + items.length) % items.length)
      return "translate-x-[-40%] scale-95 opacity-60 z-10 blur-[1px]";
    return "scale-90 opacity-0 blur-sm";
  };

  return (
    <div
      className="relative w-full h-[650px] flex items-center justify-center overflow-visible"
      ref={carouselRef}
    >
      {/* Carousel Cards Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {items.map((project, index) => (
          <div
            key={project.id}
            className={`absolute w-full max-w-4xl transform transition-all duration-500 ${getCardAnimationClass(
              index
            )}`}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 min-h-[520px] flex flex-col">
              {/* Top: Image with dynamic gradient background */}
              <div className={`w-full h-[340px] bg-gradient-to-br ${project.bgGradient || 'from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900'} flex items-center justify-center p-2`}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-contain drop-shadow-lg"
                  onLoad={() => console.log(`Image loaded: ${project.imageUrl}`)}
                  onError={(e) => {
                    console.error(`Failed to load image: ${project.imageUrl}`);
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="%23333"/><text x="50%" y="50%" fill="%23999" text-anchor="middle" dy=".3em">No Image</text></svg>';
                  }}
                />
              </div>

              {/* Bottom: Text content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="mb-3">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.brand}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-200 dark:border-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`flex gap-3 mt-3 ${!project.youtubeUrl ? 'justify-center' : ''}`}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${project.youtubeUrl ? 'flex-1' : 'w-full max-w-xs'} flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-gray-100 rounded-lg font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-gray-100 dark:hover:text-gray-900 transition-all duration-300`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm">GitHub</span>
                  </a>

                  {project.youtubeUrl && (
                    <a
                      href={project.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span className="text-sm">YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-1 left-0 right-0 flex justify-center items-center space-x-3 z-30">
        {items.map((_, idx) => (
          <button
            key={idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              active === idx
                ? "bg-blue-600 w-8"
                : "bg-gray-300 dark:bg-gray-600 w-2 hover:bg-gray-400 dark:hover:bg-gray-500"
            }`}
            onClick={() => setActive(idx)}
            aria-label={`Go to project ${idx + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows (Desktop) */}
      <button
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 z-30 shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-200 dark:border-gray-700"
        onClick={() => setActive((prev) => (prev - 1 + items.length) % items.length)}
        aria-label="Previous project"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 z-30 shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-200 dark:border-gray-700"
        onClick={() => setActive((prev) => (prev + 1) % items.length)}
        aria-label="Next project"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default MyProjects;
