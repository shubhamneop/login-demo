import React, {Component} from 'react';
import classes from './Gallery.module.css';
import Imagix from 'react-imgix';


class Gallery extends Component {

    render() {
        const images = [
            'forest1', 'forest2', 'forest3',
            'mountain1', 'mountain2', 'mountain3',
            'river1', 'river2',
        ];
        const buildURL = imagePath => `https://assets.imgix.net/tutorials/${imagePath}.webp`;
        return (
            <div className={classes.Gallery}>
                {images.map(image => (
                    <Imagix 
                        sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
                        src={buildURL(image)}
                        key={image}
                        imgixParams={{
                        fit: "crop",
                        fm: "jpg"
                        }}
                        width="600"
                        height="600"
                    />

                ))}

            </div>
        );
    }
}

export default Gallery;