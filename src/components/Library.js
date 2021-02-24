import LibrarySong from "./LibrarySong"
function Library({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h1>library</h1>
      <div className="library-songs">
        {songs.map((song, index) => (
          <LibrarySong
            songs={songs}
            setCurrentSong={setCurrentSong}
            song={song}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
