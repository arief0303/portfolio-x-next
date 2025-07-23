import React from "react";

const PortfolioCard = ({ project }) => {
  return (
    <div className="w-80 flex-shrink-0 rounded-2xl shadow-lg bg-white dark:bg-gray-900 overflow-hidden">
      <div className="h-48 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        {project.type === "video" ? (
          <video src={project.src} controls className="w-full h-full object-cover" />
        ) : (
          <img src={project.src} alt={project.title} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;
