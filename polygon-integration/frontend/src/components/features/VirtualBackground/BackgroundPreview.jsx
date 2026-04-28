export default function BackgroundPreview({ background, blur }) {
  const getBackgroundStyle = () => {
    if (background.type === 'color') {
      return { backgroundColor: background.value };
    }
    return {};
  };
  
  return (
    <div 
      className="w-full h-full flex items-center justify-center relative"
      style={getBackgroundStyle()}
    >
      {background.type === 'image' && (
        <div className="text-8xl">{background.value}</div>
      )}
      
      {blur > 0 && (
        <div 
          className="absolute inset-0 backdrop-blur-sm"
          style={{ backdropFilter: `blur(${blur}px)` }}
        />
      )}
      
      {/* Mock person silhouette */}
      <div className="absolute bottom-0 w-32 h-40 bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-full opacity-50" />
    </div>
  );
}
