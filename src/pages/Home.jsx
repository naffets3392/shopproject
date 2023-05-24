import React from "react";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useAppContext } from "../AppProvider";

import carhartt1 from '../homeimages/carhartt1home.jpg'
import carhartt2 from '../homeimages/carhartt2home.jpg'
import carhartt3 from '../homeimages/carhartt3home.jpg'
import carhartt4 from '../homeimages/carhartt4home.jpg'
import carhartt5 from '../homeimages/carhartt5home.jpg'
import dickies1 from '../homeimages/dickies1home.jpg'
import dickies2 from '../homeimages/dickies2home.jpg'
import stussy3 from '../homeimages/stussy3home.jpg'
import stussy4 from '../homeimages/stussy4home.jpg'
import stussy5 from '../homeimages/stussy5home.jpg'
// import stussy3 from '../homeimages/stussy3home.jpg'
// import stussy4 from '../homeimages/stussy4home.jpg'
// import stussy5 from '../homeimages/stussy5home.jpg'


const homeImages = [carhartt1,carhartt2,carhartt3,carhartt4,carhartt5,dickies1,dickies2,stussy3,stussy4,stussy5]

export default function Home() {
    console.log(AwesomeSlider)

    return (
        <div className="home__cont">
            <AwesomeSlider className="slider">
                {homeImages.map(image => {
                    return <div><img src={image} alt="" /></div>
                })}
            </AwesomeSlider>
        </div>
    )
}