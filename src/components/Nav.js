import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMusic } from "@fortawesome/free-solid-svg-icons"
function Nav({ libraryStatus, setLibraryStatus }) {
  return (
    <nav>
      <h2>my music player</h2>
      <button onClick={() => setLibraryStatus(!libraryStatus)}>
        library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  )
}

export default Nav
