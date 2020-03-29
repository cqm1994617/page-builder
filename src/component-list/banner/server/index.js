import React, { useRef, useEffect } from 'react'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

function Banner({ bannerList, height }) {

  const banner = useRef(null)

  useEffect(() => {
    new Swiper(banner.current, {
      loop: true,
      autoplay: {
        delay: 3000
      },
      navigation: false
    })
  }, [])

  return (
    <div ref={banner}>
      <div className="swiper-wrapper">
        {bannerList.map((item, index) => (
          <div key={index} className="swiper-slide" style="overflow: hidden;">
            <div style={{
              height: height || '150px',
              background: `url(${item.imgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>

            </div>
          </div>
        ))}
      </div>
      <div className='swiper-pagination'></div>
    </div>
  )
}

export default Banner