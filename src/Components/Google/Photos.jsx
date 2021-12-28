import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Photos({ ids }) {
  const [photos, setPhotos] = useState([])

  const fetchGoogleProfilePhotos = async (ids) => {
    let photos = []
    Promise.all(
      Array.from(ids).map(async (id) => {
        // eslint-disable-next-line no-undef
        const url = `https://people.googleapis.com/v1/people/${id}?personFields=photos&key=${process.env.PEOPLE_API_KEY}`

        const response = await fetch(url)
        const r = await response.json()
        if (r.photos) {
          r.photos.forEach((photo) => {
            if (!photo.default) {
              photos.push(photo.url)
            }
          })
        }
      }),
    ).then(() => {
      // The protocol is part of the template so Parcel ignores it during dependency resolution.
      setPhotos(photos.filter((p) => p))
    })
  }

  useEffect(() => {
    fetchGoogleProfilePhotos(ids)
  }, [ids])

  return (
    <div className="subsection">
      {photos.map((photo) => {
        return <Photo key={photo} photo={photo} />
      })}
    </div>
  )
}

Photos.propTypes = {
  ids: PropTypes.object, // Set
}

function Photo(props) {
  return <img src={props.photo} className="profile"></img>
}

Photo.propTypes = {
  photo: PropTypes.string,
}
