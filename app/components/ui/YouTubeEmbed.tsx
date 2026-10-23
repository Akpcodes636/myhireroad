interface YouTubeEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

export default function YouTubeEmbed({ videoId, title, className = '' }: YouTubeEmbedProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0F1430] ${className}`}
      style={{ paddingBottom: '56.25%' }}
    >
      <iframe
        className="absolute inset-0 w-full h-full"
        
        src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
