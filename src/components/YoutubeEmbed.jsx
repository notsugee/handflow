const YoutubeEmbed = ({ embedId }) => (
  <div className="relative overflow-hidden pb-[56.25%] h-0">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded YouTube video"
    />
  </div>
);

export default YoutubeEmbed;
