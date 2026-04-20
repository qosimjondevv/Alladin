import "./VideoPlayer.scss";

export const VideoPlayer = ({ tmdbId }) => (
  <div className="player">
    <iframe
      src={`https://vidsrc.me/embed/movie/${tmdbId}`}
      allowFullScreen
      allow="autoplay; fullscreen"
      referrerPolicy="no-referrer"
    />
  </div>
);