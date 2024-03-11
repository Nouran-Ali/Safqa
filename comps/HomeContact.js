import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PhoneIcon from '@mui/icons-material/Phone';

function HomeContact() {

    return (
        <div className='homeContact mx-auto'>
            <div className='d-flex justify-content-evenly'>
                <div className='mt-5 contacthomeimg'>
                    <div className='align-middle'>
                        <lottie-player
                            src="https://assets9.lottiefiles.com/packages/lf20_26c4bh4z.json"
                            background="transparent"
                            speed="1"
                            style={{ height: "350px", marginTop: "40px", marginLeft: "auto", marginRight: "auto" }}
                            // loop
                            autoplay
                            data-aos="slide-right" data-aos-offset="100"
                        >
                        </lottie-player>
                    </div>
                </div>
                <div>
                    <div data-aos="slide-left" data-aos-offset="100" className='margTop mx-auto fs-3'>
                        <div className='mb-4'>
                            <p>
                                <span className='px-2 rounded-3 me-4'>
                                    <LocationOnIcon color="white" sx={{ fontSize: 20 }} />
                                </span>
                                Lorem ipsum dolor sit amet<br />
                                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp; consectetur adipiscing elit
                            </p>
                        </div>
                        <div className='mb-4'>
                            <p>
                                <span className='px-2 rounded-3 me-4'>
                                    <LocalPostOfficeIcon color="white" sx={{ fontSize: 20 }} />
                                </span>
                                safqa@safqa.com
                            </p>
                        </div>
                        <div className='mb-4'>
                            <p>
                                <span className='px-2 rounded-3 me-4'>
                                    <PhoneIcon color="white" sx={{ fontSize: 20 }} />
                                </span>
                                +905156842689<br />
                                &nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;+905156842689
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeContact