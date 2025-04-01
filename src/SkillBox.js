import { useTiltEffect } from './useTiltEffect';

export const SkillBox = ({ title, subtitle, image, darkMode }) => {
  const { ref, style } = useTiltEffect(12); // Adjust intensity here (5-20)

  return (
    <div
      ref={ref}
      style={style}
      className={`
        skill-box aspect-square relative
        ${darkMode ? "bg-gray-800/20" : "bg-white/30"}
        backdrop-blur-md rounded-lg border
        ${darkMode ? "border-white/5" : "border-gray-200/50"}
        p-2 md:p-4 flex flex-col items-center justify-center
        cursor-pointer transition-all duration-300 ease-out
        hover:z-10
      `}
    >
      {/* Glow overlay */}
      <div className="
        absolute inset-0 rounded-lg overflow-hidden
        pointer-events-none opacity-0 hover:opacity-100
        transition-opacity duration-300
      ">
        <div className="
          absolute inset-0
          bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(99,102,241,0.1)_0%,transparent_70%]
        " />
      </div>

      {/* Content with 3D depth */}
      <div className="
        w-full h-full flex flex-col items-center justify-center
        transition-transform duration-300
        transform-gpu translate-z-[20px]
      ">
        <div className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-sm md:text-lg font-bold text-center">{title}</h3>
        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};