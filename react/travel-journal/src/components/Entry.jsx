
export default function Entry(props) {

    const {img: {src, alt}, title, country, googleMapsLink, dates, text} = props

    return (
        <article className="entry flex">
                <img src={src}
                    alt = {alt}
                />
                
                <div className="location-details flex-column">
                    <div className="location-info flex">
                        <img className="marker" src="../images/marker.png"/>
                        <h5 className="country-name">{country}</h5>
                        <a className="googlemap-link" href={googleMapsLink}>View on Google Maps</a>
                    </div>
                    
                    <h2 className="location-name">{title}</h2>
                    <p className="visited-date">{dates}</p>
                    <p className="description">{text}</p>
                </div>
        </article>
    )
}